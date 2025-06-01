import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent }
];

/**
 * @module
 * @name AuthRoutingModule
 * @description
 * Módulo de enrutamiento para la sección de autenticación de la aplicación SúperLista.
 * Define las rutas específicas para acceder a:
 * - LoginComponent: disponible en la ruta '/login'.
 * - RegistroComponent: disponible en la ruta '/registro'.
 *
 * Este módulo se importa dentro del AuthModule para mantener separada la configuración de rutas
 * y facilitar la organización y el mantenimiento del proyecto.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
