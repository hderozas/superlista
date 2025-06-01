import {Component, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {UsuariosService} from '../../../openapi';
import {Router} from '@angular/router';
import {ModalComponent} from '../../core/componentes/modal/modal.component';
import { Location } from '@angular/common';

/**
 * @component
 * @name RegistroComponent
 * @description
 * Componente encargado de gestionar el formulario de registro de nuevos usuarios.
 * Permite a los usuarios crear una cuenta proporcionando su nombre, apellidos, correo electrónico, nombre de usuario y contraseña.
 * Usa ngx-formly para la construcción dinámica del formulario y muestra un modal para confirmar el éxito o fallo del registro.
 * Si el registro es exitoso, redirige automáticamente al login.
 *
 * @example
 * <app-registro></app-registro>
 */
@Component({
  selector: 'app-registro',
  standalone: false,
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  /** Indica si el registro fue exitoso, usado para controlar la redirección posterior. */
  registroExitoso = false;
  /** Formulario reactivo asociado al formulario de registro. */
  form = new FormGroup({});
  /** Modelo que almacena los datos del formulario (usuario, contraseña, nombre, apellidos, correo). */
  model: any = {};
  /** Definición de los campos del formulario utilizando ngx-formly. */
  fields: FormlyFieldConfig[] = [
    {
      key: 'username',
      type: 'input',
      wrappers: ['horizontal'],
      props: {
        type: 'text',
        label: 'Usuario',
        required: true,
        hideRequiredMarker: true,
        placeholder: 'Nombre de usuario',
      },
    },
    {
      key: 'password',
      type: 'input',
      wrappers: ['horizontal'],
      props: {
        label: 'Contraseña',
        required: true,
        hideRequiredMarker: true,
        type: 'password',
        addonRight: {
          text: '🙈',
          onClick: (field: { templateOptions: { type: string; addonRight: { text: string } } }) => {
            const current = field.templateOptions.type;
            field.templateOptions.type = current === 'password' ? 'text' : 'password';
            field.templateOptions.addonRight.text = current === 'password' ? '🙉' : '🙈';
          }
        }
      }
    },
    {
      key: 'nombre',
      type: 'input',
      wrappers: ['horizontal'],
      props: {
        type: 'text',
        label: 'Nombre',
        required: true,
        hideRequiredMarker: true,
        placeholder: 'Tu nombre real',
      },
    },
    {
      key: 'apellido',
      type: 'input',
      wrappers: ['horizontal'],
      props: {
        type: 'text',
        label: 'Apellidos',
        required: true,
        hideRequiredMarker: true,
        placeholder: 'Tus apellidos',
      },
    },
    {
      key: 'email',
      type: 'input',
      wrappers: ['horizontal'],
      props: {
        type: 'email',
        label: 'Correo electrónico',
        required: true,
        hideRequiredMarker: true,
        placeholder: 'example@domain.com',
      },
    },
  ];

  /** Referencia al componente de modal usado para mostrar mensajes al usuario. */
  @ViewChild(ModalComponent) modal!: ModalComponent;
  /** Mensaje que se muestra dentro del modal, dependiendo del resultado del registro. */
  mensaje!: string;

  /**
   * Envía el formulario al backend para registrar un nuevo usuario.
   * Si el registro es exitoso, muestra un mensaje de éxito y prepara la redirección.
   * Si falla, muestra un mensaje de error dentro del modal.
   */
  submit() {
    this.usuariosService.altaUsuario(this.model).subscribe({
      next: data => {
        this.registroExitoso = true;
        this.modal.title = '¡Se ha registrado con éxito!';
        this.mensaje = 'Al cerrar esta ventana se le redirigirá para que pueda iniciar sesión';
        this.modal.open();
      },
      error: err => {
        this.registroExitoso = false;
        this.modal.title = '¡Hay un problema!';
        this.mensaje = err.error.data;
          this.modal.open();
      }
    })
  }

  /**
   * Acción que se ejecuta al cerrar el modal.
   * Si el registro fue exitoso, redirige al usuario a la página de login.
   */
  cerrarModal() {
    if (this.registroExitoso) {
      this.router.navigate(['/auth/login']);
    }
  }

  /**
   * Vuelve a la página anterior usando el historial de navegación.
   */
  volverAtras(): void {
    this.location.back();
  }


  /**
   * Constructor del componente.
   * @param usuariosService Servicio encargado de gestionar las operaciones de usuario.
   * @param router Servicio de enrutamiento de Angular.
   * @param location Servicio para controlar la navegación del historial.
   */
  constructor(private usuariosService:UsuariosService, protected router: Router, private location: Location) { }
}
