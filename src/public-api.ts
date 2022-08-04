import { NgxInputAnnotationsModule } from "./lib/ngx-input-annotations.module";

import { InputTextComponent } from "./lib/component/input/input-text/input-text.component";
import { InputTextAreaComponent } from "./lib/component/input/input-text-area/input-text-area.component";
import { InputPasswordComponent } from "./lib/component/input/input-password/input-password.component";
import { InputNumberComponent } from "./lib/component/input/input-number/input-number.component";
import { InputEmailComponent } from "./lib/component/input/input-email/input-email.component";
import { InputDateComponent } from "./lib/component/input/input-date/input-date.component";
import { InputChipsComponent } from "./lib/component/input/input-chips/input-chips.component";
import { InputSelectComponent } from "./lib/component/input/input-select/input-select.component";
import { InputCheckboxComponent } from "./lib/component/input/input-checkbox/input-checkbox.component";
import { InputColorComponent } from "./lib/component/input/input-color/input-color.component";
import { InputTelComponent } from "./lib/component/input/input-tel/input-tel.component";
import { InputUrlComponent } from "./lib/component/input/input-url/input-url.component";
import { InputSearchComponent } from "./lib/component/input/input-search/input-search.component";

import { DialogUpdateComponent } from "./lib/component/dialog/DialogUpdateComponent";
import { DialogReadComponent } from "./lib/component/dialog/DialogReadComponent";
import { DialogCreateComponent } from "./lib/component/dialog/DialogCreateComponent";
import { DialogDeleteComponent } from "./lib/component/dialog/DialogDeleteComponent";

import { DatatableComponent } from "./lib/component/datatable/DatatableComponent";
import {
  buildValidatorFn,
  uuidv4,
} from "./lib/decorator/validator/BaseValidatorDecorator";
import { InputType } from "./lib/types/input-types";
import { ButtonComponent } from "./lib/component/button/ButtonComponent";
import { FormComponent } from "./lib/component/form/FormComponent";

import { FilterContainerComponent } from "./lib/component/filter/container/FilterContainerComponent";
import { FilterContentComponent } from "./lib/component/filter/utils/FilterContentComponent";
import { FilterCheckboxComponent } from "./lib/component/filter/impl/FilterCheckboxComponent";
import { FilterDataCountComponent } from "./lib/component/filter/utils/FilterDataCountComponent";
import { FilterDefaultComponent } from "./lib/component/filter/impl/FilterDefaultComponent";
import { FilterSelectComponent } from "./lib/component/filter/impl/FilterSelectComponent";
import { FilterDateComponent } from "./lib/component/filter/impl/FilterDateComponent";
import { FilterChipsComponent } from "./lib/component/filter/impl/FilterChipsComponent";
import { FilterColorComponent } from "./lib/component/filter/impl/FilterColorComponent";

import { DisplayBaseComponent } from "./lib/component/display/display-base/display-base.component";
import { DisplayChipsComponent } from "./lib/component/display/ia-display-chips/ia-display-chips.component";
import { DisplayColorComponent } from "./lib/component/display/ia-display-color/ia-display-color.component";
import { DisplayPlainComponent } from "./lib/component/display/ia-display-plain/ia-display-plain.component";
import { DisplayEmailComponent } from "./lib/component/display/ia-display-email/ia-display-email.component";
import { DisplayDateComponent } from "./lib/component/display/ia-display-date/ia-display-date.component";
import { DisplayCheckboxComponent } from "./lib/component/display/ia-display-checkbox/ia-display-checkbox.component";
import { DisplaySelectComponent } from "./lib/component/display/ia-display-select/ia-display-select.component";
import { DisplayUrlComponent } from "./lib/component/display/ia-display-url/ia-display-url.component";
import { DisplayDataComponent } from "./lib/component/display/display-data/display-data.component";
import { DisplayHiddenComponent } from "./lib/component/display/ia-display-hidden/ia-display-hidden.component";

import { normalizeArray, populateObject } from "./lib/utils/object-utils";
import { ErrorsComponent } from "./lib/component/validation/errors/ErrorsComponent";
import {
  InputBaseComponent,
  InputMultilanguageComponent,
} from "./lib/component/input/input-base/input-base.component";

import DisplayContentBaseComponent from "./lib/component/display/DisplayContentBaseComponent";
import InputConfigComponent from "./lib/component/input/InputConfigComponent";
import FormInput, {
  generateMetadata,
  IInputSearchMetadata,
} from "./lib/decorator/input/FormInputDecorator";
import Email from "./lib/decorator/validator/impl/EmailValidatorDecorator";
import MinLength from "./lib/decorator/validator/impl/MinLengthValidatorDecorator";
import Required from "./lib/decorator/validator/impl/RequiredValidatorDecorator";
import Validator from "./lib/decorator/validator/impl/ValidatorDecorator";
import MaxLength from "./lib/decorator/validator/impl/MaxLengthValidatorDecorator";
import Pattern from "./lib/decorator/validator/impl/PatternValidatorDecorator";
import Length from "./lib/decorator/validator/impl/LengthValidatorDecorator";

import {
  IMultilanguage,
  ICheckbox,
  IChips,
  IColor,
  IDate,
  IEmail,
  INumber,
  IPassword,
  ISearch,
  IText,
  ISelect,
  ITel,
  ITextArea,
  IURL,
} from "./lib/decorator/input/FormInputDecorator";

import {
  DatabaseService,
  DatatableResponse,
} from "./lib/service/DatabaseService";

import EntityName from "./lib/decorator/input/EntityNameDecorator";
import { InputAppearanceType } from "./lib/decorator/input/FormInputDecorator";
import { SelectOption } from "./lib/types/select-types";
import EntityId from "./lib/decorator/input/EntityIdDecorator";

/* Main components */
export { NgxInputAnnotationsModule };
export { FormComponent };
export { DatatableComponent };

/* Filter components */
export { FilterColorComponent };
export { FilterChipsComponent };
export { FilterDateComponent };
export { FilterSelectComponent };
export { FilterDefaultComponent };
export { FilterDataCountComponent };
export { FilterCheckboxComponent };
export { FilterContentComponent };
export { FilterContainerComponent };

/* Display components */
export { DisplayHiddenComponent };
export { DisplayDataComponent };
export { DisplayColorComponent };
export { DisplayChipsComponent };
export { DisplayUrlComponent };
export { DisplaySelectComponent };
export { DisplayCheckboxComponent };
export { DisplayDateComponent };
export { DisplayEmailComponent };
export { DisplayPlainComponent };
export { DisplayContentBaseComponent };
export { DisplayBaseComponent };

/* Input components */
export { InputTextComponent };
export { InputTextAreaComponent };
export { InputBaseComponent };
export { InputPasswordComponent };
export { InputNumberComponent };
export { InputEmailComponent };
export { InputDateComponent };
export { InputChipsComponent };
export { InputSelectComponent };
export { InputCheckboxComponent };
export { InputConfigComponent };
export { InputMultilanguageComponent };
export { InputUrlComponent };
export { InputTelComponent };
export { InputColorComponent };
export { InputSearchComponent };
export { InputType };

/* Dialog components */
export { DialogReadComponent };
export { DialogUpdateComponent };
export { DialogCreateComponent };
export { DialogDeleteComponent };

/* Utility components */
export { ErrorsComponent };
export { ButtonComponent };

/* Input variable types */
export { ICheckbox };
export { IChips };
export { IColor };
export { IDate };
export { IEmail };
export { INumber };
export { IPassword };
export { ISearch };
export { IText };
export { ISelect };
export { ITel };
export { ITextArea };
export { IURL };
export { IMultilanguage };

/* Functions */
export { Length };
export { Pattern };
export { populateObject };
export { MaxLength };
export { buildValidatorFn };
export { FormInput };
export { Email };
export { MinLength };
export { Required };
export { Validator };
export { EntityId };
export { EntityName };

/* Service */
export { DatabaseService };
export { DatatableResponse };

export { uuidv4 };
export { IInputSearchMetadata };
export { InputAppearanceType };
export { SelectOption };

export { generateMetadata };
export { normalizeArray };

export * from "./lib/types/datatable-types";
