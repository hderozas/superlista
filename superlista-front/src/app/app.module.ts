import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiModule, Configuration } from '../openapi';
import {FormlyModule} from '@ngx-formly/core';
import {FormlyBootstrapModule} from '@ngx-formly/bootstrap';
import { ModalComponent } from './core/componentes/modal/modal.component';
import { ListadoIngredientesComponent } from './core/componentes/listado-ingredientes/listado-ingredientes.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FormlyHorizontalWrapper} from './core/componentes/wrappers/formly-horizontal-wrapper/formly-horizontal-wrapper.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ListadoRecetasComponent } from './core/componentes/listado-recetas/listado-recetas.component';
import {HeaderComponent} from './core/componentes/header/header.component';
import { MenuDetalleComponent } from './core/componentes/menu-detalle/menu-detalle.component';
import { MenuTablaComponent } from './core/componentes/menu-tabla/menu-tabla.component';
import { HomePublicoComponent } from './home-publico/home-publico.component';

/**
 * @module
 * @name AppModule
 * @description
 * Módulo raíz principal de la aplicación Angular SúperLista.
 * Declara los componentes fundamentales, importa todos los módulos necesarios,
 * registra interceptores HTTP, configura Formly y establece el componente raíz para el arranque.
 *
 * Incluye:
 * - Configuración del ApiModule para interactuar con el backend.
 * - Registro del AuthInterceptor para manejar autenticación.
 * - Importación de módulos de Angular Material, Formly, y componentes personalizados.
 *
 * @example
 * platformBrowserDynamic().bootstrapModule(AppModule);
 */
@NgModule({
  declarations: [
    AppComponent,
    HomePublicoComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ApiModule.forRoot(() => new Configuration({
      basePath: 'http://localhost:8080'
    })),
    FormlyModule.forRoot({
      wrappers: [{name: 'horizontal', component: FormlyHorizontalWrapper}],
    }),
    FormlyBootstrapModule,
    ModalComponent,
    ListadoIngredientesComponent,
    ListadoRecetasComponent,
    MatSnackBarModule,
    HeaderComponent,
    MenuDetalleComponent,
    MenuTablaComponent,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  exports: [
    ListadoRecetasComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
