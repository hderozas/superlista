
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * @service
 * @name SnackbarService
 * @description
 * Servicio centralizado para mostrar notificaciones flotantes (snackbars) usando Angular Material.
 * Permite emitir mensajes de éxito o error personalizables, ubicados en la parte inferior derecha de la pantalla.
 * Encapsula MatSnackBar para simplificar su uso en los componentes.
 *
 * @example
 * this.snackbarService.success('Operación realizada con éxito');
 * this.snackbarService.error('Ocurrió un error inesperado');
 */
@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  /**
   * Constructor del servicio.
   * @param snackBar Servicio de Angular Material para mostrar snackbars.
   */
  constructor(private snackBar: MatSnackBar) {}
  /**
   * Muestra un snackbar de éxito con el mensaje proporcionado.
   * @param message Texto a mostrar.
   */
  success(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-success']
    });
  }
  /**
   * Muestra un snackbar de error con el mensaje proporcionado.
   * @param message Texto a mostrar.
   */
  error(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-error']
    });
  }
}
