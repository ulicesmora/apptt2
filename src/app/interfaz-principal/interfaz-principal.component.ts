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
    private mensajesService: MensajesService,) {}
  menuLateral():void {
    this._matDialog.open(MenuComponent, {
      width:'800px'
    })
  }

  solicitud() {
    this.respuesta=true;
  }
}
