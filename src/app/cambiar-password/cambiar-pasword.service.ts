import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class CambiarPaswordService {

  constructor(private http: HttpClient) { }

  actualizarPassword(id: string | null, password: string|null): Observable<any> {
    const url = `${API_URL}/api/users/updatepass/`;
    const body = { password }; // Cuerpo de la solicitud
    return this.http.put(url+id, body); // Realiza la solicitud PUT
  }
}
