import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePublicoComponent} from './home-publico/home-publico.component';
import {AuthGuard} from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePublicoComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'superlista',
    canActivate: [AuthGuard],
    loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule)
  },
  {
    path: '**',
    redirectTo: ''
  },
];

/**
 * @module
 * @name AppRoutingModule
 * @description
 * Módulo de enrutamiento principal de la aplicación Angular SúperLista.
 * Define las rutas raíz de la aplicación, incluyendo:
 * - La home pública (sin autenticación).
 * - El módulo de autenticación (lazy load).
 * - El módulo privado 'superlista' protegido por AuthGuard.
 * - Un redireccionamiento global para rutas no encontradas.
 *
 * @example
 * RouterModule.forRoot(routes)
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
