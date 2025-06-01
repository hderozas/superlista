import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

/**
 * @guard
 * @name AuthGuard
 * @description
 * Guard de rutas que protege las páginas privadas de la aplicación SúperLista.
 * Verifica si existe un token de autenticación en localStorage antes de permitir el acceso.
 * Si no hay token, redirige al usuario a la página de autenticación.
 *
 * @example
 * {
 *   path: 'superlista/home',
 *   canActivate: [AuthGuard],
 *   component: HomeComponent
 * }
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
   * Constructor del guard.
   * @param router Servicio de enrutamiento para redireccionar si no hay token.
   */
  constructor(private router: Router) {}

  /**
   * Determina si la ruta puede ser activada.
   * @returns true si hay token, false si no (y redirige a '/auth').
   */
  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }
}
