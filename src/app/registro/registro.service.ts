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
  birthDate: string; // Puedes usar Date si prefieres
  sex: string;
  allergies: string;
  criticalIllnes: string;
  status: string;
  cellPhone: string;
  auxiliaryCellPhone: string;
  latitud: string;
  longitud: string;
  date: Date; // Asegúrate de que el formato sea compatible con el backend
}