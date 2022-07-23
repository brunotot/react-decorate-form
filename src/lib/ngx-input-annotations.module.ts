import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import {
  FormControl,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
} from "@angular/forms";

import { ErrorStateMatcher, MatNativeDateModule } from "@angular/material/core";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSliderModule } from "@angular/material/slider";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatSelectModule } from "@angular/material/select";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { FormComponent } from "./component/form/FormComponent";
import { DatatableComponent } from "./component/datatable/DatatableComponent";
import { ButtonComponent } from "./component/button/ButtonComponent";
import { ErrorsComponent } from "./component/validation/errors/ErrorsComponent";

import { InputTextComponent } from "./component/input/input-text/input-text.component";
import { InputTextAreaComponent } from "./component/input/input-text-area/input-text-area.component";
import { InputPasswordComponent } from "./component/input/input-password/input-password.component";
import { InputNumberComponent } from "./component/input/input-number/input-number.component";
import { InputEmailComponent } from "./component/input/input-email/input-email.component";
import { InputDateComponent } from "./component/input/input-date/input-date.component";
import { InputChipsComponent } from "./component/input/input-chips/input-chips.component";
import { InputSelectComponent } from "./component/input/input-select/input-select.component";
import { InputCheckboxComponent } from "./component/input/input-checkbox/input-checkbox.component";
import { InputSearchComponent } from "./component/input/input-search/input-search.component";
import { InputColorComponent } from "./component/input/input-color/input-color.component";
import { InputTelComponent } from "./component/input/input-tel/input-tel.component";
import { InputUrlComponent } from "./component/input/input-url/input-url.component";
import {
  InputBaseComponent,
  InputMultilanguageComponent,
} from "./component/input/input-base/input-base.component";

import InputConfigComponent, {
  shouldDisplayErrors,
} from "./component/input/InputConfigComponent";

import { DisplayPlainComponent } from "./component/display/ia-display-plain/ia-display-plain.component";
import { DisplayEmailComponent } from "./component/display/ia-display-email/ia-display-email.component";
import { DisplayDateComponent } from "./component/display/ia-display-date/ia-display-date.component";
import { DisplayCheckboxComponent } from "./component/display/ia-display-checkbox/ia-display-checkbox.component";
import { DisplaySelectComponent } from "./component/display/ia-display-select/ia-display-select.component";
import { DisplayUrlComponent } from "./component/display/ia-display-url/ia-display-url.component";
import { DisplayDataComponent } from "./component/display/display-data/display-data.component";
import { DisplayHiddenComponent } from "./component/display/ia-display-hidden/ia-display-hidden.component";
import { DisplayChipsComponent } from "./component/display/ia-display-chips/ia-display-chips.component";
import { DisplayColorComponent } from "./component/display/ia-display-color/ia-display-color.component";
import { DisplayBaseComponent } from "./component/display/display-base/display-base.component";
import DisplayContentBaseComponent from "./component/display/DisplayContentBaseComponent";

import { FilterContainerComponent } from "./component/filter/container/FilterContainerComponent";
import { FilterContentComponent } from "./component/filter/utils/FilterContentComponent";
import { FilterDataCountComponent } from "./component/filter/utils/FilterDataCountComponent";
import { FilterCheckboxComponent } from "./component/filter/impl/FilterCheckboxComponent";
import { FilterDefaultComponent } from "./component/filter/impl/FilterDefaultComponent";
import { FilterDateComponent } from "./component/filter/impl/FilterDateComponent";
import { FilterSelectComponent } from "./component/filter/impl/FilterSelectComponent";
import { FilterChipsComponent } from "./component/filter/impl/FilterChipsComponent";
import { FilterColorComponent } from "./component/filter/impl/FilterColorComponent";

import { DialogUpdateComponent } from "./component/dialog/DialogUpdateComponent";
import { DialogReadComponent } from "./component/dialog/DialogReadComponent";
import { DialogCreateComponent } from "./component/dialog/DialogCreateComponent";
import { DialogDeleteComponent } from "./component/dialog/DialogDeleteComponent";

class ErrorStateMatcherImpl implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return shouldDisplayErrors(control, form);
  }
}

@NgModule({
  declarations: [
    FormComponent,
    DatatableComponent,
    ButtonComponent,
    ErrorsComponent,
    InputTextComponent,
    InputTextAreaComponent,
    InputBaseComponent,
    InputConfigComponent,
    InputPasswordComponent,
    InputNumberComponent,
    InputEmailComponent,
    InputDateComponent,
    InputChipsComponent,
    InputCheckboxComponent,
    InputSelectComponent,
    InputSearchComponent,
    InputMultilanguageComponent,
    InputColorComponent,
    InputTelComponent,
    InputUrlComponent,
    DisplayContentBaseComponent,
    DisplayPlainComponent,
    DisplayEmailComponent,
    DisplayDateComponent,
    DisplayCheckboxComponent,
    DisplaySelectComponent,
    DisplayUrlComponent,
    DisplayDataComponent,
    DisplayHiddenComponent,
    DisplayBaseComponent,
    DisplayChipsComponent,
    DisplayColorComponent,
    FilterContainerComponent,
    FilterContentComponent,
    FilterCheckboxComponent,
    FilterDataCountComponent,
    FilterDefaultComponent,
    FilterSelectComponent,
    FilterDateComponent,
    FilterChipsComponent,
    FilterColorComponent,
    DialogReadComponent,
    DialogUpdateComponent,
    DialogCreateComponent,
    DialogDeleteComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatCheckboxModule,
    MatChipsModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatTabsModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDividerModule,
    MatExpansionModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
  ],
  providers: [{ provide: ErrorStateMatcher, useClass: ErrorStateMatcherImpl }],
  exports: [
    FormComponent,
    DatatableComponent,
    ButtonComponent,
    ErrorsComponent,
    InputTextComponent,
    InputTextAreaComponent,
    InputBaseComponent,
    InputConfigComponent,
    InputPasswordComponent,
    InputNumberComponent,
    InputEmailComponent,
    InputDateComponent,
    InputChipsComponent,
    InputCheckboxComponent,
    InputSelectComponent,
    InputSearchComponent,
    InputMultilanguageComponent,
    InputColorComponent,
    InputTelComponent,
    InputUrlComponent,
    DisplayContentBaseComponent,
    DisplayPlainComponent,
    DisplayEmailComponent,
    DisplayDateComponent,
    DisplayCheckboxComponent,
    DisplaySelectComponent,
    DisplayUrlComponent,
    DisplayDataComponent,
    DisplayHiddenComponent,
    DisplayBaseComponent,
    DisplayChipsComponent,
    DisplayColorComponent,
    FilterContainerComponent,
    FilterContentComponent,
    FilterCheckboxComponent,
    FilterDataCountComponent,
    FilterDefaultComponent,
    FilterSelectComponent,
    FilterDateComponent,
    FilterChipsComponent,
    FilterColorComponent,
    DialogReadComponent,
    DialogUpdateComponent,
    DialogCreateComponent,
    DialogDeleteComponent,
  ],
})
export class NgxInputAnnotationsModule {}
