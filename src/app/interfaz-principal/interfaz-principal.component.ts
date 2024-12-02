import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MenuComponent } from '../menu/menu.component';
import { CommonModule } from '@angular/common';
import { MensajesService } from '../services/mensajes.service';
import { InicioSesionService } from '../login/inicio-sesion.service';
import { InterfazPrincipalService } from './interfaz-principal.service';
// import {InterfazPrincipalService} from '../services/interfaz-principal.service';

@Component({
  selector: 'app-interfaz-principal',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './interfaz-principal.component.html',
  styleUrl: './interfaz-principal.component.css'
})
export class InterfazPrincipalComponent {
  
  userId: string | null = null;
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
  }
  menuLateral():void {
    this._matDialog.open(MenuComponent, {
      width:'800px'
    })
  }

  solicitud() {
    this.respuesta=true;
  }

  sendData() {
    const data = {
      // tus datos aquí
      status: true,
      latitud: 19.45678,
      longitud: -99.12345
    };
    this.userId = this.inicioSesionService.getVariable();
console.log(data, this.userId);

    this.interfazservice.actualizarStatus(this.userId ,'true', '19.45678','-99.12345').subscribe(
      (      response: any) => {
        console.log('Success!', response);
      },
      (      error: any) => {
        console.error('Error!', error);
      }
    );
  }
}
