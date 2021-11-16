import { FormControl, ValidatorFn } from "@angular/forms";
import { IForm } from "../form/base/BaseForm";
import { Form } from "../form/Form";
import { InputType } from "./InputType";
import { Select2OptionData } from 'ng-select2';

export interface IValidationError {
  message: string,
  validatorName: string
}

export interface IValidationErrorGroup { [key: string]: IValidationError[] }
export interface IFormControlWrapper { [key: string]: FormControl };
export interface IDisplayConfig {
  variable: string,
  inputType: InputType,
  placeholder: string,
  label: string, 
  select2Data?: Select2OptionData[]
}

export interface IFormInputHiddenConfig {
  inputType: InputType.INPUT_HIDDEN,
  key: string
}

export interface IFormInputDateConfig {
  inputType: InputType.INPUT_DATETIME | InputType.INPUT_DATE,
  label: string,
  key: string, 
  validatorConfigs?: { validator: ValidatorFn, message: string, validatorName: string }[],
}

export interface IFormInputGeneralConfig {
  inputType: InputType.INPUT_CHECKBOX 
    | InputType.INPUT_NUMBER 
    | InputType.INPUT_PASSWORD 
    | InputType.INPUT_TEXT 
    | InputType.INPUT_TEXTAREA,
  placeholder: string,
  label: string,
  key: string, 
  validatorConfigs?: { validator: ValidatorFn, message: string, validatorName: string }[],
}

export interface IFormInputSelectConfig {
  inputType: InputType.SELECT_SINGLE | InputType.SELECT_MULTIPLE,
  placeholder: string,
  label: string,
  key: string, 
  validatorConfigs?: { validator: ValidatorFn, message: string, validatorName: string }[],
  select2Data: Select2OptionData[]
}

export default class FormControlWrapper {
  initialControls: IFormControlWrapper = {};
  errorMessagesWrapper: IValidationErrorGroup = {};
  displayConfigs: IDisplayConfig[];

  private constructor(
    initialControls: IFormControlWrapper, 
    errorMessagesWrapper: IValidationErrorGroup,
    displayConfigs: IDisplayConfig[]
  ) {
    this.initialControls = initialControls;
    this.errorMessagesWrapper = errorMessagesWrapper;
    this.displayConfigs = displayConfigs;
  }

  public static builder(form: IForm = {}) {
    return new FormControlWrapper.FormControlWrapperBuilder(form);
  }

  private static FormControlWrapperBuilder = class {
    form: IForm;
    initialControls: IFormControlWrapper = {};
    errorMessagesWrapper: IValidationErrorGroup = {};
    displayConfigs: IDisplayConfig[] = [];

    constructor(form: IForm = {}) {
      this.form = form;
    }


    public set(formBaseConfig: IFormInputDateConfig | IFormInputGeneralConfig | IFormInputHiddenConfig | IFormInputSelectConfig) {
      let { key, inputType } = formBaseConfig;
      let select2Data = (formBaseConfig as IFormInputSelectConfig)?.select2Data || [];
      let validatorConfigs = (formBaseConfig as any).validatorConfigs || [];
      let validators = validatorConfigs.map((c: any) => c.validator);

      let displayValue = this.form[key];
      if (inputType === InputType.INPUT_DATETIME) {
        displayValue = (displayValue as Date)?.toISOString().slice(0, 16);
      } else if (inputType === InputType.INPUT_DATE) {
        displayValue = (displayValue as Date)?.toISOString().slice(0, 10);
      }
      this.initialControls[key] = new FormControl(displayValue, validators);
      let validationErrors: IValidationError[] = [];
      validatorConfigs.forEach((validatorConfig: any) => {
        let { message, validatorName } = validatorConfig;
        validationErrors.push({
          message,
          validatorName
        })
      })
      this.displayConfigs.push({
        inputType,
        variable: key,
        label: (formBaseConfig as any).label || '',
        placeholder: (formBaseConfig as any).placeholder || '',
        select2Data
      })
      this.errorMessagesWrapper[key] = validationErrors;
      return this;
    }

    public build(): FormControlWrapper {
      return new FormControlWrapper(this.initialControls, this.errorMessagesWrapper, this.displayConfigs);
    }

    public getForm(): Form {
      return new Form(this.build());
    }
  }
}
