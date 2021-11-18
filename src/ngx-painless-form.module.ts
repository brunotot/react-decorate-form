import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BaseFormComponent } from './component/form-group/base-form/base-form.component';
import { FormInputRowComponent } from './component/form-group/form-input-row/form-input-row.component';
import { GenericInputGroupComponent } from './component/form-group/generic-input-group/generic-input-group.component';
import { GenericInputComponent } from './component/form-group/generic-input/generic-input.component';
import { Select2Component } from './component/form-group/impl/select2-impl/select2-impl.component';
import ReactiveInput from './model/ReactiveInput';
import { NgSelect2Module } from 'ng-select2';
import { DefaultImplComponent } from './component/form-group/impl/default-impl/default-impl.component';
import { CheckboxImplComponent } from './component/form-group/impl/checkbox-impl/checkbox-impl.component';
import { HiddenImplComponent } from './component/form-group/impl/hidden-impl/hidden-impl.component';
import { TextareaImplComponent } from './component/form-group/impl/textarea-impl/textarea-impl.component';
import { ColorImplComponent } from './component/form-group/impl/color-impl/color-impl.component';
import { RangeImplComponent } from './component/form-group/impl/range-impl/range-impl.component';
import { TitleDirective } from './directive/TitleDirective';
import { FileImplComponent } from './component/form-group/impl/file-impl/file-impl.component';

@NgModule({
  declarations: [
    BaseFormComponent,
    GenericInputComponent,
    GenericInputGroupComponent,
    FormInputRowComponent,
    Select2Component,
    ReactiveInput,
    DefaultImplComponent,
    CheckboxImplComponent,
    HiddenImplComponent,
    TextareaImplComponent,
    ColorImplComponent,
    RangeImplComponent,
    TitleDirective,
    FileImplComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelect2Module
  ],
  exports: [
    FileImplComponent,
    RangeImplComponent,
    ColorImplComponent,
    TextareaImplComponent,
    BaseFormComponent,
    GenericInputComponent,
    GenericInputGroupComponent,
    FormInputRowComponent,
    Select2Component,
    DefaultImplComponent,
    CheckboxImplComponent,
    HiddenImplComponent
  ]
})
export class NgxPainlessFormModule { }
