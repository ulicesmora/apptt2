import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DatosService } from '../services/datos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionComponent } from '../confirmacion/confirmacion.component';
import { RegistroService, Usuario } from './registro.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  usuario: Usuario = {
    roleId: 2,
    emailAddress: '',
    password: '',
    name: '',
    secondName: '',
    lastName: '',
    motherLastName: '',
    bloodType: '',
    birthDate: '',
    sex: '',
    allergies: '',
    criticalIllnes: '',
    status: 'false',
    cellPhone: '',
    auxiliaryCellPhone: '',
    latitud: '',
    longitud: '',
    date: new Date() // Inicializa con la fecha actual
  };

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
    private registroService: RegistroService,
  ) {}

  confirmarDatos():void {
    this._matDialog.open(ConfirmacionComponent, {
      width:'400px'
    })
  }

  evaluarDato() {
    if(this.alergia.length==0) {
      this.elementAlergia=false;
    } else if(this.enfermedad.length==0) {
      this.elementEnfermedad=false;
    } 
  }

  registrarUsuario() {
    this.registroService.crearUsuario(this.usuario).subscribe(
      response => {
        console.log('Usuario creado con éxito:', response);
        // Aquí puedes agregar lógica adicional, como mostrar un mensaje de éxito
      },
      error => {
        console.error('Error al crear el usuario:', error);
        // Aquí puedes agregar lógica para manejar el error, como mostrar un mensaje de error
      }
    );
  }

  agregar(dato0:any,dato1:any,dato2:any,dato3:any,dato4:any,dato5:any,dato6:any,dato7:any,dato8:any,dato9:any) {
    // nombre, apellidoPaterno, apellidoMaterno, correo, telefono, telefonoAuxiliar, genero, alergia, enfermedad, password
    this.usuario.name=dato0;
    this.usuario.lastName=dato1;
    this.usuario.motherLastName=dato2;
    this.usuario.emailAddress=dato3;
    this.usuario.cellPhone=dato4;
    this.usuario.auxiliaryCellPhone=dato5;
    this.usuario.sex=dato6;
    this.usuario.allergies=dato7;
    this.usuario.criticalIllnes=dato8;
    this.usuario.password=dato9;

    this.registrarUsuario();
    // this.datosService.agregarDato(dato0);
    // this.datosService.agregarDato(dato1);
    // this.datosService.agregarDato(dato2);
    // this.datosService.agregarDato(dato3);
    // this.datosService.agregarDato(dato4);
    // this.datosService.agregarDato(dato5);
    // this.datosService.agregarDato(dato6);
    // this.datosService.agregarDato(dato7);
    // this.datosService.agregarDato(dato8);
    // this.datosService.agregarDato(dato9);
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
