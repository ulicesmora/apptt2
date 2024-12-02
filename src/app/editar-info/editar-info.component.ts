import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { MensajesService } from '../services/mensajes.service';
import { InicioSesionService } from '../login/inicio-sesion.service';
import { EditarInfoService, UserUpdateDTO } from './editar-info.service';
import { Usuario } from '../registro/registro.service';

@Component({
  selector: 'app-editar-info',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule],
  templateUrl: './editar-info.component.html',
  styleUrl: './editar-info.component.css'
})
export class EditarInfoComponent {

  userId: string | null = null;

  emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  telRegex = /^\d{10}$/;
  elementAlergia = false;
  elementEnfermedad = false;
  mensajeDatos = false;
  mensajeCorreo = false;
  mensajeTel = false;
  mensajePass = false;
  nombre: string = '';
  apellidoPaterno='';
  apellidoMaterno='';
  correo='';
  telefono='';
  telefonoAuxiliar='';
  genero='';
  alergia='';
  otraAlergia='';
  enfermedad='';
  otraEnfermedad='';

  
  userUpdateDTO: UserUpdateDTO = {};

  constructor(
    private mensajesService: MensajesService,
    private inicioSesionService: InicioSesionService,
    private editarInfoService: EditarInfoService,
    private router: Router
  ) {}
  ngOnInit(): void {
    // Acceder al ID y la contraseña desde el servicio
    this.userId = this.inicioSesionService.getVariable();

    console.log('ID de usuario:', this.userId);
  }

  showData() {
    return (this.elementAlergia = true);
  }
  hideData() {
    return (this.elementAlergia = false);
  }
  showEnfermedad() {
    return (this.elementEnfermedad = true);
  }
  hideEnfermedad() {
    return (this.elementEnfermedad = false);
  }

  evaluarDato() {
    if(this.alergia.length==0) {
      this.elementAlergia=false;
    } else if(this.enfermedad.length==0) {
      this.elementEnfermedad=false;
    } 
  }

  validarCorreo() {
    if(!this.emailRegex.test(this.correo)) {
      return this.mensajeCorreo=true;
    } else {
      return this.mensajeCorreo=false;
    }
  }

  validarTel() {
    if(!this.telRegex.test(this.telefono) || !this.telRegex.test(this.telefonoAuxiliar)) {
      return this.mensajeTel=true;
    } else {
      return this.mensajeTel=false;
    }
  }

  agregarMsj() {
    this.mensajesService.agregarMensaje("Informaciòn modificada");
    setTimeout(() => {
      this.mensajesService.agregarMensaje("");
    }, 3000);
  }

  camposRequeridos() {
    // if ( this.nombre.length==0 || this.apellidoPaterno.length==0 || this.apellidoMaterno.length==0 || this.correo.length==0 || this.telefono.length==0 || this.telefonoAuxiliar.length ==0 || this.genero ) {
      // if(this.mensajeCorreo==true || this.mensajePass==true || this.mensajeTel==true || this.mensajeDatos==true) {
      //   this.router.navigate(['/editar-info']);
      // } else {
      //   this.router.navigate(['/interfaz-principal']);
      // }
    if ( !this.nombre || !this.apellidoPaterno|| !this.apellidoMaterno|| !this.correo || !this.telefono|| !this.telefonoAuxiliar|| !this.genero || !this.alergia || !this.enfermedad ) {
       this.mensajeDatos = true;
      setTimeout(() => {
        this.mensajeDatos = false;
      }, 3000);
    } else {
      this.router.navigate(['/interfaz-principal']);
      this.agregarMsj();
    }
  }

  // obtenerUsuario(id: number) {
  //   this.editarInfoService.obtenerUsuario(id).subscribe(
  //     response => {
  //       console.log(response)
  //       this.usuario = response; // Guarda la respuesta en la variable usuario
  //     },
  //     error => {
  //       console.error('Error al obtener la información del usuario:', error);
  //     }
  //   );
  // }
  
  // updateUser (): void {
  //   this.editarInfoService.updateUser(this.userId, this.userUpdateDTO).subscribe(
  //     response => {
  //       console.log('Usuario actualizado:', response);
  //     },
  //     error => {
  //       console.error('Error al actualizar usuario:', error);
  //     }
  //   );
  // }

}
