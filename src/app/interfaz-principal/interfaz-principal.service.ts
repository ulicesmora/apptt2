import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class InterfazPrincipalService {

  constructor(private http: HttpClient) { }

  actualizarStatus(id: string | null, status: string, latitud: string, longitud: string ): Observable<any> {
    const url = `${API_URL}/api/users/update/`; // URL base
    const body = {
      status,
      latitud,
      longitud
    }; // Cuerpo de la solicitud
    return this.http.put(url + id, body); // Realiza la solicitud PUT
  }
}
