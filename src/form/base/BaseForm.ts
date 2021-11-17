import FormControlWrapper from "../../model/FormControlWrapper";
import { InputType } from "../../model/InputType";
import { ISelect2MultipleId, ISelect2SingleId } from "../../model/Select2";


export interface ITimeDisplay {
  hh?: number,
  mm?: number
}

export interface IWeekConfig {
  year?: number,
  week?: number
}

export interface IForm {
  [key: string]: Date | number | string | boolean | ISelect2SingleId | ISelect2MultipleId | IWeekConfig | ITimeDisplay
}

export interface IBaseForm {
  formControlWrapper: FormControlWrapper;
  getValidationFailedMessage(varName: string, errorKey: string): string;
}

export interface IConfig {
  variable: string,
  inputType: InputType,
  placeholder: string,
  label: string,
}