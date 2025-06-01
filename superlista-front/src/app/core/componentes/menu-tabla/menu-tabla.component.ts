import {Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, AfterViewInit, OnInit} from '@angular/core';
import {CdkDragDrop, DragDropModule} from '@angular/cdk/drag-drop';
import {DiaComidaDto, MenuSemanalDto, MenuSemanalService, RecetaDto} from '../../../../openapi';
import CategoriaEnum = DiaComidaDto.CategoriaEnum;
import {CommonModule} from '@angular/common';
import { AddRecetaDto } from '../../../../openapi';
import {forkJoin, map, Observable, of} from 'rxjs';
import { SnackbarService } from '../../services/snack-bar.service';
import {ActivatedRoute, Router} from '@angular/router';
import DiaEnum = AddRecetaDto.DiaEnum;
import {getEmojiDominantePorReceta} from '../../services/utils';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
declare const bootstrap: any;

/**
 * @component
 * @name MenuTablaComponent
 * @description
 * Componente standalone que construye y gestiona visualmente una tabla de menú semanal en la aplicación SúperLista.
 * Permite arrastrar y soltar recetas en celdas específicas (día + categoría), eliminar recetas,
 * guardar menús nuevos o actualizados, y emitir los datos del menú actualizado al componente padre.
 * Usa tooltips, drag-and-drop (CDK) y utilidades visuales para una interacción rica.
 *
 * @example
 * <app-menu-tabla [categorias]="misCategorias" [menuId]="123" (menuDataChange)="onChange($event)"></app-menu-tabla>
 */
@Component({
  selector: 'app-menu-tabla',
  templateUrl: './menu-tabla.component.html',
  styleUrl: './menu-tabla.component.scss',
  standalone: true,
  imports: [CommonModule, DragDropModule, NgbTooltipModule]
})
export class MenuTablaComponent implements OnInit, AfterViewInit, OnChanges {
  /** Categorías de comida que estructuran las columnas de la tabla. */
  @Input() categorias: CategoriaEnum[] = [];
  /** ID del menú si es edición (null si es creación). */
  @Input() menuId: number | null = null;
  /** Emisor que comunica al padre los cambios en el menú. */
  @Output() menuDataChange = new EventEmitter<typeof this.menuData>();

  /** Estructura interna que guarda las recetas por día y categoría. */
  menuData: { [dia: string]: { [categoria: string]: RecetaDto[] } } = {};

  /** Días de la semana con claves y etiquetas. */
  diasSemana = [
    { label: 'Lunes', key: 'LUNES' },
    { label: 'Martes', key: 'MARTES' },
    { label: 'Miércoles', key: 'MIERCOLES' },
    { label: 'Jueves', key: 'JUEVES' },
    { label: 'Viernes', key: 'VIERNES' },
    { label: 'Sábado', key: 'SABADO' },
    { label: 'Domingo', key: 'DOMINGO' },
  ];

  /**
   * Constructor del componente.
   * @param menuService Servicio para gestionar menús semanales.
   * @param snackBar Servicio para mostrar mensajes emergentes.
   * @param router Servicio de enrutamiento.
   */
  constructor(
    private menuService: MenuSemanalService,
    private snackBar: SnackbarService,
    private router: Router
  ) {}

  /**
   * Inicializa el componente cargando el menú existente o construyendo uno vacío.
   */
  ngOnInit(): void {
    console.log('wid' + window.innerWidth)
    if (this.menuId) {
      this.menuService.obtenerMenu(this.menuId).subscribe({
        next: resp => {
          const menu = resp.data!;
          this.categorias = [...new Set(menu.diasComidas!.map(d => d.categoria!))];
          this.inicializarDesdeMenu(menu);
        },
        error: () => this.snackBar.error('No se pudo cargar el menú')
      });
    } else {
      this.inicializarMenuVacio();
    }
  }


  /**
   * Detecta cambios en las categorías cuando no hay menú cargado.
   * @param changes Cambios detectados.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categorias'] && !this.menuId && this.categorias.length > 0) {
      this.inicializarMenuVacio();
    }
  }

  /**
   * Inicializa los tooltips de Bootstrap después de que la vista está lista.
   */
  ngAfterViewInit(): void {
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
      new bootstrap.Tooltip(el);
    });
  }

  /** Inicializa un menú vacío para creación. */
  private inicializarMenuVacio(): void {
    this.menuData = {};
    for (const dia of this.diasSemana) {
      this.menuData[dia.key] = {};
      for (const categoria of this.categorias) {
        this.menuData[dia.key][categoria] = [];
      }
    }
    this.menuDataChange.emit(this.menuData);
  }

  /**
   * Inicializa el estado del componente a partir de un menú cargado.
   * @param menu Menú semanal recibido del backend.
   */
  private inicializarDesdeMenu(menu: MenuSemanalDto): void {
    this.menuData = {};
    for (const dia of this.diasSemana) {
      this.menuData[dia.key] = {};
      for (const cat of this.categorias) {
        this.menuData[dia.key][cat] = [];
      }
    }

    for (const diaComida of menu.diasComidas || []) {
      const dia = diaComida.dia!;
      const categoria = diaComida.categoria!;
      if (!this.menuData[dia]) this.menuData[dia] = {};
      if (!this.menuData[dia][categoria]) this.menuData[dia][categoria] = [];
      for (const receta of diaComida.recetas || []) {
        if (!this.menuData[dia][categoria].some(r => r.id === receta.id)) {
          this.menuData[dia][categoria].push(receta);
        }
      }
    }

    this.menuDataChange.emit(this.menuData);
  }

  /**
   * Maneja el evento de arrastrar y soltar una receta sobre una celda.
   * @param event Evento de arrastre.
   * @param dia Día de la semana.
   * @param categoria Categoría de comida.
   */
  onDrop(event: CdkDragDrop<RecetaDto[]>, dia: string, categoria: string): void {
    if (event.previousContainer.id !== 'recetasList') return;
    const receta = event.item.data as RecetaDto;
    if (!this.menuData[dia][categoria].some(r => r.id === receta.id)) {
      this.menuData[dia][categoria].push(receta);
      this.menuDataChange.emit(this.menuData);
    }

    setTimeout(() => {
      document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
        if (!el.hasAttribute('data-bs-initialized')) {
          new bootstrap.Tooltip(el);
          el.setAttribute('data-bs-initialized', 'true');
        }
      });
    });
  }

  /**
   * Elimina una receta de una celda específica.
   * @param dia Día de la semana.
   * @param categoria Categoría de comida.
   * @param id ID de la receta.
   */
  eliminarReceta(dia: string, categoria: string, id: number): void {
    this.menuData[dia][categoria] = this.menuData[dia][categoria].filter(r => r.id !== id);
    this.menuDataChange.emit(this.menuData);
  }

  /**
   * Guarda el menú actual, creando uno nuevo o actualizando uno existente.
   */
  guardarMenu(): void {
    const diasComidas = this.construirDiasComidas();

    if (diasComidas.length === 0) {
      this.snackBar.error('El menú no tiene recetas');
      return;
    }

    const payload = {
      menuId: this.menuId!,
      diasComidas
    };

    const request$: Observable<any> = this.menuId
      ? this.menuService.actualizarRecetasMenu(payload)
      : this.menuService.crearMenuSemanal({ categorias: this.categorias }).pipe(
        map(resp => {
          payload.menuId = resp.data!.id!;
          return payload;
        }),
      );

    if (this.menuId) {
      request$.subscribe({
        next: () => {
          this.snackBar.success('Menú guardado correctamente');
          this.router.navigate(['/superlista/menu']);
        },
        error: () => this.snackBar.error('Error al guardar el menú')
      });
    } else {
      // Si es nuevo, primero se crea, luego se actualiza
      (request$ as Observable<{ menuId: number; diasComidas: any[] }>).subscribe({
        next: dto => {
          this.menuService.actualizarRecetasMenu(dto).subscribe({
            next: () => {
              this.snackBar.success('Menú creado correctamente');
              this.router.navigate(['/superlista/menu']);
            },
            error: () => this.snackBar.error('Error al asignar recetas')
          });
        },
        error: () => this.snackBar.error('Error al crear el menú')
      });
    }
  }

  /**
   * Construye la estructura de días y comidas para enviar al backend.
   * @returns Array de días con sus categorías y recetas.
   */
  private construirDiasComidas(): {
    dia: DiaEnum;
    categoria: CategoriaEnum;
    recetas: { id: number }[];
  }[] {
    const diasComidas = [];

    for (const dia of Object.keys(this.menuData)) {
      for (const cat of Object.keys(this.menuData[dia])) {
        const recetas = this.menuData[dia][cat] || [];

        diasComidas.push({
          dia: dia as DiaEnum,
          categoria: cat as CategoriaEnum,
          recetas: recetas.map(r => ({ id: r.id! }))
        });
      }
    }

    return diasComidas;
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

  /** Referencia pública a la utilidad que obtiene el emoji dominante de una receta. */
  protected readonly getEmojiDominantePorReceta = getEmojiDominantePorReceta;
}
