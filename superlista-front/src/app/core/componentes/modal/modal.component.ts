import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import { trigger, style, animate, transition } from '@angular/animations';

/**
 * @component
 * @name ModalComponent
 * @description
 * Componente standalone reutilizable que muestra un modal animado (ventana emergente) en la aplicación SúperLista.
 * Permite configurar un título opcional, un tamaño personalizado y emitir un evento cuando se cierra.
 * Incluye animaciones de entrada y salida para el fondo (fade) y el contenido (scale).
 *
 * @example
 * <app-modal [title]="'Confirmación'" [size]="'lg'" (closed)="onModalClosed()">
 *   <!-- Contenido aquí -->
 * </app-modal>
 */
@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  imports: [
    NgIf,
    NgClass
  ],
  styleUrl: './modal.component.scss',
  animations: [
    trigger('fadeOverlay', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0 })),
      ]),
    ]),
    trigger('scaleContent', [
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('200ms ease-out', style({ transform: 'scale(1)', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'scale(0.8)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class ModalComponent {
  /** Título opcional del modal, mostrado en la cabecera. */
  @Input() title?: string;
  /** Tamaño opcional del modal ('sm', 'lg' o 'xl'). */
  @Input() size?: 'sm' | 'lg' | 'xl';   // 👈 Añadimos el tamaño opcional
  /** Evento emitido cuando se cierra el modal. */
  @Output() closed = new EventEmitter<void>();
  /** Controla si el modal es visible actualmente. */
  visible = false;

  /**
   * Cierra el modal, oculta la ventana y emite el evento 'closed'.
   */
  close() {
    this.visible = false;
    this.closed.emit();
  }

  /**
   * Abre el modal, haciéndolo visible.
   */
  open() {
    this.visible = true;
  }

  /**
   * Devuelve la clase CSS correspondiente al tamaño del modal.
   * @returns Clase de tamaño ('modal-sm', 'modal-lg', 'modal-xl') o vacío si es normal.
   */
  get dialogClass(): string {
    switch (this.size) {
      case 'sm': return 'modal-sm';
      case 'lg': return 'modal-lg';
      case 'xl': return 'modal-xl';
      default: return ''; // Normal si no pasa nada
    }
  }
}
