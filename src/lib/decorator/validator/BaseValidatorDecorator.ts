import {
  AbstractControl,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import 'reflect-metadata';
import { IValidateMetadata } from './impl/ValidatorDecorator';

export const METADATA_VALIDATION_KEY_PREFIX = 'validation:formHandler:';

export function uuidv4() {
  const UUIDv4Template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  const UUIDv4CharsRegex = /[xy]/g;
  const radix = 16;
  function UUIDv4ReplacerFn(c: any) {
    let r = (Math.random() * radix) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(radix);
  }
  return UUIDv4Template.replace(UUIDv4CharsRegex, UUIDv4ReplacerFn);
}

export interface IValidateConfig {
  message: string;
  validatorFn: ValidatorFn;
}

function getFormObject(target: any, formParent: UntypedFormGroup | null) {
  if (!formParent) {
    return target;
  }
  let formControls = formParent.controls;
  for (let propertyName of Object.keys(formControls)) {
    target[propertyName] = formControls[propertyName].value;
  }
  return target;
}

function getValidatorFn(
  target: any,
  message: string,
  isValid: (value: any, target?: any) => boolean
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let controlValue: any = control.value;
    let config: any = {};
    let key = uuidv4();
    config[key] = message;
    return isValid(
      controlValue,
      getFormObject(target, control.parent as UntypedFormGroup)
    )
      ? null
      : config;
  };
}

export function buildValidatorFn(
  validatorFn: ValidatorFn | ((value: any) => boolean),
  message: string
) {
  return (control: AbstractControl): ValidationErrors | null => {
    const getValidationErrors = (
      c: object | boolean
    ): ValidationErrors | null => {
      return !c
        ? null
        : {
            [key]: message,
          };
    };
    let controlValue = control.value;
    let key = uuidv4();
    let config;
    try {
      config = validatorFn(control);
    } catch (ignored) {
      config = false;
    }
    if (typeof config === 'object') {
      return getValidationErrors(config as any);
    }
    config = !validatorFn(controlValue);
    return getValidationErrors(config as any);
  };
}

export function buildCustomValidatorFn(
  isValid: (value: any) => boolean,
  message: string
): ValidatorFn {
  return getValidatorFn(null, message, isValid);
}

export function getValidateDecoratorFn(validateMetadata: IValidateMetadata) {
  const { message, isValid } = validateMetadata;
  return function (target: any, key: string | symbol) {
    let validateFn = getValidatorFn(target, message, isValid);
    const metadataKey = `${METADATA_VALIDATION_KEY_PREFIX}${uuidv4()}`;
    Reflect.defineMetadata(metadataKey, validateFn, target, key);
  };
}
