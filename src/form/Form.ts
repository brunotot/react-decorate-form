import { FormGroup, ValidatorFn } from "@angular/forms";
import FormControlWrapper, { IDisplayConfig } from "../model/FormControlWrapper";
import { IBaseForm } from "./base/BaseForm";

export class Form extends FormGroup implements IBaseForm {
  formControlWrapper: FormControlWrapper;

  constructor(formControlWrapper: FormControlWrapper) {
    super(formControlWrapper.initialControls)
    this.formControlWrapper = formControlWrapper;
  }

  getValidationFailedMessage(varName: string, errorKey: string, displayConfig: IDisplayConfig): string {
    let { errorMessagesWrapper } = this.formControlWrapper;
    let errorValidators = errorMessagesWrapper[varName];
    let errorValidator = errorValidators.find(eV => eV.validatorName === errorKey);
    return errorValidator 
      ? errorValidator.message 
      : (displayConfig.inputEntity.getRegexInputs().find(regexInput => regexInput.key === errorKey)?.validationFailedMessage || `??${varName}.${errorKey}_MSG_MISSING??`)
  }
}