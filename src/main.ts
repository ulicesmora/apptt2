import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent,{
  providers: [
    provideHttpClient(),
    ...appConfig.providers // Asegúrate de que aquí estén tus otros proveedores
  ]
})
  .catch((err) => console.error(err));
