import { Component } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthControllerService} from '../../../openapi';
import {FormlyFieldConfig} from '@ngx-formly/core';
import { Location } from '@angular/common';
import {SnackbarService} from '../../core/services/snack-bar.service';

/**
 * @component
 * @name LoginComponent
 * @description
 * Componente encargado de gestionar el formulario de inicio de sesión.
 * Permite al usuario introducir sus credenciales (usuario y contraseña) para autenticarse en la aplicación.
 * Utiliza ngx-formly para generar dinámicamente los campos del formulario y muestra mensajes de error mediante el servicio Snackbar.
 * Si la autenticación es exitosa, redirige al usuario al área privada.
 * Además, permite navegar a la página de registro o volver a la página anterior.
 *
 * @example
 * <app-login></app-login>
 */
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  /**
   * Constructor del componente.
   * @param router Servicio de enrutamiento de Angular.
   * @param authService Servicio de autenticación generado por OpenAPI.
   * @param location Servicio para controlar la navegación del historial.
   * @param snackbar Servicio personalizado para mostrar mensajes emergentes.
   */
  constructor(private router:Router, private authService:AuthControllerService, private location: Location,
              private snackbar: SnackbarService) {}

  /** Formulario reactivo asociado al formulario de inicio de sesión. */
  form = new FormGroup({});
  /** Modelo que almacena los datos del formulario (usuario, contraseña). */
  model: any = {};
  /** Definición de los campos del formulario utilizando ngx-formly. */
  fields: FormlyFieldConfig[] = [
    {
      key: 'username',
      type: 'input',
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
      props: {
        label: 'Contraseña',
        required: true,
        hideRequiredMarker: true,
        type: 'password',
        addonRight: {
          text: '🙈',
          onClick: (field: { templateOptions: { type: string; addonRight: { text: string; }; }; }) => {
            const current = field.templateOptions.type;
            field.templateOptions.type = current === 'password' ? 'text' : 'password';
            field.templateOptions.addonRight.text = current === 'password' ? '🙉' : '🙈';
          }
        }
      }
    },
  ];


  /**
   * Envía el formulario al backend para autenticación.
   * Si es exitoso, guarda el token en localStorage y redirige al home.
   * Si falla, muestra un mensaje de error.
   */
  submit() {
    this.authService.login(this.model).subscribe({
      next: (result) => {
        console.log(result)
        localStorage.setItem('token', result.data!.token!);
        this.router.navigate(['/superlista/home']);
      },
      error: (error) => {
        this.snackbar.error("Usuario o contraseña incorrectos")
      }
    })
  }

  /**
   * Navega a la página de registro de usuario.
   */
  abrirRegistro() {
    this.router.navigate(['/auth/registro']);
  }

  /**
   * Vuelve a la página anterior usando el historial de navegación.
   */
  volverAtras(): void {
    this.location.back();
  }
}
