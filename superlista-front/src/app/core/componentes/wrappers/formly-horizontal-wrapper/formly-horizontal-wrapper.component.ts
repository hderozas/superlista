import { Component } from '@angular/core';
import {FieldWrapper, FormlyModule} from '@ngx-formly/core';
import {NgIf} from '@angular/common';

/**
 * @component
 * @name FormlyHorizontalWrapper
 * @description
 * Wrapper personalizado de ngx-formly que muestra los campos de formulario en formato horizontal.
 * Divide cada campo en dos columnas: una para la etiqueta (label) y otra para el input, usando el sistema grid de Bootstrap.
 * Añade un asterisco opcional si el campo es requerido.
 *
 * @example
 * {
 *   wrappers: ['horizontal'],
 *   key: 'nombre',
 *   type: 'input',
 *   props: { label: 'Nombre', required: true }
 * }
 */
@Component({
  selector: 'formly-horizontal-wrapper',
  template: `
    <div class="row mb-3">
      <label [attr.for]="id" class="col-sm-5 col-form-label" *ngIf="props.label">
        {{ props.label }}
        <ng-container *ngIf="props.required && !props['hideRequiredMarker']">*</ng-container>
      </label>
      <div class="col-sm-7">
        <ng-template #fieldComponent></ng-template>
      </div>
    </div>
  `,
  imports: [
    FormlyModule,
    NgIf
  ]
})
export class FormlyHorizontalWrapper extends FieldWrapper {}
