import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CrearMenuComponent} from './crear-menu/crear-menu.component';
import {MenuComponent} from './menu/menu.component';
import {IngredientesComponent} from './ingredientes/ingredientes.component';
import {ListasComponent} from './listas/listas.component';
import {RecetasComponent} from './recetas/recetas.component';

/**
 * Declaración de rutas hijas bajo el módulo de usuario.
 */
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'ingredientes', component: IngredientesComponent },
  { path: 'crear-menu', component: CrearMenuComponent },
  { path: 'mis-listas', component: ListasComponent },
  { path: 'recetas', component: RecetasComponent },
];

/**
 * @module
 * @name UsuarioRoutingModule
 * @description
 * Módulo de rutas para las secciones del usuario en la aplicación SúperLista.
 * Define las rutas hijas que se cargan bajo el path principal 'superlista',
 * gestionando la navegación entre las distintas páginas:
 * home, menús, ingredientes, listas de la compra, recetas y creación de menús.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
