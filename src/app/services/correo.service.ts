import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CorreoService {

  private apiUrl = 'http://localhost:8080/correo/registro'; // Cambia la URL según tu backend

  constructor(private http: HttpClient) { }

  sendCorreo(to: string, subject: string, body: string): Observable<string> {
    const params = new HttpParams()
      .set('to', to)
      .set('subject', subject)
      .set('body', body);
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
  
    return this.http.post(this.apiUrl, params.toString(), {
      headers,
      responseType: 'text',  // Maneja la respuesta como texto.
    });
  }
}