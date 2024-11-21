import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { RecuperarComponent } from '../recuperar/recuperar.component';
import { MensajesService } from '../services/mensajes.service';
import { FormsModule } from '@angular/forms';
import { InicioSesionService } from './inicio-sesion.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  mensajeCorreo: boolean | undefined;
  mensajePass=false;
  mensajeGeneral=false;
  emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  correo='';
  password='';
  valido=false;
  isLoginSuccessful: boolean = false; // Bandera para verificar si el inicio de sesión fue exitoso

  get mensajes() {
    // this.mensajesService.agregarMensaje('Cuenta creada. Revise su correo electrónico');
    return this.mensajesService.mensajes;
  }

  constructor(private _matDialog: MatDialog,
    private mensajesService: MensajesService,
    private inicioSesionService: InicioSesionService,
    private router: Router
  ) {}

  recuperarPassword():void {
    this._matDialog.open(RecuperarComponent, {
      width:'400px'
    })
  }

  validarCorreo() {
    if(!this.emailRegex.test(this.correo) || this.correo.length == 0) {
      return this.mensajeCorreo=true;
    } else {
      return this.mensajeCorreo=false;
    }
  }

  validarPass() {
    if(this.password.length == 0) {
      return this.mensajePass=true;
    } else {
      return this.mensajePass=false;
    }
  }

  loguear() {
    this.valido=false
    console.log(this.correo, this.password)
    let isLoginSuccessful = false; // Bandera para verificar si el inicio de sesión fue exitoso

    this.inicioSesionService.login(this.correo, this.password).subscribe(
      (response) => {
        console.log('ID recibido:', response);
    
        // Verificar si la respuesta indica éxito
        if (response) {
          isLoginSuccessful = true; // Establecer la bandera a true si la respuesta es correcta
          this.inicioSesionService.setVariable(response.id); // Guardar el ID
          this.inicioSesionService.setPassword(response.password); // Guardar la contraseña

          console.log('Inicio de sesión exitoso. ID de usuario:', this.inicioSesionService.getVariable());
        } else {
          console.log('La respuesta no indica un inicio de sesión exitoso.');
        }
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
        isLoginSuccessful = false; // Establecer la bandera a false si hubo un error
        console.log('El inicio de sesión falló.');
      }
    );
    if(this.correo.length==0) {
      this.mensajeCorreo=true;
    }else{
      this.mensajeCorreo=true;
    }

    if(this.password.length == 0) {
      this.mensajePass=false;
    } else {
      this.mensajePass=true;
    }
    if(this.mensajeCorreo==true || this.mensajePass==true) {
      console.log(this.mensajeCorreo, this.mensajePass, this.isLoginSuccessful, this.correo, this.password, this.inicioSesionService.getVariable())
      this.router.navigate(['/interfaz-principal']);
      console.log()
 
    } else {
      console.log(this.mensajeCorreo, this.mensajePass, this.isLoginSuccessful, this.correo, this.password, this.inicioSesionService.getVariable())
      this.router.navigate(['/login']);
      
    }

  }

//   async loguear() {
//     this.valido = false;
//     console.log(this.correo, this.password);
//     let isLoginSuccessful = false; // Bandera para verificar si el inicio de sesión fue exitoso

//     // Validar campos
//     if (this.correo.length === 0) {
//         this.mensajeCorreo = true;
//     } else {
//         this.mensajeCorreo = false; // Resetear mensaje si el correo es válido
//     }

//     if (this.password.length === 0) {
//         this.mensajePass = true;
//     } else {
//         this.mensajePass = false; // Asegurarse de que el mensaje esté activo si la contraseña es válida
//     }

//     // Salir si hay errores de validación
//     if (this.mensajeCorreo || !this.mensajePass) {
//         return;
//     }

//     try {
//         const response = await this.inicioSesionService.login(this.correo, this.password);
//         console.log('ID recibido:', response);

//         // Verificar si la respuesta indica éxito
//         if (response) {
//             isLoginSuccessful = true; // Establecer la bandera a true si la respuesta es correcta
//             this.inicioSesionService.setVariable(response); // Guardar el ID en el servicio
//             console.log('Inicio de sesión exitoso. ID de usuario:', this.inicioSesionService.getVariable());
//         } else {
//             console.log('La respuesta no indica un inicio de sesión exitoso.');
//         }
//     } catch (error) {
//         console.error('Error al iniciar sesión:', error);
//         isLoginSuccessful = false; // Establecer la bandera a false si hubo un error
//         console.log('El inicio de sesión falló.');
//     }

//     this.statusLogin(); // Actualizar el estado del inicio de sesión
// }


  // onLogin() {
  //   this.inicioSesionService.login(this.emailAddress, this.password).subscribe(
  //     (response) => {
  //       console.log('ID recibido:', response);
  //       this.inicioSesionService.setVariable(response); // Guardar el ID en el servicio
  //     },
  //     (error) => {
  //       console.error('Error al iniciar sesión:', error);
  //     }
  //   );
  // }
}
