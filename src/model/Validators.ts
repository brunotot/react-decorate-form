import { ValidatorFn, Validators as FormsValidator } from "@angular/forms";
import { IValidatorConfig } from "./FormControlWrapper";

function _buildStaticValidator(
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
  return _buildStaticValidator('min', validationFailedMessage, FormsValidator.min(num))
}

function max(num: number, validationFailedMessage: string): IValidatorConfig {
  return _buildStaticValidator('max', validationFailedMessage, FormsValidator.max(num))
}

function minLength(num: number, validationFailedMessage: string): IValidatorConfig {
  return _buildStaticValidator('minlength', validationFailedMessage, FormsValidator.minLength(num))
}

function maxLength(num: number, validationFailedMessage: string): IValidatorConfig {
  return _buildStaticValidator('maxlength', validationFailedMessage, FormsValidator.maxLength(num))
}

function pattern(pattern: string, validationFailedMessage: string): IValidatorConfig {
  return _buildStaticValidator('maxlength', validationFailedMessage, FormsValidator.pattern(pattern))
}

function required(validationFailedMessage: string): IValidatorConfig {
  return _buildStaticValidator('required', validationFailedMessage, FormsValidator.required)
}

function requiredTrue(validationFailedMessage: string): IValidatorConfig {
  return _buildStaticValidator('required', validationFailedMessage, FormsValidator.requiredTrue)
}

function email(validationFailedMessage: string): IValidatorConfig {
  return _buildStaticValidator('email', validationFailedMessage, FormsValidator.email)
}

const Validators = {
  min,
  max,
  email,
  minLength,
  maxLength,
  pattern,
  required,
  requiredTrue
}

export default Validators;