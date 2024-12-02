import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { InicioSesionService } from './login/inicio-sesion.service';
import { InterfazPrincipalService } from './interfaz-principal/interfaz-principal.service';
import { CambiarPaswordService } from './cambiar-password/cambiar-pasword.service';
import { RegistroService } from './registro/registro.service';
import { EditarInfoService } from './editar-info/editar-info.service';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
            provideRouter(routes), 
            provideAnimationsAsync(),
            InicioSesionService,
            InterfazPrincipalService,
            CambiarPaswordService,
            RegistroService,
            EditarInfoService]
};
// src/app/app.config.ts
export const API_URL = 'http://localizasos.alwaysdata.net';