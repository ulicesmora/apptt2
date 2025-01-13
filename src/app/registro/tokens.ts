import { InjectionToken } from '@angular/core';
import { Usuario } from './registro.service';

// Define el token para el tipo Usuario
export const USUARIO_TOKEN = new InjectionToken<Usuario>('Usuario');