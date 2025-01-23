import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class RecuperarService {
  // private apiUrl = `${API_URL}/api/users/recover-password`; // URL base
  private apiUrl = 'http://localhost:8080/api/users/recover-password';

  constructor(private http: HttpClient) { }

  recoverPassword(email: string): Observable<string> {
    const body = new URLSearchParams();
    body.set('email', email);
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(this.apiUrl, body.toString(), { headers, responseType: 'text',});
  }
}
