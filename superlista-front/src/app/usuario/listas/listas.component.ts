import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IngredienteDto, IngredienteService, ListaCompraDto, ListaCompraResourceService} from '../../../openapi';
import {SnackbarService} from '../../core/services/snack-bar.service';
import {ModalComponent} from '../../core/componentes/modal/modal.component';
import {debounceTime, forkJoin, Observable, Subject} from 'rxjs';
import {getCardClasses, getEmojiPorCategoria} from '../../core/services/utils';
import {animate, style, transition, trigger} from '@angular/animations';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * @component
 * @name ListasComponent
 * @description
 * Componente que gestiona la visualización, edición, eliminación y exportación de listas de la compra
 * en la aplicación SúperLista. Permite:
 * - Listar las listas de la compra del usuario.
 * - Editar los ingredientes de una lista en tiempo real.
 * - Eliminar listas con confirmación.
 * - Exportar listas como PDF con formato visual.
 */
@Component({
  selector: 'app-listas',
  standalone: false,
  templateUrl: './listas.component.html',
  styleUrl: './listas.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95) translateY(10px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
      ]),
      transition(':leave', [
        animate('600ms ease-in', style({ opacity: 0, transform: 'scale(0.95) translateY(10px)' }))
      ])
    ])
  ]
})
export class ListasComponent implements OnInit, AfterViewInit {
  /** Listas de compra cargadas desde el backend. */
  listas: ListaCompraDto[] = [];
  /** Lista actualmente seleccionada para edición. */
  listaSeleccionada: ListaCompraDto | null = null;
  /** IDs de ingredientes actualmente seleccionados en la lista. */
  ingredientesSeleccionados = new Set<number>();
  /** Lista completa de ingredientes disponibles. */
  todosIngredientes: IngredienteDto[] = [];
  /** Lista de ingredientes que no están incluidos en la lista seleccionada. */
  ingredientesNoincluidos: IngredienteDto[] = [];
  /** Subject para detectar cambios en los ingredientes con debounce. */
  private cambiosIngredientes$ = new Subject<void>();

  /** Referencia al modal de edición de lista. */
  @ViewChild('modalEditarLista') modalEditarLista!: ModalComponent;

  /**
   * Constructor del componente.
   * @param listaService Servicio para gestionar listas de compra.
   * @param ingredienteService Servicio para gestionar ingredientes.
   * @param snackBar Servicio para mostrar notificaciones flotantes.
   */
  constructor(private listaService: ListaCompraResourceService,
              private ingredienteService: IngredienteService,
              private snackBar: SnackbarService){}
  /**
   * Hook de inicialización.
   * Carga las listas y se suscribe al Subject de cambios con debounce.
   */
  ngOnInit(): void {
    this.cargarListas();
    this.cambiosIngredientes$
      .pipe(debounceTime(100))
      .subscribe(() => this.debouncedGuardarCambios());
  }
  /**
   * Hook de postinicialización de la vista.
   * Se suscribe al cierre del modal para resetear datos.
   */
  ngAfterViewInit(): void {
    this.modalEditarLista.closed.subscribe(() => this.resetModalData());
  }

  /**
   * Resetea los datos internos del modal al cerrarlo.
   */
  private resetModalData(): void {
    this.listaSeleccionada = null;
    this.ingredientesSeleccionados.clear();
    this.todosIngredientes = [];
    this.ingredientesNoincluidos = [];
    this.filtroIngrediente = '';
  }
  /**
   * Carga todas las listas de compra del usuario.
   */
  cargarListas(): void {
    this.listaService.obtenerMisListas().subscribe({
      next: res => {
        this.listas = res.data || [];
      },
      error: () => this.snackBar.error('Error al cargar las listas')
    });
  }

  /**
   * Elimina una lista específica.
   * @param listaId ID de la lista a eliminar.
   */
  eliminarLista(listaId: number): void {
    this.listaService.eliminarLista({ listaCompraId: listaId }).subscribe({
      next: () => {
        this.snackBar.success('Lista eliminada');
        this.cargarListas();
      },
      error: () => this.snackBar.error('No se pudo eliminar la lista')
    });
  }

  /**
   * Abre el modal para editar una lista específica.
   * @param lista Lista seleccionada.
   */
  abrirModalEditar(lista: ListaCompraDto): void {
    this.listaSeleccionada = lista;
    this.filtroIngrediente = '';
    this.ingredientesSeleccionados = new Set(lista.items!.map(i => i.id!));

    this.ingredienteService.obtenerTodosIngredientes().subscribe({
      next: res => {
        this.todosIngredientes = res.data || [];

        // Ingredientes que no están en la lista
        this.ingredientesNoincluidos = this.todosIngredientes.filter(ing =>
          !this.ingredientesSeleccionados.has(ing.id!)
        );

        this.modalEditarLista.open();
      },
      error: () => this.snackBar.error('No se pudieron cargar los ingredientes')
    });
  }
  /**
   * Marca o desmarca un ingrediente en la lista seleccionada.
   * @param id ID del ingrediente.
   * @param checked Estado del checkbox.
   */
  toggleIngrediente(id: number, checked: boolean): void {
    if (checked) {
      this.ingredientesSeleccionados.add(id);
    } else {
      this.ingredientesSeleccionados.delete(id);
    }

    this.cambiosIngredientes$.next();
  }
  /**
   * Guarda los cambios en la lista con un debounce.
   */
  private debouncedGuardarCambios(): void {
    if (!this.listaSeleccionada) return;

    const idsActuales = this.listaSeleccionada.items!.map(i => i.id!);
    const nuevos = [...this.ingredientesSeleccionados].filter(id => !idsActuales.includes(id));
    const eliminados = idsActuales.filter(id => !this.ingredientesSeleccionados.has(id));

    const peticiones: Observable<any>[] = [];

    if (nuevos.length > 0) {
      peticiones.push(this.listaService.anadirItems({
        listaCompraId: this.listaSeleccionada.id!,
        ingredienteIds: nuevos
      }));
    }

    if (eliminados.length > 0) {
      peticiones.push(this.listaService.quitarItems({
        listaCompraId: this.listaSeleccionada.id!,
        ingredienteIds: eliminados
      }));
    }

    if (peticiones.length === 0) return;

    forkJoin(peticiones).subscribe({
      next: () => {
        // ✅ Solo actualizamos visualmente cuando ya hemos guardado en BBDD
        this.listaSeleccionada!.items = this.todosIngredientes.filter(ing =>
          this.ingredientesSeleccionados.has(ing.id!)
        );
        this.ingredientesNoincluidos = this.todosIngredientes.filter(ing =>
          !this.ingredientesSeleccionados.has(ing.id!)
        );
        this.snackBar.success('Lista actualizada');
      },
      error: () => {
        this.snackBar.error('Error al actualizar la lista');
      }
    });
  }

  /**
   * Función de optimización para el *ngFor.
   * @param index Índice del elemento.
   * @param item Ingrediente.
   * @returns ID del ingrediente.
   */
  trackById(index: number, item: IngredienteDto): number {
    return item.id!;
  }
  /**
   * Devuelve las clases CSS completas para una tarjeta de ingrediente.
   * @param categoria Categoría del ingrediente.
   * @returns Arreglo de clases CSS.
   */
  getFullCardClasses(categoria: string): string[] {
    return ['card-ingrediente', ...getCardClasses(categoria)];
  }

  /** Texto del filtro aplicado a los ingredientes no incluidos. */
  filtroIngrediente: string = '';

  /**
   * Getter computado que filtra los ingredientes no incluidos según el texto ingresado.
   */
  get ingredientesFiltrados(): IngredienteDto[] {
    const filtro = this.filtroIngrediente.toLowerCase();
    return this.ingredientesNoincluidos.filter(ing =>
      ing.nombre?.toLowerCase().includes(filtro)
    );
  }

  /** Referencia al modal de confirmación para eliminar lista. */
  @ViewChild('modalConfirmarEliminar') modalConfirmarEliminar!: ModalComponent;

  /** Lista marcada para eliminación. */
  listaAEliminar: ListaCompraDto | null = null;

  /**
   * Abre el modal para confirmar la eliminación de una lista.
   * @param lista Lista objetivo.
   */
  mostrarConfirmarEliminar(lista: ListaCompraDto): void {
    this.listaAEliminar = lista;
    this.modalConfirmarEliminar.open();
  }

  /**
   * Confirma y ejecuta la eliminación de la lista marcada.
   */
  confirmarEliminacion(): void {
    if (!this.listaAEliminar) return;

    this.listaService.eliminarLista({ listaCompraId: this.listaAEliminar.id! }).subscribe({
      next: () => {
        this.snackBar.success('Lista eliminada');
        this.cargarListas();
        this.modalConfirmarEliminar.close();
        this.listaAEliminar = null;
      },
      error: () => this.snackBar.error('No se pudo eliminar la lista')
    });
  }

  /** Referencia al contenedor HTML que se usará para exportar el PDF. */
  @ViewChild('contenidoListaPdf') contenidoListaPdf!: ElementRef;
  /** Mapa para guardar estilos originales antes de exportar. */
  private estilosOriginalesLista = new Map<HTMLElement, string>();

  /**
   * Descarga la lista seleccionada como un archivo PDF,
   * renderizando cada página con html2canvas.
   * @param lista Lista objetivo.
   */
  async descargarListaComoPDF(lista: ListaCompraDto) {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const itemsPerPage = 45; // Ajusta según tus necesidades
    let currentPage = 1;
    let itemsProcessed = 0;

    while (itemsProcessed < lista.items!.length) {
      if (currentPage > 1) pdf.addPage();

      const currentItems = lista.items!.slice(itemsProcessed, itemsProcessed + itemsPerPage);
      itemsProcessed += currentItems.length;

      // Crear contenedor temporal para CADA página
      const pdfContainer = document.createElement('div');
      pdfContainer.style.position = 'absolute';
      pdfContainer.style.left = '-9999px';
      pdfContainer.style.width = '210mm';
      pdfContainer.style.minHeight = '297mm';
      pdfContainer.style.background = 'white';
      pdfContainer.style.padding = '20mm';
      pdfContainer.style.boxSizing = 'border-box';
      pdfContainer.style.fontFamily = 'Arial, "Noto Emoji", sans-serif';
      pdfContainer.style.columnCount = '3'; // 3 columnas
      pdfContainer.style.columnGap = '15mm';

      pdfContainer.innerHTML = `
      <h1 style="font-size: 24pt; margin-bottom: 15mm; text-align: center; page-break-after: avoid;">
        🛒 Lista #${lista.id} ${currentPage > 1 ? `(Cont.)` : ''}
      </h1>
      <div style="font-size: 14pt;">
        ${currentItems.map(ing => `
          <div style="break-inside: avoid; margin-bottom: 8mm;">
            ☐ ${this.getEmojiPorCategoria(ing.categoria!)} ${ing.nombre}
          </div>
        `).join('')}
      </div>
    `;
      document.body.appendChild(pdfContainer);

      const canvas = await html2canvas(pdfContainer, {
        scale: 2,
        useCORS: true,
        windowWidth: 794,
        windowHeight: 1123
      });

      pdf.addImage(
        canvas,
        'PNG',
        0, // x
        0, // y
        210, // width (A4)
        297 // height (A4)
      );

      document.body.removeChild(pdfContainer);
      currentPage++;
    }

    pdf.save(`lista-compra-${lista.id}.pdf`);
  }

  /**
   * Helper que obtiene el emoji visual asociado a una categoría.
   * @see utils.getEmojiPorCategoria
   */
  protected readonly getEmojiPorCategoria = getEmojiPorCategoria;
}
