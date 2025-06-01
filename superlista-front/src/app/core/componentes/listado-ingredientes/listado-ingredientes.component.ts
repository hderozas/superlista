import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  CategoriaIngredienteService,
  IngredienteDto,
  IngredienteService,
  RecetaDto
} from '../../../../openapi';
import { NgClass, CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DataRefreshService } from '../../services/DataRefreshService';
import { Subject, takeUntil } from 'rxjs';
import {ModalComponent} from '../modal/modal.component';

@Component({
  selector: 'app-listado-ingredientes',
  templateUrl: './listado-ingredientes.component.html',
  styleUrls: ['./listado-ingredientes.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    CommonModule,
    ModalComponent,
    FormlyModule,
    DragDropModule
  ]
})
export class ListadoIngredientesComponent implements OnInit, OnDestroy {
  ingredientes: IngredienteDto[] = [];
  ingredientesOriginales: IngredienteDto[] = [];
  private destroy$ = new Subject<void>();

  @ViewChild('RecetasConIngredientesModal') modalReceta!: ModalComponent;
  ingredienteSeleccionado!: string;
  recetasSeleccionadas: RecetaDto[] = [];

  @ViewChild('NuevoIngredienteModal') modalNuevoIngrediente!: ModalComponent;
  nuevoIngredienteForm = new FormGroup({});
  nuevoIngredienteModel: any = {};
  nuevoIngredienteFields: FormlyFieldConfig[] = [
    {
      key: 'nombre',
      type: 'input',
      props: {
        type: 'text',
        label: 'Nombre',
        required: true,
        placeholder: 'Nombre del ingrediente'
      }
    },
    {
      key: 'categoria',
      type: 'select',
      props: {
        label: 'Categoría',
        required: true,
        options: []
      },
      hooks: {
        onInit: field => {
          this.categoriaService.listarCategorias().subscribe({
            next: res => {
              field.props!.options = res.map(item => ({
                label: item.descripcion,
                value: item.id
              }));
            }
          });
        }
      }
    }
  ];

  buscarForm = new FormGroup({});
  buscarModel: any = {};
  buscarFields: FormlyFieldConfig[] = [
    {
      key: 'categoria',
      type: 'select',
      props: {
        placeholder: 'Todas',
        options: []
      },
      hooks: {
        onInit: field => {
          this.categoriaService.listarCategorias().subscribe({
            next: res => {
              field.props!.options = res.map(item => ({
                label: item.descripcion,
                value: item.nombre
              }));
            }
          });
        }
      }
    }
  ];

  constructor(
    private ingredienteService: IngredienteService,
    private categoriaService: CategoriaIngredienteService,
    private snackBarService: MatSnackBar,
    private refresh: DataRefreshService
  ) {}

  ngOnInit(): void {
    this.refresh.refresh$.pipe(takeUntil(this.destroy$))
      .subscribe(() => this.loadIngredientes());
    this.loadIngredientes();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadIngredientes() {
    this.ingredienteService.obtenerTodosIngredientes().subscribe({
      next: res => {
        this.ingredientesOriginales = res.data || [];
        this.ingredientes = [...this.ingredientesOriginales];
      },
      error: () => this.snackbarok('Error cargando ingredientes')
    });
  }

  getCardClasses(c: string): string[] {
    // tu lógica de clases...
    return ['border-0','bg-light'];
  }

  modalRecetas(ing: IngredienteDto) {
    this.ingredienteSeleccionado = ing.nombre!;
    this.recetasSeleccionadas = ing.recetas || [];
    this.modalReceta.open();
  }

  guardarNuevoIngrediente() {
    this.ingredienteService.altaIngrediente(this.nuevoIngredienteModel).subscribe({
      next: () => {
        this.loadIngredientes();
        this.snackbarok('Ingrediente creado');
        this.modalNuevoIngrediente.close();
      },
      error: () => {
        this.snackbarnok('Error al crear ingrediente');
        this.modalNuevoIngrediente.close();
      }
    });
  }

  aplicarFiltro(m: { categoria?: IngredienteDto.CategoriaEnum }) {
    this.ingredientes = m.categoria
      ? this.ingredientesOriginales.filter(i => i.categoria === m.categoria)
      : [...this.ingredientesOriginales];
  }

  snackbarok(msg: string) { this.snackBarService.open(msg,'',{ panelClass:['snackbar-success']}); }
  snackbarnok(msg: string) { this.snackBarService.open(msg,'',{ panelClass:['snackbar-error']}); }
}
