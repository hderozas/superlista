import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';
import {ModalComponent} from '../core/componentes/modal/modal.component';

/**
 * @module
 * @name AuthModule
 * @description
 * Módulo de autenticación de la aplicación SúperLista.
 * Este módulo agrupa todos los componentes relacionados con el proceso de autenticación, incluyendo:
 * - LoginComponent: para iniciar sesión.
 * - RegistroComponent: para registrar nuevos usuarios.
 *
 * Además, importa módulos esenciales como:
 * - AuthRoutingModule: define las rutas del módulo de autenticación.
 * - ReactiveFormsModule: para manejar formularios reactivos.
 * - FormlyModule: para construir formularios dinámicos.
 * - ModalComponent: para mostrar mensajes emergentes al usuario.
 *
 * Este módulo encapsula toda la funcionalidad de autenticación, asegurando una organización clara y modular dentro de la aplicación.
 */
@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormlyModule,
    ModalComponent
  ]
})
export class AuthModule { }
