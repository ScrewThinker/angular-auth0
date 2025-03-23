import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthRedirectService {
  constructor(private auth: AuthService, private router: Router) {
    this.auth.appState$.subscribe((state) => {
      const targetRoute = state?.target || '/dashboard';
      this.router.navigate([targetRoute]);
    });
  }
}
