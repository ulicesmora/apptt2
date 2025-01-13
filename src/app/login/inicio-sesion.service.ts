import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { API_URL } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class InicioSesionService {

  private userId: string | null = null; // Variable para almacenar el ID
  private userPassword: string | null = null; // Variable para almacenar la contraseña
  private userEmail: string | null = null; // Variable para almacenar el correo electrónico  

  constructor(private http: HttpClient) { }

  login(emailAddress: string, password: string): Observable<LoginResponse> {
    const url = `${API_URL}/api/users/login`;
    const body = { emailAddress, password };
  
    return this.http.post<LoginResponse>(url, body).pipe(
      tap((response: LoginResponse) => {
        // Almacenar la información del usuario en tu aplicación
      console.log('Respuesta de login:');
      console.log('ID:', response.id);
      console.log('Contraseña:', response.password);

        this.setUserId(response.id);
        this.setPassword(response.password);
      })
    );
  }

  // Método para guardar el ID
  setUserId(id: string) {
    this.userId = id;
  }

  // Método para obtener el ID
  getUserId(): string | null {
    return this.userId;
  }

  // Método para guardar la contraseña
  setPassword(password: string) {
    this.userPassword = password;
  }

  // Método para obtener la contraseña
  getPassword(): string | null {
    return this.userPassword;
  }

  // Método para guardar el correo electrónico
  setUserEmail(email: string) {
    this.userEmail = email;
  }

  // Método para obtener el correo electrónico
  getUserEmail(): string | null {
    return this.userEmail;
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
  emailAddress: string; // Agregar el correo electrónico en la respuesta
}