import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes, withComponentInputBinding()),
        provideHttpClient(),
        importProvidersFrom(
            BrowserAnimationsModule,
            ToastrModule.forRoot({
                positionClass: 'toast-top-right',
                timeOut: 3000,
                closeButton: true,
                progressBar: true,
                preventDuplicates: true,
            }),
        ),
    ],
};
