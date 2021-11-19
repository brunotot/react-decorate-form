import FormControlWrapper from "../../model/FormControlWrapper";
import { InputType } from "../../model/InputType";
import { IColor, IPhone, ITime, IWeek } from "../../model/ValidatorBuilder";


export interface IForm {
  [key: string]: 
      Date 
    | number 
    | string 
    | boolean 
    | string[]
    | IWeek 
    | ITime
    | IColor
    | IPhone
    | null
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