import { Component, Inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DatosService } from '../services/datos.service';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MensajesService } from '../services/mensajes.service';
import { CorreoService } from '../services/correo.service';
import { RegistroService, Usuario } from '../registro/registro.service';
import { USUARIO_TOKEN } from '../registro/tokens';

@Component({
  selector: 'app-confirmacion',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './confirmacion.component.html',
  styleUrl: './confirmacion.component.css'
})
export class ConfirmacionComponent {

  get datos() {
    return this.datosService.datos;
  }

  get mensajes() {
    return this.mensajesService.mensajes;
  }

  constructor(
    private datosService: DatosService,
    private mensajesService: MensajesService,
    @Inject(MAT_DIALOG_DATA) public usuario: Usuario,
    public _matDialogRef: MatDialogRef<ConfirmacionComponent>,
    private correoService: CorreoService,
    private registroService: RegistroService,
  ) {}

  sendEmail(correo: string, nombre: string) {

    const to= correo;
    const subject= 'Confirmación de registro en SOS';
    const body= 'Estimado/a '+nombre+' gracias pro registrarte, tu aliado en situaciones de emergencia. Hemos confirmado tu registro con éxito, y ahora estás listo para comenzar a usar nuestra aplicación para estar más seguro en caso de un terremoto. br Es importante recordar: La aplicación está diseñada para ser utilizada en situaciones de emergencia reales. Si bien queremos que todos estén preparados y seguros, te pedimos que utilices la app con responsabilidad, solo cuando realmente sea necesario. Esto ayudará a que los recursos de ayuda lleguen a quienes más lo necesitan, optimizando el tiempo y los esfuerzos de los servicios de emergencia.';
    this.correoService.sendCorreo(to, subject, body).subscribe({
      next: (response) => {
        console.log(response);
        // alert(response);
      },
      error: (error) => {
        console.error(error);
        // alert(error);
      }
    });
  }

  registrarUsuario() {
    this.registroService.crearUsuario(this.usuario).subscribe(
      response => {
        console.log('Usuario creado con éxito:', response);
        this.mensajesService.agregarMensaje("Cuenta creada. Revise su correo electrónico");
        this.sendEmail(this.usuario.emailAddress, this.usuario.name);
      },
      error => {
        console.error('Error al crear el usuario:', error);
        // Aquí puedes agregar lógica para manejar el error, como mostrar un mensaje de error
      }
    );
  }

  agregarMsj() {
    this.registrarUsuario();
    setTimeout(() => {
      this.mensajesService.agregarMensaje("");
    }, 3000);
  }

  onNoClick(): void {
    this._matDialogRef.close();  
    this.datosService.eliminarDatos();
  }
}
