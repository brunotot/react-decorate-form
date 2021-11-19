import { Select2OptionData } from "ng-select2";
import { Options } from "select2";
import { IValidatorConfig } from "../model/FormControlWrapper";
import { ICheckboxValidatorConfig, IColorValidatorConfig, IDateTimeValidatorConfig, IDateValidatorConfig, IEmailValidatorConfig, IFileValidatorConfig, IMonthValidatorConfig, INumberValidatorConfig, IPasswordValidatorConfig, IPhoneValidatorConfig, IRangeValidatorConfig, ISearchValidatorConfig, ISelectValidatorConfig, ITextAreaValidatorConfig, ITextValidatorConfig, ITimeValidatorConfig, IURLValidatorConfig, IWeekValidatorConfig } from "./ValidatorConfig";

export interface IFormInputHiddenConfig {
  formControlName: string,
  label: string
}

export interface ISelect2Config extends Options {
  placeholder?: string,
  id?: string,
  value?: string,
  width?: string,
  disabled?: boolean,
  data?: Select2OptionData[],
  dropdownParent?: any,
  allowClear?: boolean
}

export interface IFormInputSelectConfig {
  formControlName: string,
  placeholder?: string,
  label: string,
  select2Config?: ISelect2Config,
  validatorConfigs?: (ISelectValidatorConfig | IValidatorConfig)[]
}

export interface IFormInputDateConfig {
  label: string,
  placeholder?: string,
  formControlName: string, 
  validatorConfigs?: (IDateValidatorConfig | IValidatorConfig)[]
}

export interface IFormInputDateTimeConfig {
  label: string,
  placeholder?: string,
  formControlName: string, 
  validatorConfigs?: (IDateTimeValidatorConfig | IValidatorConfig)[]
}

export interface IFormInputMonthConfig {
  label: string,
  placeholder?: string,
  formControlName: string, 
  validatorConfigs?: (IMonthValidatorConfig | IValidatorConfig)[]
}

export interface IFormInputTextAreaConfig {
  placeholder?: string,
  label: string,
  formControlName: string, 
  validatorConfigs?: (ITextAreaValidatorConfig | IValidatorConfig)[]
}

export interface IFormInputTextConfig {
  placeholder?: string,
  label: string,
  formControlName: string, 
  validatorConfigs?: (ITextValidatorConfig | IValidatorConfig)[]
}

export interface IFormInputCheckboxConfig {
  label: string,
  formControlName: string, 
  validatorConfigs?: (ICheckboxValidatorConfig | IValidatorConfig)[]
}

export interface IFormInputNumberConfig {
  placeholder?: string,
  label: string,
  formControlName: string, 
  validatorConfigs?: (INumberValidatorConfig | IValidatorConfig)[]
}

export interface IFormInputPasswordConfig {
  placeholder?: string,
  label: string,
  formControlName: string, 
  validatorConfigs?: (IPasswordValidatorConfig | IValidatorConfig)[]
}

export interface IFormInputURLConfig {
  placeholder?: string,
  label: string,
  formControlName: string, 
  validatorConfigs?: (IURLValidatorConfig | IValidatorConfig)[]
}

export interface IFormInputPhoneConfig {
  placeholder?: string,
  label: string,
  formControlName: string, 
  validatorConfigs?: (IPhoneValidatorConfig | IValidatorConfig)[]
}

export interface IFormInputSearchConfig {
  placeholder?: string,
  label: string,
  formControlName: string, 
  validatorConfigs?: (ISearchValidatorConfig | IValidatorConfig)[]
}

export interface IFormInputTimeConfig {
  placeholder?: string,
  label: string,
  formControlName: string, 
  validatorConfigs?: (ITimeValidatorConfig | IValidatorConfig)[]
}

export interface IFormInputWeekConfig {
  placeholder?: string,
  label: string,
  formControlName: string, 
  validatorConfigs?: (IWeekValidatorConfig | IValidatorConfig)[]
}

export interface IFormInputFileConfig {
  placeholder?: string,
  label: string,
  formControlName: string, 
  multiple?: boolean,
  validatorConfigs?: (IFileValidatorConfig | IValidatorConfig)[]
}

export interface IFormInputEmailConfig {
  placeholder?: string,
  label: string,
  formControlName: string, 
  validatorConfigs?: (IEmailValidatorConfig | IValidatorConfig)[]
}

export interface IFormInputRangeConfig {
  label: string,
  formControlName: string, 
  min: number,
  max: number,
  validatorConfigs?: (IRangeValidatorConfig | IValidatorConfig)[]
}

export interface IFormInputColorConfig {
  label: string,
  formControlName: string, 
  validatorConfigs?: (IColorValidatorConfig | IValidatorConfig)[]
}