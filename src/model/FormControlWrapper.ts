import { FormControl, ValidatorFn, Validators as FormValidators } from "@angular/forms";
import { IForm } from "../form/base/BaseForm";
import { Form } from "../form/Form";
import { InputType } from "./InputType";
import { IFormInputCheckboxConfig, IFormInputColorConfig, IFormInputDateConfig, IFormInputDateTimeConfig, IFormInputEmailConfig, IFormInputFileConfig, IFormInputHiddenConfig, IFormInputMonthConfig, IFormInputNumberConfig, IFormInputPasswordConfig, IFormInputPhoneConfig, IFormInputRangeConfig, IFormInputSearchConfig, IFormInputSelectConfig, IFormInputTextAreaConfig, IFormInputTextConfig, IFormInputTimeConfig, IFormInputURLConfig, IFormInputWeekConfig, ISelect2Config } from "../type/FormInputConfig";
import { IAnyValidatorConfig, ICheckboxValidatorConfig, IColorValidatorConfig, IDateTimeValidatorConfig, IDateValidatorConfig, IFileValidatorConfig, INumberValidatorConfig, IPasswordValidatorConfig, IPhoneValidatorConfig, IRangeValidatorConfig, ISearchValidatorConfig, ISelectValidatorConfig, ITimeValidatorConfig, IURLValidatorConfig, IWeekValidatorConfig } from "../type/ValidatorConfig";
import ValidatorBuilder, { IPhone } from "./ValidatorBuilder";
import { getInitialColorValue } from "../utility/ColorUtils";
import { getInitialPhoneValue } from "../utility/PhoneUtils";
import { getInitialRangeValue } from "../utility/RangeUtils";
import { getInitialFileValue } from "../utility/FileUtils";
import { getInitialDateTimeValue, getInitialDateValue, getInitialMonthValue } from "../utility/DateUtils";
import { getInitialTimeValue } from "../utility/TimeUtils";
import { getInitialNumberValue } from "../utility/NumberUtils";
import { getInitialURLValue } from "../utility/URLUtils";
import { getInitialWeekValue } from "../utility/WeekUtils";
import InputEntity from "./input/base/InputEntity";
import TextEntity from "./input/TextEntity";
import Validators from "./Validators";


function isText(inputType: InputType) {
  return inputType === InputType.INPUT_TEXT
    || inputType === InputType.INPUT_TEXTAREA 
    || inputType === InputType.INPUT_HIDDEN 
    || inputType === InputType.INPUT_PASSWORD 
    || inputType === InputType.INPUT_SEARCH 
    || inputType === InputType.INPUT_EMAIL;
}

export interface IValidationErrorGroup { [formControlName: string]: IValidatorConfig[] }
export interface IFormControlWrapper { [formControlName: string]: FormControl }

export interface IValidatorConfig {
  validator: ValidatorFn, 
  message: string, 
  validatorName: string
}

export interface IDisplayConfig {
  formControlName: string,
  inputEntity?: InputEntity<any, any>,
  inputType: InputType,
  label: string,
  select2Config?: ISelect2Config,
  placeholder?: string,
  multiple?: boolean,
  rows?: number,
  min?: number,
  max?: number,
  validatorConfigs?: (
      ISelectValidatorConfig
    | INumberValidatorConfig 
    | IDateTimeValidatorConfig 
    | IDateValidatorConfig 
    | ICheckboxValidatorConfig 
    | IPasswordValidatorConfig
    | IColorValidatorConfig
    | IURLValidatorConfig
    | IPhoneValidatorConfig
    | ISearchValidatorConfig
    | IRangeValidatorConfig
    | IWeekValidatorConfig
    | ITimeValidatorConfig
    | IFileValidatorConfig
    | IValidatorConfig
  )[]
}

export default class FormControlWrapper {
  form: IForm;
  initialControls: IFormControlWrapper = {};
  errorMessagesWrapper: IValidationErrorGroup = {};
  displayConfigs: IDisplayConfig[] = [];

  constructor(form: IForm = {}) {
    this.form = form;
  }

  public withHidden   = (formControlName: string)          => this.set({label: '', inputType: InputType.INPUT_HIDDEN, formControlName})
  public withSelect   = (config: IFormInputSelectConfig)   => this.set({...config, inputType: InputType.SELECT})
  public withNumber   = (config: IFormInputNumberConfig)   => this.set({...config, inputType: InputType.INPUT_NUMBER})
  public withText     = (config: IFormInputTextConfig)     => this.set({...config, inputType: InputType.INPUT_TEXT})
  public withTextArea = (config: IFormInputTextAreaConfig) => this.set({...config, inputType: InputType.INPUT_TEXTAREA})
  public withDate     = (config: IFormInputDateConfig)     => this.set({...config, inputType: InputType.INPUT_DATE})
  public withDateTime = (config: IFormInputDateTimeConfig) => this.set({...config, inputType: InputType.INPUT_DATETIME})
  public withCheckbox = (config: IFormInputCheckboxConfig) => this.set({...config, inputType: InputType.INPUT_CHECKBOX})
  public withPassword = (config: IFormInputPasswordConfig) => this.set({...config, inputType: InputType.INPUT_PASSWORD})
  public withColor    = (config: IFormInputColorConfig)    => this.set({...config, inputType: InputType.INPUT_COLOR})
  public withEmail    = (config: IFormInputEmailConfig)    => this.set({...config, inputType: InputType.INPUT_EMAIL})
  public withMonth    = (config: IFormInputMonthConfig)    => this.set({...config, inputType: InputType.INPUT_MONTH})
  public withUrl      = (config: IFormInputURLConfig)      => this.set({...config, inputType: InputType.INPUT_URL})
  public withPhone    = (config: IFormInputPhoneConfig)    => this.set({...config, inputType: InputType.INPUT_PHONE})
  public withSearch   = (config: IFormInputSearchConfig)   => this.set({...config, inputType: InputType.INPUT_SEARCH})
  public withRange    = (config: IFormInputRangeConfig)    => this.set({...config, inputType: InputType.INPUT_RANGE})
  public withWeek     = (config: IFormInputWeekConfig)     => this.set({...config, inputType: InputType.INPUT_WEEK})
  public withTime     = (config: IFormInputTimeConfig)     => this.set({...config, inputType: InputType.INPUT_TIME})
  public withFile     = (config: IFormInputFileConfig)     => this.set({...config, inputType: InputType.INPUT_FILE})

  public getInitialDisplayValue(inputType: InputType, displayConfig: IDisplayConfig): any {
    let { formControlName } = displayConfig;
    let value: any = this.form[formControlName];
    switch (inputType) {
      case InputType.INPUT_DATE: return getInitialDateValue(value)
      case InputType.INPUT_DATETIME: return getInitialDateTimeValue(value)
      case InputType.INPUT_MONTH: return getInitialMonthValue(value)
      case InputType.INPUT_PHONE: return getInitialPhoneValue(value)
      case InputType.INPUT_RANGE: return getInitialRangeValue(displayConfig.min!, displayConfig.max!, value)
      case InputType.INPUT_TIME: return getInitialTimeValue(value)
      case InputType.INPUT_COLOR: return getInitialColorValue(value)
      case InputType.INPUT_FILE: return getInitialFileValue(!!displayConfig.multiple)
      case InputType.INPUT_NUMBER: return getInitialNumberValue(value)
      case InputType.INPUT_URL: return getInitialURLValue(value)
      case InputType.INPUT_CHECKBOX: return !!value
      case InputType.INPUT_WEEK: return getInitialWeekValue(value)
      default: return !!value ? value : ''
    }
  } 

  public buildValidatorSetupAndGetValidators(inputType: InputType, formControlName: string, validatorConfigs: (IValidatorConfig | IAnyValidatorConfig)[]): ValidatorFn[] {
    let i = 0;
    let validators: ValidatorFn[] = [];
    this.errorMessagesWrapper[formControlName] = [];
    for (let validatorConfig of validatorConfigs) {
      if ("validator" in validatorConfig) {
        let { validator } = validatorConfig;
        validators.push(validator);
        this.errorMessagesWrapper[formControlName].push(validatorConfig)
      } else {
        let key = `${formControlName}${i++}`;
        let { message, isValid } = validatorConfig;
        let validatorBuild = ValidatorBuilder.build(key, message, isText(inputType) ? text => isValid(typeof text === 'string' ? text : '') : isValid);
        validators.push(validatorBuild.validator);
        this.errorMessagesWrapper[formControlName].push(validatorBuild);
      }
    }
    return validators;
  }

  public getNormalizedSelect2Config(displayConfig: IDisplayConfig): ISelect2Config {
    let defaultSelect2Config: ISelect2Config = {
      placeholder: displayConfig.placeholder || 'Choose',
      width: '100%',
      tags: true,
      id: displayConfig.formControlName,
      allowClear: true
    }
    let select2Config: ISelect2Config = (displayConfig as IFormInputSelectConfig)?.select2Config || defaultSelect2Config;
    select2Config = {
      ...select2Config,
      width: select2Config.width ? select2Config.width : defaultSelect2Config.width,
      allowClear: select2Config.allowClear === undefined ? true : defaultSelect2Config.allowClear,
      tags: select2Config.tags === undefined ? true : defaultSelect2Config.tags
    };
    return select2Config;
  }

  public set(displayConfig: IDisplayConfig) {
    let { inputType, formControlName } = displayConfig;
    
    let validatorConfigs: IValidatorConfig[] = (displayConfig as any)?.validatorConfigs || [];
    if (inputType === InputType.SELECT) {
      displayConfig.select2Config = this.getNormalizedSelect2Config(displayConfig);
    } else if (inputType === InputType.INPUT_EMAIL && !validatorConfigs.find(cfg => cfg.validator === FormValidators.email)) {
      validatorConfigs.push(Validators.email())
    } else if (inputType === InputType.INPUT_URL && !validatorConfigs.find(cfg => cfg.validatorName === "pattern")) {
      validatorConfigs.push(Validators.url())
    } else if (inputType === InputType.INPUT_PHONE && !validatorConfigs.find(cfg => cfg.validatorName === "pattern")) {
      validatorConfigs.push(Validators.phone(formControlName))
    }

    let validators: ValidatorFn[] = this.buildValidatorSetupAndGetValidators(inputType, formControlName, validatorConfigs);
    this.form[formControlName] = this.getInitialDisplayValue(inputType, displayConfig);
    this.initialControls[formControlName] = new FormControl(this.form[formControlName], validators);
    this.displayConfigs.push(displayConfig);

    return this;
  }

  public toForm() {
    return new Form(this);
  }
}
