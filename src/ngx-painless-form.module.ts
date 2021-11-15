import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BaseFormComponent } from './component/form-group/base-form/base-form.component';
import { FormInputRowComponent } from './component/form-group/form-input-row/form-input-row.component';
import { GenericInputGroupComponent } from './component/form-group/generic-input-group/generic-input-group.component';
import { GenericInputComponent } from './component/form-group/generic-input/generic-input.component';
import { Select2Component } from './component/form-group/select2/select2.component';
import ReactiveInput from './model/ReactiveInput';
import { NgSelect2Module } from 'ng-select2';

@NgModule({
  declarations: [
    BaseFormComponent,
    GenericInputComponent,
    GenericInputGroupComponent,
    FormInputRowComponent,
    Select2Component,
    ReactiveInput
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelect2Module
  ],
  exports: [
    BaseFormComponent,
    GenericInputComponent,
    GenericInputGroupComponent,
    FormInputRowComponent,
    Select2Component
  ]
})
export class NgxPainlessFormModule { }
