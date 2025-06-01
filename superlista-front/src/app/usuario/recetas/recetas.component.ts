import {Component, OnInit, ViewChild} from '@angular/core';
import {
  getCardClasses,
  getCardClassesPorReceta,
  getEmojiDominantePorReceta,
  getEmojiPorCategoria
} from '../../core/services/utils';
import {IngredienteDto, IngredienteService, IngredienteSimpleDto, RecetaDto, RecetaService} from '../../../openapi';
import {SnackbarService} from '../../core/services/snack-bar.service';
import {ModalComponent} from '../../core/componentes/modal/modal.component';

/**
 * @component
 * @name RecetasComponent
 * @description
 * Componente encargado de gestionar las recetas de la aplicación SúperLista.
 * Permite:
 * - Listar recetas y organizarlas en columnas.
 * - Editar los ingredientes de cada receta.
 * - Crear nuevas recetas seleccionando ingredientes.
 * - Filtrar ingredientes por texto.
 * - Visualizar emojis y estilos dinámicos según la categoría.
 */
@Component({
  selector: 'app-recetas',
  standalone: false,
  templateUrl: './recetas.component.html',
  styleUrl: './recetas.component.scss'
})
export class RecetasComponent implements OnInit {
  /**
   * Constructor del componente.
   * @param recetaService Servicio para gestionar recetas.
   * @param ingredienteService Servicio para gestionar ingredientes.
   * @param snackBarService Servicio para mostrar notificaciones flotantes.
   */
  constructor(
    private recetaService: RecetaService,
    private ingredienteService: IngredienteService,
    private snackBarService: SnackbarService
  ) {}

  /** Helper para obtener clases CSS según categoría. */
  protected readonly getCardClasses = getCardClasses;
  /** Matriz de columnas donde se distribuyen las recetas para mostrarlas en UI. */
  columnas: RecetaDto[][] = [[], [], [], []];
  /** Lista completa de recetas cargadas desde backend. */
  recetas!: RecetaDto[];
  /** Lista completa de ingredientes cargados desde backend. */
  ingredientes!: IngredienteDto[];
  /** Receta actualmente seleccionada para edición. */
  currentReceta!: RecetaDto;
  /** Temporizador para diferenciar entre clic simple y doble clic. */
  clickTimeout: any;
  /** Contador de clics sobre una receta. */
  clickCount = 0;
  /** Nombre ingresado para la creación de una nueva receta. */
  nuevoNombre: string = '';
  /** Texto de búsqueda para filtrar ingredientes. */
  searchText: string = '';
  /** Lista de ingredientes filtrados según el texto ingresado. */
  ingredientesFiltrados: IngredienteDto[] = [];
  /** IDs de ingredientes seleccionados para crear una nueva receta. */
  ingredientesSeleccionadosParaNuevaReceta: Set<number> = new Set();

  /** Referencia al modal para crear una nueva receta. */
  @ViewChild('modalNuevaReceta') modalNuevaReceta!: ModalComponent;
  /** Referencia al modal para añadir ingredientes a una receta existente. */
  @ViewChild('modalAddIngrediente') modalAddIngrediente!: ModalComponent;

  /**
   * Hook de inicialización.
   * Carga recetas e ingredientes al iniciar.
   */
  ngOnInit(): void {
    this.loadRecetas();
    this.loadIngredientes();
  }

  /**
   * Llama al servicio para obtener todas las recetas.
   */
  private loadRecetas() {
    this.recetaService.buscarTodasRecetas().subscribe({
      next: data => {
        this.recetas = data.data || [];
        this.distribuirEnColumnas();
      },
      error: () => {
        this.snackBarService.error('Hubo un error al cargar las recetas');
      }
    })
  }

  /**
   * Llama al servicio para obtener todos los ingredientes.
   */
  private loadIngredientes() {
    this.ingredienteService.obtenerTodosIngredientes().subscribe({
      next: data => {
        this.ingredientes = data.data || [];
        this.ingredientesFiltrados = [...this.ingredientes];
      },
      error: () => {
        this.snackBarService.error('Hubo un error al cargar los ingredientes');
      }
    });
  }

  /**
   * Distribuye las recetas cargadas en cuatro columnas.
   */
  private distribuirEnColumnas() {
    this.columnas = [[], [], [], []];
    this.recetas.forEach((receta, idx) => {
      this.columnas[idx % 4].push(receta);
    });
  }

  /**
   * Maneja el clic sobre una receta:
   * - Un clic abre el modal para añadir ingredientes.
   * - Doble clic abre el modal para crear una nueva receta.
   * @param receta Receta objetivo.
   */
  handleClick(receta: RecetaDto) {
    this.clickCount++;
    this.currentReceta = receta;

    if (this.clickCount === 1) {
      this.clickTimeout = setTimeout(() => {
        this.searchText = '';
        this.ingredientesFiltrados = [...this.ingredientes];
        this.modalAddIngrediente.open();
        this.clickCount = 0;
      }, 200);
    } else if (this.clickCount === 2) {
      clearTimeout(this.clickTimeout);
      this.nuevoNombre = '';
      this.searchText = '';
      this.ingredientesFiltrados = [...this.ingredientes];
      this.ingredientesSeleccionadosParaNuevaReceta.clear();
      this.modalNuevaReceta.open();
      this.clickCount = 0;
    }
  }

  /**
   * Elimina un ingrediente de una receta específica.
   * @param receta Receta objetivo.
   * @param ingrediente Ingrediente a eliminar.
   */
  eliminarIngrediente(receta: RecetaDto, ingrediente: IngredienteSimpleDto) {
    if (!receta.ingredientes) return;

    receta.ingredientes = receta.ingredientes.filter(ing => ing.id !== ingrediente.id);

    this.recetaService.actualizarReceta(receta).subscribe({
      next: () => {
        this.snackBarService.success(`Ingrediente ${ingrediente.nombre} eliminado de la receta ${receta.nombre}`);
        this.loadRecetas();
      },
      error: () => {
        this.snackBarService.error(`Error al eliminar ${ingrediente.nombre} de ${receta.nombre}`);
      }
    });
  }

  /**
   * Añade o quita un ingrediente de la receta actual según el estado del checkbox.
   * @param ingrediente Ingrediente objetivo.
   * @param checked Estado del checkbox.
   */
  toggleIngredienteEnReceta(ingrediente: IngredienteDto, checked: boolean) {
    if (!this.currentReceta) return;

    if (!this.currentReceta.ingredientes) {
      this.currentReceta.ingredientes = [];
    }

    const existe = this.currentReceta.ingredientes.some(i => i.id === ingrediente.id);

    if (checked && !existe) {
      this.currentReceta.ingredientes.push({
        id: ingrediente.id!,
        nombre: ingrediente.nombre,
        categoria: ingrediente.categoria
      });
    } else if (!checked && existe) {
      this.currentReceta.ingredientes = this.currentReceta.ingredientes.filter(i => i.id !== ingrediente.id);
    }

    this.recetaService.actualizarReceta(this.currentReceta).subscribe({
      next: () => {
        this.loadRecetas();
      },
      error: () => {
        this.snackBarService.error('Hubo un error actualizando la receta');
      }
    });
  }


  /**
   * Verifica si un ingrediente está presente en la receta actual.
   * @param id ID del ingrediente.
   * @returns true si está presente, false si no.
   */
  isIngredienteEnReceta(id: number): boolean {
    return this.currentReceta?.ingredientes?.some(i => i.id === id) ?? false;
  }

  /**
   * Filtra la lista de ingredientes según el texto ingresado.
   */
  filtrarIngredientes() {
    const term = this.searchText.trim().toLowerCase();
    if (!term) {
      this.ingredientesFiltrados = [...this.ingredientes];
    } else {
      this.ingredientesFiltrados = this.ingredientes.filter(i =>
        i.nombre?.toLowerCase().includes(term)
      );
    }
  }

  /**
   * Marca o desmarca un ingrediente para la nueva receta en creación.
   * @param id ID del ingrediente.
   * @param checked Estado del checkbox.
   */
  toggleIngredienteParaNuevaReceta(id: number, checked: boolean) {
    if (checked) {
      this.ingredientesSeleccionadosParaNuevaReceta.add(id);
    } else {
      this.ingredientesSeleccionadosParaNuevaReceta.delete(id);
    }
  }

  /**
   * Verifica si un ingrediente está seleccionado para la nueva receta.
   * @param id ID del ingrediente.
   * @returns true si está seleccionado, false si no.
   */
  isIngredienteSeleccionadoNuevaReceta(id: number): boolean {
    return this.ingredientesSeleccionadosParaNuevaReceta.has(id);
  }


  /**
   * Guarda una nueva receta usando los ingredientes seleccionados.
   */
  guardarNuevaReceta() {
    if (!this.nuevoNombre.trim()) {
      this.snackBarService.error('El nombre de la receta es obligatorio');
      return;
    }

    const ingredientesSeleccionadosDtos: IngredienteSimpleDto[] = this.ingredientes
      .filter(i => this.ingredientesSeleccionadosParaNuevaReceta.has(i.id!))
      .map(i => ({ id: i.id!, nombre: i.nombre, categoria: i.categoria }));

    const nuevaReceta: RecetaDto = {
      nombre: this.nuevoNombre.trim(),
      ingredientes: ingredientesSeleccionadosDtos
    };

    this.recetaService.altaReceta(nuevaReceta).subscribe({
      next: () => {
        this.snackBarService.success('Receta creada con éxito');
        this.modalNuevaReceta.close();
        this.loadRecetas();
        this.nuevoNombre = '';
        this.searchText = '';
        this.ingredientesSeleccionadosParaNuevaReceta.clear();
      },
      error: () => {
        this.snackBarService.error('Hubo un error al crear la receta');
      }
    });
  }


  /**
   * Helper para obtener el emoji dominante de una receta según su categoría principal.
   * @see utils.getEmojiDominantePorReceta
   */
  public readonly getEmojiDominantePorReceta = getEmojiDominantePorReceta;
  /**
   * Helper para obtener el emoji asociado a una categoría específica.
   * @see utils.getEmojiPorCategoria
   */
  public readonly getEmojiPorCategoria = getEmojiPorCategoria;
  /**
   * Helper para obtener las clases CSS según la categoría dominante de una receta.
   * @see utils.getCardClassesPorReceta
   */
  protected readonly getCardClassesPorReceta = getCardClassesPorReceta;
}
