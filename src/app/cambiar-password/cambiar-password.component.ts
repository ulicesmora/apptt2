import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MensajesService } from '../services/mensajes.service';
import { FormsModule } from '@angular/forms';
import { InicioSesionService } from '../login/inicio-sesion.service';
import { CambiarPaswordService } from './cambiar-pasword.service';
import { CorreoService } from '../services/correo.service';

@Component({
  selector: 'app-cambiar-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cambiar-password.component.html',
  styleUrl: './cambiar-password.component.css'
})
export class CambiarPasswordComponent {
  mensajePassActual=false;
  mensajePass=false;
  mensajeGeneral=false;
  passActual='';
  passNueva='';
  passNuevar='';
  userId: string | null = null;
  userPassword: string | null = null;
  email: string | null = null;
  name: string | null = null;

  get mensajes() {
    // this.mensajesService.agregarMensaje('Cuenta creada. Revise su correo electrónico');
    return this.mensajesService.mensajes;
  }
  constructor(public _matDialogRef: MatDialogRef<CambiarPasswordComponent>,
    private mensajesService: MensajesService,
    private inicioSesionService: InicioSesionService,
    private cambiarPasswordService: CambiarPaswordService,
    private correoService: CorreoService
  ){
    
  }
  ngOnInit(): void {
    // Acceder al ID y la contraseña desde el servicio
    this.userId = this.inicioSesionService.getUserId();
    this.userPassword = this.inicioSesionService.getPassword();
    this.email= this.inicioSesionService.getUserEmail();

    console.log('ID de usuario:', this.userId);
    console.log('Contraseña de usuario:', this.userPassword);
    console.log(this.email)
  }

  sendEmail(correo: string, name: string) {

    const to= correo;
    const subject= ' Confirmación de Cambio de Contraseña en SOS';
    // const  body= 'Cambio de Contraseña Confirmado'
    const body = `
    <h1>Cambio de Contraseña Confirmado</h1>
    <p>Hola <strong>${name}</strong>,</p>
    <p>Tu solicitud de cambio de contraseña ha sido recibida y procesada con éxito. Para completar el proceso y establecer tu nueva contraseña, por favor, haz clic en el siguiente enlace:</p>
    <p style="text-align: center;">
        <a href="www" style="background-color: #3498db; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">Restablecer Contraseña</a>
    </p>
    <p>Este enlace será válido por un tiempo limitado, así que asegúrate de usarlo lo antes posible.</p>
    <p>Si no solicitaste este cambio, por favor, ignora este mensaje.</p>
    <p>Gracias por usar nuestra aplicación,</p>
    <p>El equipo de SOS</p>
`;


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
  onNoClick(): void {
    this._matDialogRef.close();  
  }

  validarPassActual(contrasena: string){
    if (contrasena===this.userPassword){
      return true;
    } else {
      return false;
    }
  }

  validarPass(valor:string) {
    if(valor.length == 0 || valor.length<8 || valor.length>16) {
      return true;
    } else {
      return false;
    }
  }

  agregarMsj() {
    
    this.mensajesService.agregarMensaje("Contraseña cambiada");
    setTimeout(() => {
      this.mensajesService.agregarMensaje("");
    }, 3000);
  }
  // validar() {
  //   if(!this.mensajePass || !this.mensajePassActual || !this.mensajeGeneral || this.passNueva==this.passNuevar) {
  //     this._matDialogRef
  //   }
  // }

  cambiarPassword() {
    this.cambiarPasswordService.actualizarPassword(this.userId, this.passNueva).subscribe({
      next: (response) => {
        console.log('Contraseña actualizada con éxito:', response);
        this.name=response.name;
        if (this.email && this.name) {
          this.sendEmail(this.email, this.name);
        } else {
          console.error('No se pudo enviar el correo electrónico porque el correo electrónico del usuario es null');
        }
        // Aquí puedes agregar lógica adicional, como mostrar un mensaje de éxito
      },
      error: (error) => {
        console.error('Error al actualizar la contraseña:', error);
        // Aquí puedes agregar lógica para manejar el error, como mostrar un mensaje de error
      }
    });
  }
}
