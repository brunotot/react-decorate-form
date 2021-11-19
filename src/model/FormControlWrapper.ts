import { FormControl, ValidatorFn, Validators } from "@angular/forms";
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

const URL_PATTERN = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
const TEL_PATTERN = '^\\+[0-9]{1,3}\\/[0-9]{1,2}\\-.[0-9]{4,10}$';

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
  inputType: InputType,
  label: string,
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
  )[],
  select2Config?: ISelect2Config,
  placeholder?: string,
  multiple?: boolean,
  rows?: number,
  min?: number,
  max?: number
}

export default class FormControlWrapper {
  form: IForm;
  initialControls: IFormControlWrapper = {};
  errorMessagesWrapper: IValidationErrorGroup = {};
  displayConfigs: IDisplayConfig[] = [];

  constructor(form: IForm = {}) {
    this.form = form;
  }

  public withHidden = (formControlName: string) => this.set({label: '', formControlName, inputType: InputType.INPUT_HIDDEN})
  public withSelect = (config: IFormInputSelectConfig) => this.set({...config, inputType: InputType.SELECT})
  public withNumber = (config: IFormInputNumberConfig) => this.set({...config, inputType: InputType.INPUT_NUMBER})
  public withText = (config: IFormInputTextConfig) => this.set({...config, inputType: InputType.INPUT_TEXT})
  public withTextArea = (config: IFormInputTextAreaConfig) => this.set({...config, inputType: InputType.INPUT_TEXTAREA})
  public withDate = (config: IFormInputDateConfig) => this.set({...config, inputType: InputType.INPUT_DATE})
  public withDateTime = (config: IFormInputDateTimeConfig) => this.set({...config, inputType: InputType.INPUT_DATETIME})
  public withCheckbox = (config: IFormInputCheckboxConfig) => this.set({...config, inputType: InputType.INPUT_CHECKBOX})
  public withPassword = (config: IFormInputPasswordConfig) => this.set({...config, inputType: InputType.INPUT_PASSWORD})
  public withColor = (config: IFormInputColorConfig) => this.set({...config, inputType: InputType.INPUT_COLOR})
  public withEmail = (config: IFormInputEmailConfig) => this.set({...config, inputType: InputType.INPUT_EMAIL})
  public withMonth = (config: IFormInputMonthConfig) => this.set({...config, inputType: InputType.INPUT_MONTH})
  public withUrl = (config: IFormInputURLConfig) => this.set({...config, inputType: InputType.INPUT_URL})
  public withPhone = (config: IFormInputPhoneConfig) => this.set({...config, inputType: InputType.INPUT_PHONE})
  public withSearch = (config: IFormInputSearchConfig) => this.set({...config, inputType: InputType.INPUT_SEARCH})
  public withRange = (config: IFormInputRangeConfig) => this.set({...config, inputType: InputType.INPUT_RANGE})
  public withWeek = (config: IFormInputWeekConfig) => this.set({...config, inputType: InputType.INPUT_WEEK})
  public withTime = (config: IFormInputTimeConfig) => this.set({...config, inputType: InputType.INPUT_TIME})
  public withFile = (config: IFormInputFileConfig) => this.set({...config, inputType: InputType.INPUT_FILE})

  public getInitialDisplayValue(inputType: InputType, displayConfig: IDisplayConfig, formControlName: string): any {
    let min: any = displayConfig.min;
    let max: any = displayConfig.max;
    let value: any = this.form[formControlName];
    switch (inputType) {
      case InputType.INPUT_DATE: return getInitialDateValue(value)
      case InputType.INPUT_DATETIME: return getInitialDateTimeValue(value)
      case InputType.INPUT_MONTH: return getInitialMonthValue(value)
      case InputType.INPUT_PHONE: return getInitialPhoneValue(value)
      case InputType.INPUT_RANGE: return getInitialRangeValue(min, max, value)
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
    for (let c of validatorConfigs) {
      if ("validator" in c) {
        validators.push(c.validator);
        this.errorMessagesWrapper[formControlName].push(c)
      } else {
        i++;
        let validatorBuild;
        let key = `${formControlName}${i}`;
        let { message, isValid } = c;
        validatorBuild = ValidatorBuilder.build(key, message, isText(inputType) ? text => isValid(text ? text : '') : isValid)
        validators.push(validatorBuild.validator);
        this.errorMessagesWrapper[formControlName].push(validatorBuild);
      }
    }
    return validators;
  }

  public set(displayConfig: IDisplayConfig) {
    let { inputType, formControlName } = displayConfig;
    let defaultSelect2Config: ISelect2Config = {
      placeholder: displayConfig.placeholder || '',
      width: '100%',
      tags: true,
      id: formControlName,
      allowClear: true
    }
    let select2Config: ISelect2Config = (displayConfig as IFormInputSelectConfig)?.select2Config || defaultSelect2Config;
    select2Config = {
      ...select2Config,
      width: select2Config.width ? select2Config.width : defaultSelect2Config.width,
      allowClear: select2Config.allowClear === undefined ? true : defaultSelect2Config.allowClear,
      tags: select2Config.tags === undefined ? true : defaultSelect2Config.tags
    };
    (displayConfig as IFormInputSelectConfig).select2Config = select2Config;
    let validatorConfigs: IValidatorConfig[] = (displayConfig as any)?.validatorConfigs || [];

    if (inputType === InputType.INPUT_EMAIL && !validatorConfigs.find(cfg => cfg.validator === Validators.email)) {
      validatorConfigs.push({
        message: "Input must be in format of an email (ex: test@mail.com)",
        validator: Validators.email,
        validatorName: "email"
      })
    }
    if (inputType === InputType.INPUT_URL && !validatorConfigs.find(cfg => cfg.validatorName === "pattern")) {
      validatorConfigs.push({
        message: "Input must be in format of a URL (ex: http://www.example.com/index.html)",
        validator: Validators.pattern(URL_PATTERN),
        validatorName: "pattern"
      })
    }
    if (inputType === InputType.INPUT_PHONE && !validatorConfigs.find(cfg => cfg.validatorName === "pattern")) {
      let validatorConfig = ValidatorBuilder.build(formControlName, 'Input must be in format of a telephone number (ex: +123/45-67890)', v => {
        let re = new RegExp(TEL_PATTERN);
        let vAsPhone = v as IPhone;
        let globalNumber = !!vAsPhone ? vAsPhone.globalNumber : '';
        return re.test(globalNumber)
      })
      validatorConfigs.push(validatorConfig)
    }
    let validators: ValidatorFn[] = this.buildValidatorSetupAndGetValidators(inputType, formControlName, validatorConfigs);
    this.form[formControlName] = this.getInitialDisplayValue(inputType, displayConfig, formControlName);
    this.initialControls[formControlName] = new FormControl(this.form[formControlName], validators);
    this.displayConfigs.push(displayConfig);
    return this;
  }

  public toForm() {
    return new Form(this);
  }
}
