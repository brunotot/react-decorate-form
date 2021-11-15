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

export interface IFormBaseConfig {
  inputType: InputType,
  key: string, 
  validatorConfigs?: { validator: ValidatorFn, message: string, validatorName: string }[],
  placeholder?: string,
  label?: string,
  select2Data?: Select2OptionData[]
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

    public set(formBaseConfig: IFormBaseConfig) {
      let { key, inputType } = formBaseConfig;
      let select2Data = formBaseConfig?.select2Data || [];
      let validatorConfigs = formBaseConfig.validatorConfigs || [];
      let validators = validatorConfigs.map(c => c.validator);

      let displayValue = this.form[key];
      if (inputType === InputType.INPUT_DATETIME) {
        displayValue = (displayValue as Date).toISOString().slice(0, 16);
      } else if (inputType === InputType.INPUT_DATE) {
        displayValue = (displayValue as Date).toISOString().slice(0, 10);
      }
      this.initialControls[key] = new FormControl(displayValue, validators);
      let validationErrors: IValidationError[] = [];
      validatorConfigs.forEach(validatorConfig => {
        let { message, validatorName } = validatorConfig;
        validationErrors.push({
          message,
          validatorName
        })
      })
      this.displayConfigs.push({
        inputType,
        variable: key,
        label: formBaseConfig.label || '',
        placeholder: formBaseConfig.placeholder || '',
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
