import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

/**
 * @interceptor
 * @name AuthInterceptor
 * @description
 * Interceptor HTTP que añade el token JWT a las cabeceras de las peticiones salientes.
 * Si detecta un error 401 y el token está expirado, elimina el token y redirige al usuario a la página principal.
 *
 * @example
 * {
 *   provide: HTTP_INTERCEPTORS,
 *   useClass: AuthInterceptor,
 *   multi: true
 * }
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  /**
   * Constructor del interceptor.
   * @param router Servicio de enrutamiento para redirigir si el token expira.
   */
  constructor(private router: Router) {}
  /**
   * Intercepta las peticiones HTTP salientes, añade el token (si existe) en la cabecera Authorization
   * y maneja errores 401 si el token ha expirado.
   * @param req Petición original.
   * @param next Manejador HTTP.
   * @returns Observable del evento HTTP.
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    const authReq = token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && token && isTokenExpired(token)) {
          localStorage.removeItem('token');
          this.router.navigate(['']);
        }

        return throwError(() => error);
      })
    );
  }
}

/**
 * Función auxiliar para verificar si un token JWT ha expirado.
 * @param token Token JWT.
 * @returns true si ha expirado, false si aún es válido.
 */
function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  } catch (e) {
    return true;
  }
}
