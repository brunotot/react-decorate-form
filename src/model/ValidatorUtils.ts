import { AbstractControl, ValidatorFn, ValidationErrors, Validators } from "@angular/forms";
import { IValidatorConfig } from "./FormControlWrapper";

function buildStaticValidator(
  validatorName: string,
  message: string,
  validator: ValidatorFn
): IValidatorConfig {
  return {
    validatorName,
    message,
    validator
  }
}

function min(num: number, validationFailedMessage: string): IValidatorConfig {
  return buildStaticValidator('min', validationFailedMessage, Validators.min(num))
}

function max(num: number, validationFailedMessage: string): IValidatorConfig {
  return buildStaticValidator('max', validationFailedMessage, Validators.max(num))
}

function minLength(num: number, validationFailedMessage: string): IValidatorConfig {
  return buildStaticValidator('minlength', validationFailedMessage, Validators.minLength(num))
}

function maxLength(num: number, validationFailedMessage: string): IValidatorConfig {
  return buildStaticValidator('maxlength', validationFailedMessage, Validators.maxLength(num))
}

function pattern(pattern: string, validationFailedMessage: string): IValidatorConfig {
  return buildStaticValidator('maxlength', validationFailedMessage, Validators.pattern(pattern))
}

function required(validationFailedMessage: string): IValidatorConfig {
  return buildStaticValidator('required', validationFailedMessage, Validators.required)
}

function requiredTrue(validationFailedMessage: string): IValidatorConfig {
  return buildStaticValidator('required', validationFailedMessage, Validators.requiredTrue)
}

function email(validationFailedMessage: string): IValidatorConfig {
  return buildStaticValidator('email', validationFailedMessage, Validators.email)
}

function build(
  validatorName: string, 
  message: string,
  isValid: (value: any) => boolean
): IValidatorConfig {
  return {
    validatorName,
    message,
    validator: _buildValidator(validatorName, isValid)
  }
}

function _buildValidator(
  validationKey: string, 
  isValid: (value: any) => boolean
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let controlValue: any = control.value;
    let config: any = {};
    config[validationKey] = controlValue;
    return isValid(controlValue) ? null : config;
  };
}

const ValidatorUtils = {
  min,
  max,
  email,
  minLength,
  maxLength,
  pattern,
  required,
  requiredTrue,
  build
}

export default ValidatorUtils;