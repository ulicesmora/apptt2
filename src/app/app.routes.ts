import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { InterfazPrincipalComponent } from './interfaz-principal/interfaz-principal.component';
import { EditarInfoComponent } from './editar-info/editar-info.component';
import { ConfirmacionComponent } from './confirmacion/confirmacion.component';

export const routes: Routes = [
    // { path: '**', component: LoginComponent },
    
    // { path: '**', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'interfaz-principal', component: InterfazPrincipalComponent },
    { path: 'editar-info', component: EditarInfoComponent },
    { path: 'confirmacion', component: ConfirmacionComponent },
];
