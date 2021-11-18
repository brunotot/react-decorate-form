import { FormGroup, ValidatorFn } from "@angular/forms";
import FormControlWrapper from "../model/FormControlWrapper";
import { IBaseForm } from "./base/BaseForm";

export class Form extends FormGroup implements IBaseForm {
  formControlWrapper: FormControlWrapper;

  constructor(formControlWrapper: FormControlWrapper) {
    super(formControlWrapper.initialControls)
    this.formControlWrapper = formControlWrapper;
  }

  getValidationFailedMessage(varName: string, errorKey: string): string {
    let { errorMessagesWrapper } = this.formControlWrapper;
    let errorValidators = errorMessagesWrapper[varName];
    let t: ValidatorFn = errorValidators[0].validator
    let errorValidator = errorValidators.find(eV => eV.validatorName === errorKey);
    return errorValidator ? errorValidator.message : `??${varName}.${errorKey}_MSG_MISSING??`;
  }
}