import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BaseFormComponent } from './component/form/base-form/base-form.component';
import { BaseFormInputRowComponent } from './component/form/base-form-input-row/base-form-input-row.component';
import { GenericInputGroupComponent } from './component/form/generic-input-group/generic-input-group.component';
import { GenericInputComponent } from './component/form/generic-input/generic-input.component';
import { NoBrowserSupportComponent } from './component/form/generic-input-browser-support/no-browser-support.component';
import { LoaderComponent } from './component/loader/loader.component';
import { ToastService } from './service/toast.service';
import { PhoneComponent } from './component/form/impl/phone/phone.component';
import { SelectComponent } from './component/form/impl/select/select.component';
import { CheckboxComponent } from './component/form/impl/checkbox/checkbox.component';
import { HiddenComponent } from './component/form/impl/hidden/hidden.component';
import { TextareaComponent } from './component/form/impl/textarea/textarea.component';
import { ColorComponent } from './component/form/impl/color/color.component';
import { RangeComponent } from './component/form/impl/range/range.component';
import { FileComponent } from './component/form/impl/file/file.component';
import { PasswordComponent } from './component/form/impl/password/password.component';
import { SearchComponent } from './component/form/impl/search/search.component';
import { EmailComponent } from './component/form/impl/email/email.component';
import { UrlComponent } from './component/form/impl/url/url.component';
import ReactiveInput from './model/ReactiveInput';
import { GenericModalComponent } from './component/modal/generic-modal/generic-modal.component';
import { DatatableComponent } from './component/datatable/datatable.component';
import { DatatableReadEntryModalComponent } from './component/modal/datatable-read-entry-modal/datatable-read-entry-modal.component';
import { GenericInputPlaceholderComponent } from './component/form/generic-input-placeholder/generic-input-placeholder.component';
import { TextComponent } from './component/form/impl/text/text.component';
import { NumberComponent } from './component/form/impl/number/number.component';
import { TimeComponent } from './component/form/impl/time/time.component';
import { DateTimeComponent } from './component/form/impl/datetime/datetime.component';
import { DateComponent } from './component/form/impl/date/date.component';
import { MonthComponent } from './component/form/impl/month/month.component';
import { WeekComponent } from './component/form/impl/week/week.component';

@NgModule({
  declarations: [
    BaseFormComponent,
    PhoneComponent,
    GenericInputComponent,
    GenericInputGroupComponent,
    BaseFormInputRowComponent,
    SelectComponent,
    ReactiveInput,
    CheckboxComponent,
    HiddenComponent,
    TextareaComponent,
    ColorComponent,
    RangeComponent,
    FileComponent,
    GenericInputPlaceholderComponent,
    PasswordComponent,
    SearchComponent,
    EmailComponent,
    UrlComponent,
    NoBrowserSupportComponent,
    DatatableComponent,
    DatatableReadEntryModalComponent,
    GenericModalComponent,
    LoaderComponent,
    TimeComponent,
    TextComponent,
    NumberComponent,
    DateComponent,
    DateTimeComponent,
    MonthComponent,
    WeekComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    DateTimeComponent,
    DateComponent,
    LoaderComponent,
    TimeComponent,
    NumberComponent,
    GenericModalComponent,
    DatatableComponent,
    NoBrowserSupportComponent,
    UrlComponent,
    GenericInputPlaceholderComponent,
    PhoneComponent,
    FileComponent,
    RangeComponent,
    ColorComponent,
    TextareaComponent,
    BaseFormComponent,
    GenericInputComponent,
    GenericInputGroupComponent,
    BaseFormInputRowComponent,
    SelectComponent,
    CheckboxComponent,
    HiddenComponent,
    PasswordComponent,
    SearchComponent,
    EmailComponent,
    TextComponent,
    DatatableReadEntryModalComponent,
    MonthComponent,
    WeekComponent
  ],
  providers: [
    ToastService
  ]
})
export class NgxPainlessFormModule { }
