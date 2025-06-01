import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormsModule} from '@angular/forms';
import {ModalComponent} from '../modal/modal.component';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {UsuarioDto, UsuariosService} from '../../../../openapi';
import {FormlyFieldConfig, FormlyModule} from '@ngx-formly/core';
import {SnackbarService} from '../../services/snack-bar.service';

/**
 * @component
 * @name HeaderComponent
 * @description
 * Componente standalone que representa el encabezado principal de la aplicación SúperLista.
 * Gestiona la visualización y navegación entre las diferentes secciones: ingredientes, listas, recetas, menú y home.
 * Permite al usuario visualizar y actualizar sus datos de perfil, así como cerrar sesión.
 * Utiliza ngx-formly para construir dinámicamente el formulario de edición de perfil y muestra mensajes emergentes con SnackbarService.
 *
 * @example
 * <app-header></app-header>
 */
@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [
    FormsModule,
    ModalComponent,
    FormlyModule,
    NgIf,
    NgClass

  ],
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  /**
   * Constructor del componente.
   * @param router Servicio de enrutamiento de Angular.
   * @param userService Servicio para obtener y actualizar datos del usuario.
   * @param snackBar Servicio personalizado para mostrar notificaciones.
   */
  constructor(private router:Router,
              private userService: UsuariosService,
              private snackBar: SnackbarService) {
  }
  /** Información del usuario actualmente logueado. */
  usuario: UsuarioDto = {};
  /** Referencia al modal usado para mostrar el formulario de edición del perfil. */
  @ViewChild('modalUsuario') modalUsuario!: ModalComponent;
  /** Controla la visualización del área de cuenta en el encabezado. */
  mostrarCuenta = false;

  /**
   * Hook de inicialización del componente.
   * Carga los datos iniciales del usuario.
   */
  ngOnInit(): void {
    this.cargarUsuarioInicial();
  }
  /**
   * Obtiene los datos del usuario logueado y los carga en el formulario reactivo.
   */
  cargarUsuarioInicial(){
    this.userService.obtenerUsuarioPorEmail().subscribe({
      next: data => {
        this.usuario = data.data!;
        this.model = data.data!;
        this.form.patchValue(this.model);
      }
    })
  }
  /** Navega a la vista de ingredientes. */
  goIngredientes() {
    this.router.navigate(['superlista/ingredientes']);
  }
  /** Navega a la vista de listas de compra. */
  goListas() {
    this.router.navigate(['superlista/mis-listas']);
  }
  /** Navega a la vista de recetas. */
  goRecetas() {
    this.router.navigate(['superlista/recetas']);
  }
  /** Navega a la vista del menú semanal. */
  goMenu() {
    this.router.navigate(['superlista/menu']);
  }
  /** Navega a la página principal (home). */
  goHome() {
    this.router.navigate(['superlista/home']);
  }
  /** Definición de campos del formulario de edición del usuario usando ngx-formly. */
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
  /** Formulario reactivo para la edición del usuario. */
  form = new FormGroup({});
  /** Modelo que contiene los datos actuales del formulario. */
  model: any = {};
  /** Opciones del formulario (vacías por defecto). */
  options: any = {};
  /**
   * Cierra la sesión del usuario, limpia el localStorage y redirige a la raíz.
   */
  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  /**
   * Envía los datos actualizados del usuario al backend.
   * Muestra un mensaje de éxito o error y actualiza los datos locales.
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
