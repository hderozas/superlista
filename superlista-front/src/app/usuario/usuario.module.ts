import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {UsuarioRoutingModule} from './usuario-routing.module';
import {ListadoIngredientesComponent} from '../core/componentes/listado-ingredientes/listado-ingredientes.component';
import {AppModule} from "../app.module";
import {ListadoRecetasComponent} from '../core/componentes/listado-recetas/listado-recetas.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CrearMenuComponent } from './crear-menu/crear-menu.component';
import {HeaderComponent} from '../core/componentes/header/header.component';
import { MenuComponent } from './menu/menu.component';
import { IngredientesComponent } from './ingredientes/ingredientes.component';
import { ListasComponent } from './listas/listas.component';
import { RecetasComponent } from './recetas/recetas.component';
import {ModalComponent} from '../core/componentes/modal/modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenuDetalleComponent} from '../core/componentes/menu-detalle/menu-detalle.component';
import {MenuTablaComponent} from "../core/componentes/menu-tabla/menu-tabla.component";
import {FormlyModule} from '@ngx-formly/core';


/**
 * @module
 * @name UsuarioModule
 * @description
 * Módulo principal para las funcionalidades del usuario en la aplicación SúperLista.
 * Agrupa todos los componentes relacionados con:
 * - Gestión del hogar (home del usuario).
 * - Ingredientes, recetas, menús y listas.
 * - Creación y edición de menús.
 * Este módulo está protegido por rutas con guardas (AuthGuard) y se carga bajo la ruta 'superlista'.
 */
@NgModule({
  declarations: [
    HomeComponent,
    CrearMenuComponent,
    MenuComponent,
    IngredientesComponent,
    ListasComponent,
    RecetasComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    DragDropModule,
    ListadoIngredientesComponent,
    ListadoRecetasComponent,
    HeaderComponent,
    ModalComponent,
    ReactiveFormsModule,
    FormsModule,
    MenuDetalleComponent,
    MenuTablaComponent,
    FormlyModule,


  ]
})
export class UsuarioModule { }
