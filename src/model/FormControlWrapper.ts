import { IFormInputCheckboxConfig, IFormInputColorConfig, IFormInputDateConfig, IFormInputDateTimeConfig, IFormInputEmailConfig, IFormInputFileConfig, IFormInputMonthConfig, IFormInputNumberConfig, IFormInputPasswordConfig, IFormInputPhoneConfig, IFormInputRangeConfig, IFormInputSearchConfig, IFormInputSelectConfig, IFormInputTextAreaConfig, IFormInputTextConfig, IFormInputTimeConfig, IFormInputURLConfig, IFormInputWeekConfig, ISelect2Config } from "../type/FormInputConfig";
import { IAnyValidatorConfig, ICheckboxValidatorConfig, IColorValidatorConfig, IDateTimeValidatorConfig, IDateValidatorConfig, IFileValidatorConfig, INumberValidatorConfig, IPasswordValidatorConfig, IPhoneValidatorConfig, IRangeValidatorConfig, ISearchValidatorConfig, ISelectValidatorConfig, ITimeValidatorConfig, IURLValidatorConfig, IWeekValidatorConfig } from "../type/ValidatorConfig";
import { FormControl, ValidatorFn } from "@angular/forms";
import { IForm } from "../form/base/BaseForm";
import { Form } from "../form/Form";
import { InputType } from "./InputType";
import { build } from "./ValidatorBuilder";
import InputEntity from "./input/base/InputEntity";
import Validators from "./Validators";
import { getInputEntity } from "../utility/InputEntityUtils";

export interface IValidationErrorGroup { [formControlName: string]: IValidatorConfig[] }
export interface IFormControlWrapper { [formControlName: string]: FormControl }
export interface IValidatorConfig { validator: ValidatorFn, message: string, validatorName: string }

export interface IDisplayConfig {
  formControlName: string,
  inputEntity: InputEntity<any>,
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

  public withHidden   = (formControlName: string)          => this.set({inputType: InputType.HIDDEN, formControlName} as any)
  public withSelect   = (config: IFormInputSelectConfig)   => this.set({...config, inputType: InputType.SELECT} as any)
  public withNumber   = (config: IFormInputNumberConfig)   => this.set({...config, inputType: InputType.NUMBER} as any)
  public withText     = (config: IFormInputTextConfig)     => this.set({...config, inputType: InputType.TEXT} as any)
  public withTextArea = (config: IFormInputTextAreaConfig) => this.set({...config, inputType: InputType.TEXTAREA} as any)
  public withDate     = (config: IFormInputDateConfig)     => this.set({...config, inputType: InputType.DATE} as any)
  public withDateTime = (config: IFormInputDateTimeConfig) => this.set({...config, inputType: InputType.DATETIME} as any)
  public withCheckbox = (config: IFormInputCheckboxConfig) => this.set({...config, inputType: InputType.CHECKBOX} as any)
  public withPassword = (config: IFormInputPasswordConfig) => this.set({...config, inputType: InputType.PASSWORD} as any)
  public withColor    = (config: IFormInputColorConfig)    => this.set({...config, inputType: InputType.COLOR} as any)
  public withEmail    = (config: IFormInputEmailConfig)    => this.set({...config, inputType: InputType.EMAIL} as any)
  public withMonth    = (config: IFormInputMonthConfig)    => this.set({...config, inputType: InputType.MONTH} as any)
  public withUrl      = (config: IFormInputURLConfig)      => this.set({...config, inputType: InputType.URL} as any)
  public withPhone    = (config: IFormInputPhoneConfig)    => this.set({...config, inputType: InputType.PHONE} as any)
  public withSearch   = (config: IFormInputSearchConfig)   => this.set({...config, inputType: InputType.SEARCH} as any)
  public withRange    = (config: IFormInputRangeConfig)    => this.set({...config, inputType: InputType.RANGE} as any)
  public withWeek     = (config: IFormInputWeekConfig)     => this.set({...config, inputType: InputType.WEEK} as any)
  public withTime     = (config: IFormInputTimeConfig)     => this.set({...config, inputType: InputType.TIME} as any)
  public withFile     = (config: IFormInputFileConfig)     => this.set({...config, inputType: InputType.FILE} as any)

  public getInitialDisplayValue(displayConfig: IDisplayConfig): any {
    let { formControlName, inputType } = displayConfig;
    let value = this.form[formControlName];
    let inputEntity = getInputEntity(inputType);
    return inputEntity.convertToFormValue(value, displayConfig);
  } 

  public buildValidatorSetupAndGetValidators(
    displayConfig: IDisplayConfig, 
    formControlName: string, 
    validatorConfigs: (IValidatorConfig | IAnyValidatorConfig)[]
  ): ValidatorFn[] {
    let i = 0;
    let validators: ValidatorFn[] = [];
    this.errorMessagesWrapper[formControlName] = [];
    let { inputType } = displayConfig;
    let inputEntity = getInputEntity(inputType);
    for (let validatorConfig of validatorConfigs) {
      if ("validator" in validatorConfig) {
        let { validator } = validatorConfig;
        validators.push(validator);
        this.errorMessagesWrapper[formControlName].push(validatorConfig)
      } else {
        let key = `${formControlName}${i++}`;
        let { message, isValid } = validatorConfig;
        let validatorBuild = build(
          key, 
          message, 
          v => {
            let formattedValue = inputEntity.convertToFormValue(v, displayConfig);
            return formattedValue === null ? false : isValid(formattedValue);
          }
        );
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
      tags: select2Config.tags === undefined ? true : defaultSelect2Config.tags,
    };
    return select2Config;
  }

  public set(displayConfig: IDisplayConfig) {
    let { inputType, formControlName } = displayConfig;
    displayConfig.inputEntity = getInputEntity(inputType);
    
    let validatorConfigs: IValidatorConfig[] = (displayConfig as any)?.validatorConfigs || [];
    if (inputType === InputType.SELECT) {
      displayConfig.select2Config = this.getNormalizedSelect2Config(displayConfig);
    } else if (inputType === InputType.EMAIL) {
      validatorConfigs.push(Validators.email())
    } else if (inputType === InputType.URL) {
      validatorConfigs.push(Validators.url(formControlName))
    } else if (inputType === InputType.PHONE) {
      validatorConfigs.push(Validators.phone(formControlName))
    }

    let validators: ValidatorFn[] = this.buildValidatorSetupAndGetValidators(displayConfig, formControlName, validatorConfigs);
    this.form[formControlName] = this.getInitialDisplayValue(displayConfig);
    this.initialControls[formControlName] = new FormControl(this.form[formControlName], validators);
    this.displayConfigs.push(displayConfig);

    return this;
  }

  public toForm() {
    return new Form(this);
  }
}
