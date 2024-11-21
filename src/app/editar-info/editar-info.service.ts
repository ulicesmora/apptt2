import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../registro/registro.service';
import { API_URL } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class EditarInfoService {

  private apiUrl = `${API_URL}/api/users/`; // URL base para la API

  constructor(private http: HttpClient) { }

  // Método para obtener la información del usuario
  obtenerUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}${id}`); // Realiza la solicitud GET
  }


  updateUser (id: string, userUpdateDTO: UserUpdateDTO): Observable<any> {
    return this.http.put(`${this.apiUrl}+'updateUser/'+${id}`, userUpdateDTO);
  }
}

export interface UserUpdateDTO {
  role?: { id: number };  // Si el rol es un objeto, especifica la estructura
  emailAddress?: string;
  password?: string;
  name?: string;
  secondName?: string;
  lastName?: string;
  motherLastName?: string;
  bloodType?: string;
  birthDate?: string;
  sex?: string;
  allergies?: string;
  criticalIllnes?: string;
  status?: string;
  cellPhone?: string;
  auxiliaryCellPhone?: string;
  latitud?: string;
  lenght?: string;
  date?: string;  // O Date, dependiendo de cómo quieras manejarlo
}
