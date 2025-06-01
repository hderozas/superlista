import {Component, OnInit} from '@angular/core';
import {AddRecetaDto, DiaComidaDto, MenuSemanalService, RecetaDto} from '../../../openapi';
import CategoriaEnum = AddRecetaDto.CategoriaEnum;
import {ActivatedRoute, Router} from '@angular/router';

/**
 * @component
 * @name CrearMenuComponent
 * @description
 * Componente encargado de gestionar la creación o edición de un menú semanal en la aplicación SúperLista.
 * Obtiene los parámetros de query desde la ruta:
 * - Si recibe `categorias`, inicializa la lista de categorías.
 * - Si recibe `menuId`, configura el modo edición cargando el menú correspondiente.
 *
 * @example
 * /superlista/crear-menu?categorias=DESAYUNO,COMIDA,CENA
 * /superlista/crear-menu?menuId=123
 */
@Component({
  selector: 'app-crear-menu',
  templateUrl: './crear-menu.component.html',
  standalone: false,
  styleUrls: ['./crear-menu.component.scss']
})
export class CrearMenuComponent implements OnInit {
  /** Lista de categorías recibidas por parámetros para construir el menú. */
  categorias: CategoriaEnum[] = [];
  /** ID del menú si se está en modo edición, null si es creación. */
  menuId: number | null = null;

  /**
   * Constructor del componente.
   * @param route Servicio para acceder a los parámetros de la ruta.
   */
  constructor(private route: ActivatedRoute) {}

  /**
   * Hook de inicialización del componente.
   * Obtiene los parámetros `categorias` y `menuId` desde la query de la ruta.
   */
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const raw = params.get('categorias');
      this.categorias = raw ? raw.split(',') as CategoriaEnum[] : [];

      const id = params.get('menuId');
      if (id) this.menuId = +id;
    });
  }
}
