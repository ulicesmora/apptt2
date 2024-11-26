import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MenuComponent } from '../menu/menu.component';
import { CommonModule } from '@angular/common';
import { MensajesService } from '../services/mensajes.service';

@Component({
  selector: 'app-interfaz-principal',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './interfaz-principal.component.html',
  styleUrl: './interfaz-principal.component.css'
})
export class InterfazPrincipalComponent {
  
  userId: string | null = null;
  latitude: number | null = null;
  longitude: number | null = null;
  get mensajes() {
    // this.mensajesService.agregarMensaje('Cuenta creada. Revise su correo electrónico');
    return this.mensajesService.mensajes;
  }
  respuesta = false;
  constructor(private _matDialog: MatDialog,
    private mensajesService: MensajesService,
    private inicioSesionService: InicioSesionService,
    private interfazservice: InterfazPrincipalService
  ) {}
  ngOnInit(): void {
    // Acceder al ID y la contraseña desde el servicio
    this.userId = this.inicioSesionService.getVariable();

    console.log('ID de usuario:', this.userId);
    // getCurrentLocation
  }
  menuLateral():void {
    this._matDialog.open(MenuComponent, {
      width:'800px'
    })
  }

  solicitud() {
    this.respuesta=true;
  }

  async sendData() {

      try {
        const position = await this.interfazservice.getCurrentLocation();
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
  
        // Ahora, envia la ubicación al backend
        this.interfazservice.actualizarStatus(this.userId ,'true', this.latitude, this.longitude).subscribe(
          (response) => {
            console.log('Location sent successfully:', response);
          },
          (error) => {
            console.error('Error sending location:', error);
          }
        );
      } catch (error) {
        console.error('Error getting location:', error);
      }
  }
}
