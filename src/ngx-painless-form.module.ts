import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BaseFormComponent } from './component/form-group/base-form/base-form.component';
import { FormInputRowComponent } from './component/form-group/form-input-row/form-input-row.component';
import { GenericInputGroupComponent } from './component/form-group/generic-input-group/generic-input-group.component';
import { GenericInputComponent } from './component/form-group/generic-input/generic-input.component';
import { Select2Component } from './component/form-group/impl/select2-impl/select2-impl.component';
import ReactiveInput from './model/ReactiveInput';
import { DefaultImplComponent } from './component/form-group/impl/default-impl/default-impl.component';
import { CheckboxImplComponent } from './component/form-group/impl/checkbox-impl/checkbox-impl.component';
import { HiddenImplComponent } from './component/form-group/impl/hidden-impl/hidden-impl.component';
import { TextareaImplComponent } from './component/form-group/impl/textarea-impl/textarea-impl.component';
import { ColorImplComponent } from './component/form-group/impl/color-impl/color-impl.component';
import { RangeImplComponent } from './component/form-group/impl/range-impl/range-impl.component';
import { FileImplComponent } from './component/form-group/impl/file-impl/file-impl.component';
import { PhoneImplComponent } from './component/form-group/impl/phone-impl/phone-impl.component';
import { TextOrTypeImplComponent } from './component/form-group/impl/text-or-type-impl/text-or-type-impl.component';
import { PasswordImplComponent } from './component/form-group/impl/password-impl/password-impl.component';
import { SearchImplComponent } from './component/form-group/impl/search-impl/search-impl.component';
import { EmailImplComponent } from './component/form-group/impl/email-impl/email-impl.component';
import { UrlImplComponent } from './component/form-group/impl/url-impl/url-impl.component';
import { NoBrowserSupportComponent } from './component/form-group/no-browser-support/no-browser-support.component';
import { SelectFilterPipe } from './pipe/SelectFilterPipe';
import { BaseDatatableComponent } from './component/datatable/base-datatable/base-datatable.component';
import { SafeHtmlPipe } from './pipe/SafeHtmlPipe';
import { DtEntryDetailsComponent } from './component/datatable/dt-entry-details.ts/dt-entry-details.component';
import { ModalComponent } from './component/dialog/modal/modal.component';
import { LoaderComponent } from './component/dialog/loader/loader.component';
import { ToastService } from './service/toast.service';

@NgModule({
  declarations: [
    BaseFormComponent,
    PhoneImplComponent,
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
    FileImplComponent,
    TextOrTypeImplComponent,
    PasswordImplComponent,
    SearchImplComponent,
    EmailImplComponent,
    UrlImplComponent,
    NoBrowserSupportComponent,
    SelectFilterPipe,
    SafeHtmlPipe,
    BaseDatatableComponent,
    DtEntryDetailsComponent,
    ModalComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    LoaderComponent,
    ModalComponent,
    BaseDatatableComponent,
    NoBrowserSupportComponent,
    UrlImplComponent,
    TextOrTypeImplComponent,
    PhoneImplComponent,
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
    HiddenImplComponent,
    PasswordImplComponent,
    SearchImplComponent,
    EmailImplComponent,
    DtEntryDetailsComponent
  ],
  providers: [
    ToastService
  ]
})
export class NgxPainlessFormModule { }
