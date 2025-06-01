import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {
  IngredienteService,
  ListaCompraResourceService, MenuSemanalService,
  RecetaService,
  UsuarioDto,
  UsuariosService
} from '../../../openapi';
import {ModalComponent} from '../../core/componentes/modal/modal.component';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {SnackbarService} from '../../core/services/snack-bar.service';

/**
 * @component
 * @name HomeComponent
 * @description
 * Componente principal del área privada de la aplicación SúperLista.
 * Muestra al usuario las estadísticas generales (ingredientes, recetas, listas, menús)
 * y permite acceder a las diferentes secciones, así como editar los datos personales desde un modal.
 *
 * Funcionalidades principales:
 * - Cargar información básica del usuario autenticado.
 * - Mostrar conteo total de ingredientes, recetas, listas de la compra y menús.
 * - Permitir navegación hacia las secciones principales.
 * - Mostrar y actualizar los datos del usuario (nombre, email, contraseña).
 *
 * @example
 * <app-home></app-home>
 */
@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {

  /** Datos del usuario autenticado. */
  usuario: UsuarioDto = {};

  /** Contador de ingredientes. */
  numIngredientes = 0;
  /** Contador de recetas. */
  numRecetas = 0;
  /** Contador de listas de la compra. */
  numListas = 0;
  /** Contador de menus. */
  numMenus = 0;
  /** Controla si se muestra el bloque de cuenta. */
  mostrarCuenta = false;

  /**
   * Constructor del componente.
   * @param router Servicio de enrutamiento.
   * @param usuariosService Servicio de usuarios.
   * @param ingredientesService Servicio de ingredientes.
   * @param recetasService Servicio de recetas.
   * @param listasService Servicio de listas de compra.
   * @param menuService Servicio de menús semanales.
   * @param userService Servicio de usuarios (duplicado, podría unificarse).
   * @param snackBar Servicio para mostrar mensajes flotantes.
   */
  constructor(
    private router: Router,
    private usuariosService: UsuariosService,
    private ingredientesService: IngredienteService,
    private recetasService: RecetaService,
    private listasService: ListaCompraResourceService,
    private menuService: MenuSemanalService,
    private userService: UsuariosService,
    private snackBar: SnackbarService
  ) {}

  /**
   * Hook de inicialización del componente.
   * Carga los datos iniciales del usuario y las estadísticas generales.
   */
  ngOnInit(): void {
    this.cargarUsuarioInicial()
  }

  /**
   * Obtiene los datos básicos del usuario autenticado.
   * Tras cargar los datos, llama a las funciones para cargar las estadísticas.
   */
  cargarUsuarioInicial(){
    this.usuariosService.obtenerUsuarioPorEmail().subscribe({
      next: (res) => {
        this.usuario = res.data!;
        this.cargarEstadisticas();
      }
    });
  }

  /**
   * Llama a los servicios correspondientes para obtener las estadísticas generales
   * del número de ingredientes, recetas, listas de compra y menús.
   */
  cargarEstadisticas(): void {
    this.ingredientesService.obtenerTodosIngredientes().subscribe({
      next: res => this.numIngredientes = res.data!.length
    });
    this.recetasService.buscarTodasRecetas().subscribe({
      next: res => this.numRecetas = res.data!.length
    });
    this.listasService.obtenerMisListas().subscribe({
      next: res => this.numListas = res.data!.length
    });
    this.menuService.obtenerMisMenus().subscribe({
      next: res => this.numMenus = res.data!.length
    });
  }

  /** Navega a la sección de ingredientes. */
  goIngredientes() {
    this.router.navigate(['superlista/ingredientes']);
  }

  /** Navega a la sección de listas. */
  goListas() {
    this.router.navigate(['superlista/mis-listas']);
  }

  /** Navega a la sección de recetas. */
  goRecetas() {
    this.router.navigate(['superlista/recetas']);
  }

  /** Navega a la sección de menús. */
  goMenu() {
    this.router.navigate(['superlista/menu']);
  }

  /** Referencia al modal de edición de usuario. */
  @ViewChild('modalUsuario') modalUsuario!: ModalComponent;

  /** Formulario reactivo para la edición de datos del usuario. */
  form = new FormGroup({});
  /** Modelo de datos vinculado al formulario de edición. */
  model: any = {};
  /** Opciones generales del formulario (usadas por Formly). */
  options: any = {};


  /**
   * Definición de los campos del formulario de edición de cuenta,
   * usando la librería ngx-formly.
   */
  fields: FormlyFieldConfig[] = [
    {
      key: 'username',
      type: 'input',
      wrappers: ['horizontal'],
      props: {
        label: 'Nombre de usuario',
        placeholder: 'Introduce el nombre de usuario',
        required: true,
        hideRequiredMarker: true,
      },
    },
    {
      key: 'nombre',
      type: 'input',
      wrappers: ['horizontal'],
      props: {
        label: 'Nombre',
        placeholder: 'Introduce el nombre',
        required: true,
        hideRequiredMarker: true,
      },
    },
    {
      key: 'apellido',
      type: 'input',
      wrappers: ['horizontal'],
      props: {
        label: 'Apellido',
        placeholder: 'Introduce el apellido',
        required: true,
        hideRequiredMarker: true,
      },
    },
    {
      key: 'email',
      type: 'input',
      wrappers: ['horizontal'],
      props: {
        type: 'email',
        label: 'Correo electrónico',
        placeholder: 'Introduce el email',
        required: true,
        hideRequiredMarker: true,
      },
    },
    {
      key: 'passwordAntiguo',
      type: 'input',
      wrappers: ['horizontal'],
      props: {
        type: 'password',
        label: 'Contraseña',
        placeholder: 'Introduce la contraseña antigua',
        required: false
      },
    },
    {
      key: 'passwordNuevo',
      type: 'input',
      wrappers: ['horizontal'],
      props: {
        type: 'password',
        label: 'Nueva contraseña',
        placeholder: 'Introduce una nueva contraseña',
        required: false
      },
    },
  ];

  /**
   * Abre el modal para editar los datos del usuario.
   */
  openModalCuenta(): void {
    this.model = { ...this.usuario };  // Copia los datos para edición
    this.form.reset();  // Limpia validaciones anteriores
    this.modalUsuario.open();
  }
  /**
   * Cierra sesión y redirige a la página pública.
   */
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }
  /**
   * Guarda los cambios en los datos del usuario.
   * Si tiene éxito, recarga la información; si falla, muestra un error.
   */
  actualizarDatos() {
    this.userService.actualizarUsuario(this.model).subscribe({
      next: response => {
        if (response.data == true) {
          this.cargarUsuarioInicial();
          this.snackBar.success("Usuario actualizado con éxito");
          this.modalUsuario.close();
        }
      },
      error: error => {
        this.cargarUsuarioInicial();
        this.snackBar.error("Hubo un error al actualizar los datos");
        this.modalUsuario.close();
      }
    })
  }
}
