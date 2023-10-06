import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn) {
      // El usuario está autenticado, permite el acceso a la ruta
      return true;
    } else {
      // El usuario no está autenticado, redirige a la página de inicio de sesión
      this.router.navigate(['/']); // Cambia '/login' por la ruta de inicio de sesión
      return false;
    }
  }
}
