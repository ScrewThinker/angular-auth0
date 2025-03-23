import * as router from '@angular/router';
import { routes } from './app-routing.module';
import { provideAuth0 } from '@auth0/auth0-angular';
import { ApplicationConfig } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    router.provideRouter(routes),
    provideAuth0({
      domain: 'dev-ap3njygmes8twpv3.us.auth0.com',
      clientId: 'OkpWRlHcfHKpJfqY38xz5BMX2jl9UEHC',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'https://dev-ap3njygmes8twpv3.us.auth0.com/api/v2/',
        scope: 'openid profile email'
      }
    })
  ]
};