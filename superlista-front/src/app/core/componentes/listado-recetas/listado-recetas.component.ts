import { Component, OnInit, ViewChild } from '@angular/core';
import {RecetaDto, RecetaService, IngredienteDto, IngredienteService} from '../../../../openapi';
import { SnackbarService } from '../../services/snack-bar.service';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
/**
 * @component
 * @name ListadoRecetasComponent
 * @description
 * Componente standalone que muestra y gestiona el listado de recetas y sus ingredientes en la aplicación SúperLista.
 * Permite visualizar todas las recetas, filtrarlas por nombre, ver sus ingredientes, crear nuevas recetas y
 * actualizar las existentes. Usa ngx-bootstrap y ngx-drag-drop para una experiencia visual avanzada.
 *
 * @example
 * <app-listado-recetas></app-listado-recetas>
 */
@Component({
  selector: 'app-listado-recetas',
  templateUrl: './listado-recetas.component.html',
  styleUrls: ['./listado-recetas.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    ModalComponent,
    NgbTooltipModule
  ]
})
export class ListadoRecetasComponent implements OnInit {
  /** Lista completa de recetas originales cargadas desde el backend. */
  recetasOriginales: RecetaDto[] = [];
  /** Lista de recetas filtradas según la búsqueda. */
  filteredRecetas: RecetaDto[] = [];

  /** Lista completa de ingredientes cargados desde el backend. */
  ingredientes: IngredienteDto[] = [];
  /** Lista de ingredientes filtrados según la búsqueda. */
  ingredientesFiltrados: IngredienteDto[] = [];

  /** Texto de búsqueda para filtrar recetas. */
  recetaSearchText = '';
  /** Texto de búsqueda para filtrar ingredientes. */
  ingredienteSearchText = '';
  /** Nombre de la nueva receta a crear. */
  nuevoNombre = '';
  /** IDs de ingredientes seleccionados para crear una nueva receta. */
  ingredientesSeleccionadosParaNuevaReceta = new Set<number>();

  /** Receta actualmente seleccionada para ver detalles o editar. */
  currentReceta: RecetaDto = {};

  /** Referencia al modal para crear una nueva receta. */
  @ViewChild('modalNuevaReceta') modalNuevaReceta!: ModalComponent;
  /** Referencia al modal para ver el detalle de una receta. */
  @ViewChild('modalDetalleReceta') modalDetalleReceta!: ModalComponent;

  /**
   * Constructor del componente.
   * @param recetaService Servicio para gestionar las recetas.
   * @param ingredienteService Servicio para gestionar los ingredientes.
   * @param snackBar Servicio para mostrar mensajes emergentes.
   */
  constructor(
    private recetaService: RecetaService,
    private ingredienteService: IngredienteService,
    private snackBar: SnackbarService
  ) {}

  /**
   * Inicializa el componente cargando recetas e ingredientes.
   */
  ngOnInit(): void {
    this.loadRecetas();
    this.loadIngredientes();
  }

  /** Carga todas las recetas desde el backend. */
  private loadRecetas() {
    this.recetaService.buscarTodasRecetas().subscribe({
      next: res => {
        this.recetasOriginales = res.data || [];
        this.applyRecetaFilter();
      },
      error: () => this.snackBar.error('Error cargando recetas')
    });
  }

  /** Carga todos los ingredientes desde el backend. */
  private loadIngredientes() {
    this.ingredienteService.obtenerTodosIngredientes().subscribe({
      next: res => {
        this.ingredientes = res.data || [];
        this.applyIngredienteFilter();
      },
      error: () => this.snackBar.error('Error cargando ingredientes')
    });
  }

  /** Aplica el filtro de búsqueda sobre el listado de recetas. */
  applyRecetaFilter() {
    const term = this.recetaSearchText
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    if (!term) {
      this.filteredRecetas = [...this.recetasOriginales];
    } else {
      this.filteredRecetas = this.recetasOriginales.filter(r =>
        (r.nombre || '')
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(term)
      );
    }
  }

  /** Aplica el filtro de búsqueda sobre el listado de ingredientes. */
  applyIngredienteFilter() {
    const term = this.ingredienteSearchText
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    if (!term) {
      this.ingredientesFiltrados = [...this.ingredientes];
    } else {
      this.ingredientesFiltrados = this.ingredientes.filter(i =>
        (i.nombre || '')
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(term)
      );
    }
  }

  /**
   * Devuelve los ingredientes filtrados, priorizando los ya presentes en la receta.
   */
  get sortedIngredientesFiltrados(): IngredienteDto[] {
    return this.ingredientesFiltrados
      .slice()
      .sort((i1, i2) => {
        const in1 = this.isIngredienteEnReceta(i1.id!);
        const in2 = this.isIngredienteEnReceta(i2.id!);
        if (in1 === in2) return 0;
        return in1 ? -1 : 1;  // los true (in1) van antes
      });
  }

  /**
   * Abre el modal con el detalle de la receta seleccionada.
   * @param r Receta seleccionada.
   */
  abrirDetalleReceta(r: RecetaDto) {
    this.currentReceta = { ...r, ingredientes: r.ingredientes || [] };
    this.ingredienteSearchText = '';
    this.applyIngredienteFilter();
    this.modalDetalleReceta.open();
  }

  /**
   * Verifica si un ingrediente está presente en la receta actual.
   * @param id ID del ingrediente.
   */
  isIngredienteEnReceta(id: number): boolean {
    return this.currentReceta.ingredientes?.some(i => i.id === id) || false;
  }


  /**
   * Agrega o quita un ingrediente de la receta actual y actualiza en backend.
   * @param ing Ingrediente a modificar.
   * @param checked Estado (agregado o quitado).
   */
  toggleIngredienteEnReceta(ing: IngredienteDto, checked: boolean) {
    if (!this.currentReceta.ingredientes) {
      this.currentReceta.ingredientes = [];
    }
    const existe = this.currentReceta.ingredientes.some(i => i.id === ing.id);
    if (checked && !existe) {
      this.currentReceta.ingredientes.push({
        id: ing.id!,
        nombre: ing.nombre,
        categoria: ing.categoria,
      });
    } else if (!checked && existe) {
      this.currentReceta.ingredientes = this.currentReceta.ingredientes.filter(i => i.id !== ing.id);
    }
    this.recetaService.actualizarReceta(this.currentReceta).subscribe({
      next: () => this.loadRecetas(),
      error: () => this.snackBar.error('Error actualizando receta'),
    });
  }

  /**
   * Marca o desmarca un ingrediente para ser incluido en la nueva receta.
   * @param id ID del ingrediente.
   * @param checked Estado (seleccionado o no).
   */
  toggleIngredienteParaNuevaReceta(id: number, checked: boolean) {
    if (checked) {
      this.ingredientesSeleccionadosParaNuevaReceta.add(id);
    } else {
      this.ingredientesSeleccionadosParaNuevaReceta.delete(id);
    }
  }


  /**
   * Guarda una nueva receta usando los ingredientes seleccionados.
   */
  guardarNuevaReceta() {
    if (!this.nuevoNombre.trim()) {
      this.snackBar.error('El nombre de la receta es obligatorio');
      return;
    }
    const nueva: RecetaDto = {
      nombre: this.nuevoNombre.trim(),
      ingredientes: this.ingredientes
        .filter(i => this.ingredientesSeleccionadosParaNuevaReceta.has(i.id!))
        .map(i => ({ id: i.id!, nombre: i.nombre, categoria: i.categoria })),
    };
    this.recetaService.altaReceta(nueva).subscribe({
      next: () => {
        this.snackBar.success('Receta creada con éxito');
        this.modalNuevaReceta.close();
        this.nuevoNombre = '';
        this.ingredientesSeleccionadosParaNuevaReceta.clear();
        this.loadRecetas();
      },
      error: () => this.snackBar.error('Error al crear la receta'),
    });
  }

  /** Timeout usado para gestionar la apertura retardada de tooltips. */
  tooltipTimeout: any;

  /**
   * Abre un tooltip tras un pequeño retraso.
   * @param tooltip Referencia al tooltip.
   */
  abrirTooltipConDelay(tooltip: any) {
    this.tooltipTimeout = setTimeout(() => {
      tooltip.open();
    }, 500);
  }

  /**
   * Cancela la apertura del tooltip si se abandona antes de tiempo.
   * @param tooltip Referencia al tooltip.
   */
  cancelarTooltip(tooltip: any) {
    clearTimeout(this.tooltipTimeout);
    tooltip.close();
  }
}
