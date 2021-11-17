import { FormControl, ValidatorFn, Validators } from "@angular/forms";
import { IForm, ITimeDisplay } from "../form/base/BaseForm";
import { Form } from "../form/Form";
import { InputType } from "./InputType";
import { Select2OptionData } from 'ng-select2';
import { Options } from "select2";
import { Style } from "./Style";

const URL_PATTERN = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
const TEL_PATTERN = '^\\+[0-9]{1,3}\\/[0-9]{1,2}\\-.[0-9]{4,10}$';

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
  formControlName: string, 
  validatorConfigs?: IValidatorConfig[],
}

export interface IFormInputDateConfig {
  inputType: InputType.INPUT_DATE | InputType.INPUT_DATETIME,
  label: string,
  placeholder: string,
  formControlName: string, 
  validatorConfigs?: IValidatorConfig[],
}

export interface IFormInputColorConfig {
  inputType: InputType.INPUT_COLOR,
  label: string,
  formControlName: string, 
}

export interface IFormInputColorConfigImpl {
  label: string,
  formControlName: string, 
}

export interface IFormInputRangeConfigImpl {
  validatorConfigs?: IValidatorConfig[],
  min: number,
  max: number,
  label: string,
  formControlName: string, 
}

export interface IFormInputRangeConfig {
  validatorConfigs?: IValidatorConfig[],
  inputType: InputType.INPUT_RANGE,
  label: string,
  formControlName: string, 
}

export interface IFormInputGeneralConfig {
  inputType: InputType.INPUT_TEXTAREA
    | InputType.INPUT_TEXT
    | InputType.INPUT_CHECKBOX
    | InputType.INPUT_NUMBER
    | InputType.INPUT_PASSWORD
    | InputType.INPUT_URL
    | InputType.INPUT_TEL
    | InputType.INPUT_SEARCH
    | InputType.INPUT_TIME
    | InputType.INPUT_WEEK
    | InputType.INPUT_EMAIL,
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
  select2Config?: ISelect2Config,
  min?: number,
  max?: number
}

export interface IWeekConfig {
  year?: number,
  week?: number
}

export default class FormControlWrapper {
  form: IForm;
  initialControls: IFormControlWrapper = {};
  errorMessagesWrapper: IValidationErrorGroup = {};
  displayConfigs: IDisplayConfig[] = [];

  constructor(form: IForm = {}) {
    this.form = form;
  }

  public withHidden(formControlName: string) { let inputType = InputType.INPUT_HIDDEN; return this.set({inputType, formControlName} as any, inputType) }
  public withSelect(config: IFormInputSelectConfigImpl) { return this.set(config as any, InputType.SELECT) }
  public withNumber(config: IFormInputGeneralConfigImpl) { return this.set(config as any, InputType.INPUT_NUMBER) }
  public withText(config: IFormInputGeneralConfigImpl) { return this.set(config as any, InputType.INPUT_TEXT) }
  public withTextarea(config: IFormInputGeneralConfigImpl) { return this.set(config as any, InputType.INPUT_TEXTAREA) }
  public withDate(config: IFormInputDateConfigImpl) { return this.set(config as any, InputType.INPUT_DATE) }
  public withDateTime(config: IFormInputDateConfigImpl) { return this.set(config as any, InputType.INPUT_DATETIME) }
  public withCheckbox(config: IFormInputGeneralConfigImpl) { return this.set(config as any, InputType.INPUT_CHECKBOX) }
  public withPassword(config: IFormInputGeneralConfigImpl) { return this.set(config as any, InputType.INPUT_PASSWORD) }
  public withColor(config: IFormInputColorConfigImpl) { return this.set(config as any, InputType.INPUT_COLOR) }
  public withEmail(config: IFormInputGeneralConfigImpl) { return this.set(config as any, InputType.INPUT_EMAIL) }
  public withMonth(config: IFormInputDateConfigImpl) { return this.set(config as any, InputType.INPUT_MONTH) }
  public withUrl(config: IFormInputGeneralConfigImpl) { return this.set(config as any, InputType.INPUT_URL) }
  public withTel(config: IFormInputGeneralConfigImpl) { return this.set(config as any, InputType.INPUT_TEL) }
  public withSearch(config: IFormInputGeneralConfigImpl) { return this.set(config as any, InputType.INPUT_SEARCH) }
  public withRange(config: IFormInputRangeConfigImpl) { return this.set(config as any, InputType.INPUT_RANGE) }
  public withWeek(config: IFormInputGeneralConfigImpl) { return this.set(config as any, InputType.INPUT_WEEK) }
  public withTime(config: IFormInputGeneralConfigImpl) { return this.set(config as any, InputType.INPUT_TIME) }

  public getFormattedDisplayValue(formControlName: string, inputType: InputType, displayConfig: IDisplayConfig): any {
    if (inputType === InputType.INPUT_DATETIME) {
      this.form[formControlName] = (this.form[formControlName] as Date)?.toISOString().slice(0, 16);
    } else if (inputType === InputType.INPUT_DATE) {
      return (this.form[formControlName] as Date)?.toISOString().slice(0, 10);
    } else if (inputType === InputType.INPUT_MONTH) {
      return (this.form[formControlName] as Date)?.toISOString().slice(0, 7);
    } else if (inputType === InputType.INPUT_COLOR) {
      this.form[formControlName] = this.form[formControlName] ? this.form[formControlName] : Style.COLOR_PRIMARY;
      return this.form[formControlName];
    } else if (inputType === InputType.INPUT_RANGE) {
      let min = displayConfig.min!;
      let max = displayConfig.max!;
      this.form[formControlName] = this.form[formControlName] ? this.form[formControlName] : (max + min) / 2;
    } else if (inputType === InputType.INPUT_WEEK) {
      let value: IWeekConfig | string = this.form[formControlName] ? this.form[formControlName] as IWeekConfig : '';
      if (typeof value !== "string") {
        let { year, week } = value as IWeekConfig;
        this.form[formControlName] = `${year}-W${week}`;
      }
    } else if (inputType === InputType.INPUT_TIME) {
      let value: ITimeDisplay | string = this.form[formControlName] ? this.form[formControlName] as ITimeDisplay : '';
      if (typeof value !== "string") {
        let { hh, mm } = value as ITimeDisplay;
        this.form[formControlName] = `${hh}:${mm}`;
      }
    }
    return this.form[formControlName];
  } 

  public set(
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
    if (inputType === InputType.INPUT_TEL && !validatorConfigs.find(cfg => cfg.validatorName === "pattern")) {
      validatorConfigs.push({
        message: "Input must be in format of a telephone number (ex: +123/45-67890)",
        validator: Validators.pattern(TEL_PATTERN),
        validatorName: "pattern"
      })
    }
    let validators = validatorConfigs.map(c => c.validator);
    let displayValue = this.getFormattedDisplayValue(formControlName, inputType, displayConfig);
    this.initialControls[formControlName] = new FormControl(displayValue, validators);
    this.displayConfigs.push(displayConfig);
    this.errorMessagesWrapper[formControlName] = validatorConfigs;
    return this;
  }

  public toForm() {
    return new Form(this);
  }
}
