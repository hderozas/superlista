import { Component } from '@angular/core';

/**
 * @component
 * @name AppComponent
 * @description
 * Componente raíz (root) de la aplicación Angular SúperLista.
 * Actúa como contenedor principal para toda la estructura de la app y sirve como punto de entrada.
 *
 * @example
 * <app-root></app-root>
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {}
