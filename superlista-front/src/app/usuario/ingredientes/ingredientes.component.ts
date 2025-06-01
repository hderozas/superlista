import { Component, OnInit, ViewChild } from '@angular/core';
import {
  CategoriaIngredienteDto,
  CategoriaIngredienteService,
  IngredienteDto,
  IngredienteService,
  RecetaDto,
  RecetaService
} from '../../../openapi';
import { SnackbarService } from '../../core/services/snack-bar.service';
import {getCardClasses, getEmojiDominantePorReceta, getEmojiPorCategoria} from '../../core/services/utils';
import { ModalComponent } from '../../core/componentes/modal/modal.component';

/**
 * @component
 * @name IngredientesComponent
 * @description
 * Componente encargado de gestionar los ingredientes en la aplicación SúperLista.
 * Permite:
 * - Listar ingredientes organizados en columnas.
 * - Crear nuevos ingredientes y asociarles recetas.
 * - Añadir o quitar recetas de ingredientes ya existentes.
 * - Filtrar recetas mediante búsqueda textual.
 * - Mostrar información de categorías y emojis asociados.
 *
 * Utiliza modales personalizados para la creación de ingredientes y la asignación de recetas.
 *
 * @example
 * <app-ingredientes></app-ingredientes>
 */
@Component({
  selector: 'app-ingredientes',
  templateUrl: './ingredientes.component.html',
  styleUrls: ['./ingredientes.component.scss'],
  standalone: false
})
export class IngredientesComponent implements OnInit {


  /**
   * Constructor del componente.
   * @param ingredienteService Servicio para gestionar ingredientes.
   * @param snackBarService Servicio para mostrar mensajes flotantes.
   * @param recetaService Servicio para gestionar recetas.
   * @param categoriaService Servicio para obtener categorías de ingredientes.
   */
  constructor(
    private ingredienteService: IngredienteService,
    private snackBarService: SnackbarService,
    private recetaService: RecetaService,
    private categoriaService: CategoriaIngredienteService
  ) {}

  /** Ingredientes distribuidos en cuatro columnas para mostrar en la vista. */
  columnas: IngredienteDto[][] = [[], [], [], []];
  /** Lista completa de ingredientes obtenidos. */
  ingredientes!: IngredienteDto[];
  /** Lista completa de recetas obtenidas. */
  todasRecetas: RecetaDto[] = [];
  /** Lista de categorías de ingredientes. */
  categorias: CategoriaIngredienteDto[] = [];
  /** Lista de recetas filtradas por búsqueda. */
  recetasFiltradas: RecetaDto[] = [];

  /** Nombre del nuevo ingrediente a crear. */
  nuevoNombre: string = '';
  /** Categoría seleccionada para el nuevo ingrediente. */
  nuevaCategoria: IngredienteDto.CategoriaEnum | null = null;
  /** Conjunto de IDs de recetas seleccionadas para el nuevo ingrediente. */
  recetasSeleccionadasNuevoIngrediente: Set<number> = new Set();

  /** Ingrediente actualmente seleccionado para agregar/quitar recetas. */
  currentIngrediente!: IngredienteDto;

  /** Texto de búsqueda para filtrar recetas. */
  searchText: string = '';
  /** Temporizador para distinguir entre un clic y doble clic. */
  clickTimeout: any;
  /** Contador de clics (para distinguir acción de clic/doble clic). */
  clickCount = 0;

  /** Referencia al modal para crear un nuevo ingrediente. */
  @ViewChild('modalNuevoIngrediente') modalNuevoIngrediente!: ModalComponent;
  /** Referencia al modal para añadir recetas a un ingrediente existente. */
  @ViewChild('modalAddReceta') modalAddReceta!: ModalComponent;

  /** Helper para obtener las clases CSS según la categoría. */
  protected readonly getCardClasses = getCardClasses;


  /**
   * Hook de inicialización del componente.
   * Carga ingredientes, recetas y categorías desde los servicios.
   */
  ngOnInit(): void {
    this.loadIngredientes();
    this.loadRecetas();
    this.loadCategorias();
  }

  /**
   * Carga todos los ingredientes del backend.
   * Si tiene éxito, los distribuye en las columnas.
   */
  private loadIngredientes() {
    this.ingredienteService.obtenerTodosIngredientes().subscribe({
      next: data => {
        this.ingredientes = data.data || [];
        this.distribuirEnColumnas();
      },
      error: () => this.snackBarService.error('Hubo un error al cargar los ingredientes')
    });
  }


  /**
   * Carga todas las recetas del backend.
   * También prepara la lista inicial de recetas filtradas.
   */
  private loadRecetas() {
    this.recetaService.buscarTodasRecetas().subscribe({
      next: r => {
        this.todasRecetas = r.data?.map(r => ({
          ...r,
          ingredientes: r.ingredientes || []
        })) || [];
        this.recetasFiltradas = [...this.todasRecetas];
      },
      error: () => this.snackBarService.error('Hubo un error al cargar las recetas')
    });
  }

  /**
   * Carga todas las categorías de ingredientes del backend.
   */
  private loadCategorias() {
    this.categoriaService.listarCategorias().subscribe({
      next: data => { this.categorias = data; },
      error: () => this.snackBarService.error('Hubo un error al cargar las categorías')
    });
  }

  /**
   * Distribuye los ingredientes cargados en cuatro columnas de forma equilibrada.
   */
  private distribuirEnColumnas() {
    this.columnas = [[], [], [], []];
    this.ingredientes.forEach((ing, idx) => {
      this.columnas[idx % 4].push(ing);
    });
  }

  /**
   * Maneja el clic sobre un ingrediente:
   * - Un clic abre el modal para añadir recetas.
   * - Un doble clic abre el modal para crear un nuevo ingrediente.
   * @param ingrediente Ingrediente sobre el que se hace clic.
   */
  handleClick(ingrediente: IngredienteDto) {
    this.clickCount++;
    this.currentIngrediente = ingrediente;

    if (this.clickCount === 1) {
      this.clickTimeout = setTimeout(() => {
        this.searchText = '';
        this.recetasFiltradas = [...this.todasRecetas];
        this.modalAddReceta.open();
        this.clickCount = 0;
      }, 200);
    } else if (this.clickCount === 2) {
      clearTimeout(this.clickTimeout);
      this.resetNuevoIngrediente();
      this.modalNuevoIngrediente.open();
      this.clickCount = 0;
    }
  }


  /**
   * Elimina una receta de la lista de un ingrediente específico.
   * @param receta Receta a eliminar.
   * @param ingrediente Ingrediente objetivo.
   */
  eliminarReceta(receta: RecetaDto, ingrediente: IngredienteDto) {
    receta.ingredientes = receta.ingredientes?.filter(ing => ing.id !== ingrediente.id) || [];
    this.recetaService.actualizarReceta(receta).subscribe({
      next: () => {
        this.loadIngredientes();
        this.loadRecetas();
        this.snackBarService.success(`Se ha eliminado '${receta.nombre}' en '${ingrediente.nombre}'`);
      },
      error: () => {
        this.snackBarService.error(`Hubo un error al eliminar ${receta.nombre} de ${ingrediente.nombre}`);
      }
    });
  }

  /**
   * Filtra las recetas disponibles según el texto ingresado.
   */
  filtrarRecetas() {
    const term = this.normalizeText(this.searchText.trim());
    if (!term) {
      this.recetasFiltradas = [...this.todasRecetas];
    } else {
      this.recetasFiltradas = this.todasRecetas.filter(receta =>
        this.normalizeText(receta.nombre || '').includes(term)
      );
    }
  }

  /**
   * Normaliza un texto para comparaciones insensibles a acentos y mayúsculas.
   * @param text Texto a normalizar.
   * @returns Texto normalizado.
   */
  private normalizeText(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  /**
   * Añade o elimina una receta del ingrediente actual según el estado del checkbox.
   * @param receta Receta objetivo.
   * @param checked Estado del checkbox.
   */
  toggleRecetaEnIngrediente(receta: RecetaDto, checked: boolean) {
    if (!this.currentIngrediente.recetas) {
      this.currentIngrediente.recetas = [];
    }

    const existe = this.currentIngrediente.recetas.some(r => r.id === receta.id);

    if (checked && !existe) {
      this.currentIngrediente.recetas.push({
        id: receta.id!,
        nombre: receta.nombre
      });
    } else if (!checked && existe) {
      this.currentIngrediente.recetas = this.currentIngrediente.recetas.filter(r => r.id !== receta.id);
    }

    this.ingredienteService.actualizarIngrediente(this.currentIngrediente).subscribe({
      next: () => this.loadIngredientes(),
      error: () => this.snackBarService.error('Hubo un error actualizando el ingrediente')
    });
  }


  /**
   * Verifica si una receta está actualmente asociada al ingrediente activo.
   * @param id ID de la receta.
   * @returns true si está asociada, false si no.
   */
  isRecetaEnIngrediente(id: number): boolean {
    return this.currentIngrediente?.recetas?.some(r => r.id === id) ?? false;
  }

  /**
   * Marca o desmarca una receta como seleccionada para el nuevo ingrediente en creación.
   * @param receta Receta objetivo.
   * @param checked Estado del checkbox.
   */
  toggleRecetaSeleccionadaNuevoIngrediente(receta: RecetaDto, checked: boolean) {
    if (checked) {
      this.recetasSeleccionadasNuevoIngrediente.add(receta.id!);
    } else {
      this.recetasSeleccionadasNuevoIngrediente.delete(receta.id!);
    }
  }

  /**
   * Verifica si una receta está seleccionada para ser añadida al nuevo ingrediente.
   * @param id ID de la receta.
   * @returns true si está seleccionada, false si no.
   */
  isRecetaSeleccionadaNuevoIngrediente(id: number): boolean {
    return this.recetasSeleccionadasNuevoIngrediente.has(id);
  }

  /**
   * Guarda un nuevo ingrediente junto a las recetas seleccionadas.
   * Realiza validaciones antes de enviar al backend.
   */
  guardarNuevoIngrediente() {
    if (!this.nuevoNombre.trim() || !this.nuevaCategoria) {
      this.snackBarService.error('Debe indicar nombre y categoría');
      return;
    }

    const recetasSeleccionadasDtos = this.todasRecetas
      .filter(r => this.recetasSeleccionadasNuevoIngrediente.has(r.id!))
      .map(r => ({
        id: r.id!,
        nombre: r.nombre
      }));

    const cuerpo: IngredienteDto = {
      nombre: this.nuevoNombre.trim(),
      categoria: this.nuevaCategoria,
      recetas: recetasSeleccionadasDtos
    };

    this.ingredienteService.altaIngrediente(cuerpo).subscribe({
      next: () => {
        this.snackBarService.success('Ingrediente creado con éxito');
        this.modalNuevoIngrediente.close();
        this.loadIngredientes();
        this.loadRecetas();
      },
      error: () => {
        this.modalNuevoIngrediente.close();
        this.snackBarService.error('Error al crear el ingrediente');
      }
    });
  }

  /**
   * Resetea los campos y selecciones del formulario de nuevo ingrediente.
   */
  private resetNuevoIngrediente() {
    this.nuevoNombre = '';
    this.nuevaCategoria = null;
    this.recetasSeleccionadasNuevoIngrediente.clear();
    this.searchText = '';
    this.recetasFiltradas = [...this.todasRecetas];
  }

  /**
   * Helper para obtener el emoji visual asociado a una categoría específica.
   * @see utils.getEmojiPorCategoria
   */
  protected readonly getEmojiPorCategoria = getEmojiPorCategoria;
  /**
   * Helper para obtener el emoji dominante de una receta,
   * calculado en base a la categoría predominante de sus ingredientes.
   * @see utils.getEmojiDominantePorReceta
   */
  protected readonly getEmojiDominantePorReceta = getEmojiDominantePorReceta;
}
