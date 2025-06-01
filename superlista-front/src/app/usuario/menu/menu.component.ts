import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DiaComidaDto, ListaCompraResourceService, MenuSemanalDto, MenuSemanalService} from '../../../openapi';
import {SnackbarService} from '../../core/services/snack-bar.service';
import {ModalComponent} from '../../core/componentes/modal/modal.component';
import {Router} from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import CategoriaEnum = DiaComidaDto.CategoriaEnum;

/**
 * @component
 * @name MenuComponent
 * @description
 * Componente encargado de gestionar los menús semanales en la aplicación SúperLista.
 * Permite:
 * - Listar los menús creados por el usuario.
 * - Crear nuevos menús seleccionando categorías.
 * - Editar, eliminar y gestionar recetas asociadas a cada menú.
 * - Generar listas de compra desde un menú.
 * - Exportar el detalle del menú como archivo PDF.
 */
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  standalone: false,
})
export class MenuComponent implements OnInit {

  /** Lista de menús cargados desde el backend. */
  menus: MenuSemanalDto[] = [];
  /** Categorías seleccionadas para la creación de un nuevo menú. */
  categoriasSeleccionadas: CategoriaEnum[] = [];
  /** Lista completa de categorías disponibles. */
  todasCategorias: CategoriaEnum[] = ['DESAYUNO', 'ALMUERZO', 'COMIDA', 'MERIENDA', 'CENA'];

  /** Menú actualmente seleccionado para mostrar detalle o editar. */
  menuSeleccionado: MenuSemanalDto | null = null;

  /** Referencia al modal para crear un nuevo menú. */
  @ViewChild('modalNuevoMenu') modalNuevoMenu!: ModalComponent;
  /** Referencia al modal para ver el detalle de un menú. */
  @ViewChild('modalMenuDetalle') modalMenuDetalle!: ModalComponent;
  /** Referencia al modal de confirmación (por ejemplo, para eliminar un menú). */
  @ViewChild('modalConfirmar') modalConfirmar!: ModalComponent;

  /**
   * Constructor del componente.
   * @param menuService Servicio para gestionar los menús semanales.
   * @param listaService Servicio para generar listas de compra.
   * @param snackBarService Servicio para mostrar notificaciones flotantes.
   * @param router Servicio Angular Router para la navegación.
   */
  constructor(
    private menuService: MenuSemanalService,
    private listaService: ListaCompraResourceService,
    private snackBarService: SnackbarService,
    private router: Router,
  ) {}

  /**
   * Hook de inicialización del componente.
   * Carga todos los menús del usuario.
   */
  ngOnInit(): void {
    this.loadMenus();
  }
  /**
   * Llama al servicio para obtener los menús del usuario.
   */
  private loadMenus() {
    this.menuService.obtenerMisMenus().subscribe({
      next: (data) => {
        this.menus = data.data || [];
      },
      error: () => {
        this.snackBarService.error('Error al cargar tus menús');
      }
    });
  }
  /**
   * Abre el modal para crear un nuevo menú con todas las categorías seleccionadas por defecto.
   */
  abrirModalNuevoMenu() {
    this.categoriasSeleccionadas = [...this.todasCategorias];
    this.modalNuevoMenu.open();
  }
  /**
   * Marca o desmarca una categoría para la creación de un nuevo menú.
   * @param cat Categoría objetivo.
   * @param checked Estado del checkbox.
   */
  toggleCategoria(cat: CategoriaEnum, checked: boolean) {
    if (checked) {
      this.categoriasSeleccionadas.push(cat);
    } else {
      this.categoriasSeleccionadas = this.categoriasSeleccionadas.filter(c => c !== cat);
    }
  }
  /**
   * Cierra el modal y navega al componente de creación de menú,
   * pasando las categorías seleccionadas como parámetro de query.
   */
  crearMenu() {
    const categoriasFinal = this.categoriasSeleccionadas.length > 0 ? this.categoriasSeleccionadas : undefined;

    this.modalNuevoMenu.close();

    // Navegar al componente de crear-menu con las categorías seleccionadas
    this.router.navigate(['/superlista/crear-menu'], {
      queryParams: {
        categorias: categoriasFinal?.join(',') // pasamos como string "DESAYUNO,COMIDA,CENA"
      }
    });
  }

  /**
   * Abre el modal de detalle para gestionar un menú existente.
   * @param menu Menú seleccionado.
   */
  gestionarMenu(menu: MenuSemanalDto) {
    this.menuSeleccionado = menu;
    this.modalMenuDetalle.open();
  }
  /**
   * Cuenta el número total de recetas asociadas a un menú.
   * @param menu Menú objetivo.
   * @returns Número total de recetas.
   */
  contarTotalRecetas(menu: MenuSemanalDto): number {
    if (!menu.diasComidas) return 0;

    return menu.diasComidas.reduce((total, dia) => {
      return total + (dia.recetas?.length || 0);
    }, 0);
  }
  /**
   * Cierra el modal de detalle y navega al componente de edición de menú,
   * pasando el ID del menú como parámetro de query.
   */
  editarMenu() {
    this.modalMenuDetalle.close();
    this.router.navigate(['/superlista/crear-menu'], {
      queryParams: { menuId: this.menuSeleccionado!.id }
    });
  }
  /**
   * Elimina el menú actualmente seleccionado.
   */
  eliminarMenu() {
    if (!this.menuSeleccionado) return;

    this.menuService.eliminarMenu(this.menuSeleccionado.id!).subscribe({
      next: () => {
        this.snackBarService.success('Menú eliminado correctamente');
        this.modalConfirmar.close();
        this.modalMenuDetalle.close();
        this.loadMenus();
      },
      error: () => {
        this.snackBarService.error('Error al eliminar el menú');
      }
    });
  }
  /**
   * Abre el modal de confirmación para eliminar un menú.
   */
  openModalConfirmar() {
    this.modalConfirmar.open();
  }
  /**
   * Genera una lista de la compra a partir del menú seleccionado.
   */
  generarListaCompra() {
    if (!this.menuSeleccionado) return;
    this.listaService.generarLista({ menuId: this.menuSeleccionado.id! }).subscribe({
      next: () => {
        this.snackBarService.success('Lista de la compra generada correctamente');
        this.modalMenuDetalle.close();
      },
      error: () => {
        this.snackBarService.error('Error al generar la lista de la compra');
      }
    });
  }
  /**
   * Obtiene los nombres únicos de las recetas en un menú.
   * @param menu Menú objetivo.
   * @returns Array de nombres de recetas.
   */
  obtenerNombresRecetas(menu: MenuSemanalDto): string[] {
    const recetas = menu.diasComidas?.flatMap(d => d.recetas || []) || [];
    return Array.from(new Set(recetas.map(r => r.nombre!)));
  }
  /**
   * Obtiene las categorías únicas de un menú.
   * @param menu Menú objetivo.
   * @returns Array de categorías.
   */
  obtenerCategoriasMenu(menu: MenuSemanalDto): string[] {
    const categorias = menu.diasComidas?.map(dc => dc.categoria!) || [];
    return Array.from(new Set(categorias)); // Elimina duplicados
  }

  /** Referencia al contenedor HTML que se usará para exportar el PDF del menú. */
  @ViewChild('contenidoParaPdf') contenidoParaPdf!: ElementRef;
  /** Mapa para guardar los estilos originales de los elementos antes de exportar a PDF. */
  private estilosOriginales: Map<Element, string> = new Map();

  /**
   * Aplica estilos inline manuales a las tablas y celdas para que sean capturadas correctamente por html2canvas.
   * @param elemento Elemento HTML raíz sobre el que aplicar los estilos.
   */
  aplicarEstilosPDFManual(elemento: HTMLElement) {
    const elementos = elemento.querySelectorAll('table.pastel-table, th, td, tr');
    elementos.forEach(el => {
      const htmlEl = el as HTMLElement;
      if (!this.estilosOriginales.has(htmlEl)) {
        this.estilosOriginales.set(htmlEl, htmlEl.getAttribute('style') || '');
      }
      htmlEl.style.border = '1px solid #c5c5e5';
      htmlEl.style.borderCollapse = 'collapse';
    });
  }

  /**
   * Restaura los estilos originales guardados después de exportar a PDF.
   */
  restaurarEstilosOriginales() {
    this.estilosOriginales.forEach((valor, el) => {
      el.setAttribute('style', valor);
    });
    this.estilosOriginales.clear();
  }



  /**
   * Captura el contenido HTML del menú y lo descarga como archivo PDF.
   */
  descargarPDF() {
    const el = this.contenidoParaPdf.nativeElement;

    this.aplicarEstilosPDFManual(el);

    html2canvas(el, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: 'a4'
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgWidth = pageWidth;
      const imgHeight = canvas.height * (imgWidth / canvas.width);

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('menu.pdf');

      this.restaurarEstilosOriginales();
    });
  }



}
