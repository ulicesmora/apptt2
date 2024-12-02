import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MensajesService } from '../services/mensajes.service';
import { FormsModule } from '@angular/forms';
import { InicioSesionService } from '../login/inicio-sesion.service';
import { CambiarPaswordService } from './cambiar-pasword.service';

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

  get mensajes() {
    // this.mensajesService.agregarMensaje('Cuenta creada. Revise su correo electrónico');
    return this.mensajesService.mensajes;
  }
  constructor(public _matDialogRef: MatDialogRef<CambiarPasswordComponent>,
    private mensajesService: MensajesService,
    private inicioSesionService: InicioSesionService,
    private cambiarPasswordService: CambiarPaswordService,
  ){}
  ngOnInit(): void {
    // Acceder al ID y la contraseña desde el servicio
    this.userId = this.inicioSesionService.getVariable();
    this.userPassword = this.inicioSesionService.getPassword();

    console.log('ID de usuario:', this.userId);
    console.log('Contraseña de usuario:', this.userPassword);
  }

  onNoClick(): void {
    this._matDialogRef.close();  
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
        // Aquí puedes agregar lógica adicional, como mostrar un mensaje de éxito
      },
      error: (error) => {
        console.error('Error al actualizar la contraseña:', error);
        // Aquí puedes agregar lógica para manejar el error, como mostrar un mensaje de error
      }
    });
  }
}
