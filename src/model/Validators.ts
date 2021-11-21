import { ValidatorFn, Validators as FormsValidator } from "@angular/forms";
import { IValidatorConfig } from "./FormControlWrapper";
import { build, IPhone } from "./ValidatorBuilder";

const URL_PATTERN = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
const PHONE_PATTERN = '^\\+[0-9]{1,3}\\/[0-9]{1,2}\\-.[0-9]{4,10}$';
const MSG_DEFAULT_URL_VALIDATION_FAILED = 'Input must be in format of a URL (ex: http://www.example.com/index.html)'
const MSG_DEFAULT_PHONE_VALIDATION_FAILED = 'Input must be in format of a telephone number (ex: +123/45-67890)'
const MSG_DEFAULT_EMAIL_VALIDATION_FAILED = 'Input must be in format of an email (ex: test@mail.com)'
const MSG_DEFAULT_REQUIRED_VALIDATION_FAILED = 'Field value is required'
const MSG_DEFAULT_REQUIRED_TRUE_VALIDATION_FAILED = 'Field value must be truthy'
const getMsgDefaultPatternValidationFailed = (pattern: string) => `Input doesn't conform to pattern: ${pattern}`
const getMsgDefaultMinValidationFailed = (min: number) => `Number must be greater than ${min - 1}`
const getMsgDefaultMaxValidationFailed = (max: number) => `Number cannot be greater than ${max}`
const getMsgDefaultMinLengthValidationFailed = (min: number) => `Input length must be higher than ${min - 1}`
const getMsgDefaultMaxLengthValidationFailed = (max: number) => `Input length cannot be greater than ${max}`

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

function min(num: number, validationFailedMessage: string = getMsgDefaultMinValidationFailed(num)): IValidatorConfig {
  return _buildStaticValidator('min', validationFailedMessage, FormsValidator.min(num))
}

function max(num: number, validationFailedMessage: string = getMsgDefaultMaxValidationFailed(num)): IValidatorConfig {
  return _buildStaticValidator('max', validationFailedMessage, FormsValidator.max(num))
}

function minLength(num: number, validationFailedMessage: string = getMsgDefaultMinLengthValidationFailed(num)): IValidatorConfig {
  return _buildStaticValidator('minlength', validationFailedMessage, FormsValidator.minLength(num))
}

function maxLength(num: number, validationFailedMessage: string = getMsgDefaultMaxLengthValidationFailed(num)): IValidatorConfig {
  return _buildStaticValidator('maxlength', validationFailedMessage, FormsValidator.maxLength(num))
}

function pattern(pattern: string, validationFailedMessage: string = getMsgDefaultPatternValidationFailed(pattern)): IValidatorConfig {
  return _buildStaticValidator('pattern', validationFailedMessage, FormsValidator.pattern(pattern))
}

function required(validationFailedMessage: string = MSG_DEFAULT_REQUIRED_VALIDATION_FAILED): IValidatorConfig {
  return _buildStaticValidator('required', validationFailedMessage, FormsValidator.required)
}

function requiredTrue(validationFailedMessage: string = MSG_DEFAULT_REQUIRED_TRUE_VALIDATION_FAILED): IValidatorConfig {
  return _buildStaticValidator('required', validationFailedMessage, FormsValidator.requiredTrue)
}

function email(validationFailedMessage: string = MSG_DEFAULT_EMAIL_VALIDATION_FAILED): IValidatorConfig {
  return _buildStaticValidator('email', validationFailedMessage, FormsValidator.email)
}

function url(validatorName: string, validationFailedMessage: string = MSG_DEFAULT_URL_VALIDATION_FAILED): IValidatorConfig {
  return build(validatorName, validationFailedMessage, (value: string) => {
    try {
      new URL(value);
      return true;
    } catch (e) {
      return false;
    }
  })
}

function phone(validatorName: string, validationFailedMessage: string = MSG_DEFAULT_PHONE_VALIDATION_FAILED): IValidatorConfig {
  return build(validatorName, validationFailedMessage, value => {
    let re = new RegExp(PHONE_PATTERN);
    let phone = value as IPhone;
    let globalNumber = !!phone ? phone.globalNumber : '';
    return re.test(globalNumber)
  })
}

const Validators = {
  min,
  max,
  email,
  minLength,
  maxLength,
  pattern,
  required,
  requiredTrue,
  url,
  phone
}

export default Validators;