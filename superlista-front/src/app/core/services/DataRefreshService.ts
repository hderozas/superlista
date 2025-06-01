import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * @service
 * @name DataRefreshService
 * @description
 * Servicio singleton que permite emitir eventos globales de recarga para que otros componentes escuchen
 * y actualicen sus datos tras cambios en el backend.
 * Usa un Subject de RxJS para notificar a cualquier suscriptor interesado.
 *
 * @example
 * // En un componente:
 * this.dataRefreshService.refresh$.subscribe(() => this.cargarDatos());
 *
 * // Después de guardar:
 * this.dataRefreshService.notifyRefresh();
 */
@Injectable({ providedIn: 'root' })
export class DataRefreshService {
  /** Subject privado que emite un evento cada vez que se quiere forzar recarga. */
  private refreshSubject = new Subject<void>();
  /** Observable público al que los componentes pueden suscribirse para reaccionar a recargas. */
  refresh$ = this.refreshSubject.asObservable();

  /**
   * Notifica a todos los suscriptores que deben refrescar sus datos.
   * Se suele llamar tras guardar cambios en el backend.
   */
  notifyRefresh() {
    this.refreshSubject.next();
  }
}
