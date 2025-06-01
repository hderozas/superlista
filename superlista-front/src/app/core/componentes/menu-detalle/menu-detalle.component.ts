import { Component, Input, OnInit } from '@angular/core';
import {MenuSemanalDto, DiaComidaDto, MenuSemanalCreateDto} from '../../../../openapi';
import { DiaComidaDto as DiaComida } from '../../../../openapi';
import DiaEnum = DiaComidaDto.DiaEnum;
import CategoriasEnum = MenuSemanalCreateDto.CategoriasEnum;
import {NgForOf} from '@angular/common';
import {getEmojiDominantePorReceta} from '../../services/utils';

/**
 * @component
 * @name MenuDetalleComponent
 * @description
 * Componente standalone encargado de mostrar el detalle visual de un menú semanal en la aplicación SúperLista.
 * Muestra las recetas asignadas a cada día y categoría (desayuno, almuerzo, etc.) dentro del menú recibido por input.
 * Permite consultar las recetas de cada celda, mostrar nombres amigables para las categorías y usar tooltips con retraso.
 *
 * @example
 * <app-menu-detalle [menu]="miMenu"></app-menu-detalle>
 */
@Component({
  selector: 'app-menu-detalle',
  templateUrl: './menu-detalle.component.html',
  styleUrl: './menu-detalle.component.scss',
  standalone: true,
  imports: [
    NgForOf
  ]
})
export class MenuDetalleComponent implements OnInit {

  /** Menú semanal recibido como input para mostrar su detalle. */
  @Input() menu!: MenuSemanalDto;  // Recibimos el menú que queremos mostrar

  /** Días de la semana representados como enums. */
  diasSemana: DiaComida.DiaEnum[] = [
    'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO'
  ];


  /** Categorías de comida únicas presentes en el menú actual. */
  categoriasComida: DiaComida.CategoriaEnum[] = [];

  /** Constructor vacío del componente. */
  constructor() {}

  /**
   * Hook de inicialización del componente.
   * Extrae las categorías únicas de los días/comidas del menú recibido.
   */
  ngOnInit(): void {
    if (this.menu?.diasComidas) {
      const categoriasUnicas = new Set(this.menu.diasComidas.map(dc => dc.categoria));
      this.categoriasComida = Array.from(categoriasUnicas) as DiaComida.CategoriaEnum[];
    }
  }

  /**
   * Obtiene las recetas asignadas a un día y categoría específicos del menú.
   * @param dia Día de la semana.
   * @param categoria Categoría de comida.
   * @returns Array de recetas para esa celda.
   */
  obtenerRecetas(dia: string, categoria: string) {
    if (!this.menu?.diasComidas) return [];

    const celda = this.menu.diasComidas.find(dc =>
      dc.dia === dia && dc.categoria === categoria
    );

    return celda?.recetas || [];
  }

  /**
   * Devuelve un nombre visualmente amigable para una categoría.
   * @param categoria Código de categoría.
   * @returns Nombre legible de la categoría.
   */
  mostrarCategoria(categoria: string): string {
    const map: any = {
      DESAYUNO: 'Desayuno',
      ALMUERZO: 'Almuerzo',
      COMIDA: 'Comida',
      MERIENDA: 'Merienda',
      CENA: 'Cena',
    };
    return map[categoria] || categoria;
  }

  /** Timeout usado para gestionar la apertura retardada de tooltips. */
  tooltipTimeout: any;

  /** Referencia pública a la utilidad que obtiene el emoji dominante de una receta. */
  public readonly getEmojiDominantePorReceta = getEmojiDominantePorReceta;
}
