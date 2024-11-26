import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Geolocation } from '@capacitor/geolocation';
import { API_URL } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class InterfazPrincipalService {

  constructor(private http: HttpClient) { }

  async getCurrentLocation() {
    try {
      const position = await Geolocation.getCurrentPosition();
      console.log('Current position:', position);
      return position;
    } catch (error) {
      console.error('Error getting location:', error);
      throw error;
    }
  }

  actualizarStatus(id: string | null, status: string, latitud: number, longitud: number ): Observable<any> {



    const url = `${API_URL}/api/users/update/`; // URL base
    const body = {
      status,
      latitud,
      longitud
    }; // Cuerpo de la solicitud
    return this.http.put(url + id, body); // Realiza la solicitud PUT
  }
}
