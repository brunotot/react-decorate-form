import { FormControl, ValidatorFn } from "@angular/forms";
import { IForm } from "../form/base/BaseForm";
import { Form } from "../form/Form";
import { InputType } from "./InputType";
import { Select2OptionData } from 'ng-select2';
import { Options } from "select2";

export interface IValidationErrorGroup { [formControlName: string]: IValidatorConfig[] }
export interface IFormControlWrapper { [formControlName: string]: FormControl }

export interface IFormInputHiddenConfig {
  inputType: InputType.INPUT_HIDDEN,
  formControlName: string
}

export interface IFormInputHiddenConfigImpl {
  formControlName: string
}

export interface IFormInputDateConfigImpl {
  label: string,
  placeholder: string,
  formControlName: string, 
  validatorConfigs?: IValidatorConfig[],
}

export interface IFormInputDateConfig {
  inputType: InputType.INPUT_DATE | InputType.INPUT_DATETIME
  label: string,
  placeholder: string,
  formControlName: string, 
  validatorConfigs?: IValidatorConfig[],
}

export interface IFormInputGeneralConfig {
  inputType: InputType.INPUT_TEXTAREA | InputType.INPUT_TEXT | InputType.INPUT_CHECKBOX | InputType.INPUT_NUMBER | InputType.INPUT_PASSWORD,
  placeholder: string,
  label: string,
  formControlName: string, 
  validatorConfigs?: IValidatorConfig[]
}

export interface IFormInputGeneralConfigImpl {
  placeholder: string,
  label: string,
  formControlName: string, 
  validatorConfigs?: IValidatorConfig[]
}

export interface ISelect2Config {
  value?: string,
  dropdownParent?: string,
  width?: string,
  disabled?: boolean,
  allowClear?: boolean,
  options: Options
}

export interface IValidatorConfig {
  validator: ValidatorFn, 
  message: string, 
  validatorName: string 
}

export interface IFormInputSelectConfig {
  inputType: InputType.SELECT,
  placeholder: string,
  label: string,
  formControlName: string,
  validatorConfigs?: IValidatorConfig[],
  select2Data: Select2OptionData[],
  select2Config?: ISelect2Config
}

export interface IFormInputSelectConfigImpl {
  placeholder: string,
  label: string,
  formControlName: string,
  validatorConfigs?: IValidatorConfig[],
  select2Data: Select2OptionData[],
  select2Config?: ISelect2Config
}

export interface IDisplayConfig {
  inputType: InputType,
  placeholder: string,
  label: string,
  formControlName: string,
  validatorConfigs?: IValidatorConfig[],
  select2Data: Select2OptionData[],
  select2Config?: ISelect2Config
}

export default class FormControlWrapper {
  form: IForm;
  initialControls: IFormControlWrapper = {};
  errorMessagesWrapper: IValidationErrorGroup = {};
  displayConfigs: IDisplayConfig[] = [];

  constructor(form: IForm = {}) {
    this.form = form;
  }

  public withHidden(formControlName: string) { let inputType = InputType.INPUT_HIDDEN; return this._set({inputType, formControlName} as any, inputType) }
  public withSelect(config: IFormInputSelectConfigImpl) { return this._set(config as any, InputType.SELECT) }
  public withNumber(config: IFormInputGeneralConfigImpl) { return this._set(config as any, InputType.INPUT_NUMBER) }
  public withText(config: IFormInputGeneralConfigImpl) { return this._set(config as any, InputType.INPUT_TEXT) }
  public withTextarea(config: IFormInputGeneralConfigImpl) { return this._set(config as any, InputType.INPUT_TEXTAREA) }
  public withDate(config: IFormInputDateConfigImpl) { return this._set(config as any, InputType.INPUT_DATE) }
  public withDateTime(config: IFormInputDateConfigImpl) { return this._set(config as any, InputType.INPUT_DATETIME) }
  public withCheckbox(config: IFormInputGeneralConfigImpl) { return this._set(config as any, InputType.INPUT_CHECKBOX) }
  public withPassword(config: IFormInputGeneralConfigImpl) { return this._set(config as any, InputType.INPUT_PASSWORD) }

  private _getFormattedDisplayValue(value: any, inputType: InputType): any {
    if (inputType === InputType.INPUT_DATETIME) {
      value = (value as Date)?.toISOString().slice(0, 16);
    } else if (inputType === InputType.INPUT_DATE) {
      return (value as Date)?.toISOString().slice(0, 10);
    }
    return value;
  } 

  private _set(
    displayConfig: IDisplayConfig,
    inputType: InputType) {
      displayConfig.inputType = inputType;
    let { formControlName } = displayConfig;
    let defaultSelect2Options = {
      tags: true,
      id: formControlName
    } as any;
    let defaultSelect2Width = '100%';
    let select2Config: ISelect2Config = (displayConfig as IFormInputSelectConfig)?.select2Config || {
      width: defaultSelect2Width,
      options: defaultSelect2Options,
      allowClear: true
    };
    select2Config = {
      ...select2Config,
      options: {...defaultSelect2Options, ...select2Config.options},
      width: defaultSelect2Width,
      allowClear: select2Config.allowClear === undefined ? true : select2Config.allowClear
    };
    (displayConfig as IFormInputSelectConfig).select2Config = select2Config;
    let validatorConfigs: IValidatorConfig[] = (displayConfig as any)?.validatorConfigs || [];
    let validators = validatorConfigs.map(c => c.validator);
    let displayValue = this._getFormattedDisplayValue(this.form[formControlName], inputType);
    this.initialControls[formControlName] = new FormControl(displayValue, validators);
    this.displayConfigs.push(displayConfig);
    this.errorMessagesWrapper[formControlName] = validatorConfigs;
    return this;
  }

  public toForm() {
    return new Form(this);
  }
}
