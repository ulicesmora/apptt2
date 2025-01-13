import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private apiUrl = `${API_URL}/api/users/create`; // URL base para la API

  constructor(private http: HttpClient) { }

  // Método para crear un nuevo usuario
  crearUsuario(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl, usuario); // Realiza la solicitud POST
  }
}

export interface Usuario {
  roleId: number; // ID del rol para asignarlo en la relación
  emailAddress: string;
  password: string;
  name: string;
  secondName: string;
  lastName: string;
  motherLastName: string;
  bloodType: string;
  birthDate: string; 
  sex: string;
  allergies: string;
  criticalIllnes: string;
  status: string;
  cellPhone: string;
  auxiliaryCellPhone: string;
  latitud: string;
  longitud: string;
  date: Date; 
}

// Inicializar un objeto con la estructura de Usuario
export const initialUsuario: Usuario = {
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