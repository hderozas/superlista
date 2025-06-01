import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * @component
 * @name HomePublicoComponent
 * @description
 * Componente que representa la página de inicio pública (sin autenticación) de la aplicación SúperLista.
 * Si detecta un token activo en localStorage, redirige automáticamente al área privada (/superlista/home).
 *
 * @example
 * <app-home-publico></app-home-publico>
 */
@Component({
  selector: 'app-home-publico',
  standalone: false,
  templateUrl: './home-publico.component.html',
  styleUrls: ['./home-publico.component.scss']
})
export class HomePublicoComponent implements OnInit {

  /**
   * Constructor del componente.
   * @param router Servicio de enrutamiento para redirigir al área privada.
   */
  constructor(private router: Router) {}

  /**
   * Hook de inicialización.
   * Si existe un token en localStorage, redirige al home privado.
   */
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/superlista/home']);
    }
  }
}
