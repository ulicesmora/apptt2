import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class InicioSesionService {

  private userId: string | null = null; // Variable para almacenar el ID
  private userPassword: string | null = null; // Variable para almacenar la contraseña

  
  constructor(private http: HttpClient) { }




  login(emailAddress: string, password: string): Observable<LoginResponse> {
    const url = `${API_URL}/api/users/login`;
    const body = { emailAddress, password };

    return this.http.post<LoginResponse>(url, body); // Realiza la solicitud POST
  }

  

  // Método para guardar el ID
  setVariable(id: string) {
    this.userId = id;
  }

  // Método para obtener el ID
  getVariable() {
    return this.userId;
  }

  // Método para guardar la contraseña
  setPassword(password: string) {
    this.userPassword = password;
  }

  // Método para obtener la contraseña
  getPassword() {
    return this.userPassword;
  }

  // login(emailAddress: string, password: string): Promise<number> {
  //   const url = 'http://localhost:8080/api/users/login';
  //   const body = { emailAddress, password };

  //   // return this.http.post<number>(url, body); // Realiza la solicitud POST
  //   return this.http.post<any>(url, body).toPromise();
  // }
}


export interface LoginResponse {
  id: string; // o string, dependiendo de cómo manejes los IDs
  password: string;
}