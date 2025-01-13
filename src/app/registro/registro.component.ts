import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DatosService } from '../services/datos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionComponent } from '../confirmacion/confirmacion.component';
import { initialUsuario, RegistroService, Usuario } from './registro.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  usuario: Usuario = initialUsuario;

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
  password='';
  rpassword='';
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

  showMensaje() {
    return (this.mensajeDatos = true);
  }
  hideMensaje() {
    return (this.mensajeDatos = false);
  }

  showMensajeCorreo() {
    return (this.mensajeCorreo = true);
  }
  hideMensajeCorreo() {
    return (this.mensajeCorreo = false);
  }

  get datos() {
    return this.datosService.datos;
  }

  constructor(
    private datosService: DatosService,
    private _matDialog: MatDialog,
    private registroService: RegistroService
  ) {}

  confirmarDatos():void {
    this._matDialog.open(ConfirmacionComponent, {
      width: '400px',
      data: this.usuario // Pasar el objeto usuario al modal
    });
  }

  evaluarDato() {
    if(this.alergia.length==0) {
      this.elementAlergia=false;
    } else if(this.enfermedad.length==0) {
      this.elementEnfermedad=false;
    } 
  }

  agregar(nombre: string, apellidoPaterno: string, apellidoMaterno: string, correo: string, telefono: string, telefonoAuxiliar: string, genero: string, alergia: string, enfermedad: string, password: string) {
    this.usuario.name = nombre;
    this.usuario.lastName = apellidoPaterno;
    this.usuario.motherLastName = apellidoMaterno;
    this.usuario.emailAddress = correo;
    this.usuario.cellPhone = telefono;
    this.usuario.auxiliaryCellPhone = telefonoAuxiliar;
    this.usuario.sex = genero;
    this.usuario.allergies = alergia;
    this.usuario.criticalIllnes = enfermedad;
    this.usuario.password = password;
  
    this.confirmarDatos();
  }

  camposRequeridos() {
    if (this.datosService.datos.some(elemento => elemento.toString() === '') || this.mensajeCorreo || this.mensajeDatos || this.mensajePass || this.mensajeTel || !(this.password==this.rpassword)) {
      this._matDialog.closeAll();
      this.datosService.eliminarDatos();
      this.showMensaje();
      setTimeout(() => {
        this.hideMensaje();
      }, 3000);
    }
  }

  validarCorreo() {
    if(!this.emailRegex.test(this.correo)) {
      this.showMensajeCorreo();
    } else {
      this.hideMensajeCorreo();
    }
  }

  validarTel() {
    if(!this.telRegex.test(this.telefono) || !this.telRegex.test(this.telefonoAuxiliar)) {
      return this.mensajeTel=true;
    } else {
      return this.mensajeTel=false;
    }
  }

  validarPass() {
    if(this.password.length<8 || this.password.length>16) {
      return this.mensajePass=true;
    } else {
      return this.mensajePass=false;
    }
  }
}
