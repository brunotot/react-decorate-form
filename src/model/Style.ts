import { ValidationStatus } from "./ValidationStatus";

export enum Style {
  CLASS_INPUT_VALIDATION = 'input-validation',
  CLASS_INPUT_INVALID = 'input-validation-invalid',
  CLASS_INPUT_VALID = 'input-validation-valid',
  CLASS_INPUT_INVALID_GROUP = 'input-validation input-validation-invalid',
  CLASS_INPUT_VALID_GROUP = 'input-validation input-validation-valid',
  STYLE_BORDER_INPUT_DEFAULT = '1px solid #ced4da'
}

export function getValidationClass(
  validationStatus: ValidationStatus = ValidationStatus.IDLE, 
  validClass: string = '', 
  invalidClass: string = ''
) {
  return validationStatus === ValidationStatus.IDLE
    ? ''
    : validationStatus === ValidationStatus.VALID
      ? validClass
      : invalidClass
}

export function handleUniqueClasses(...classes: string[]) {
  let combinedClasses: string[] = [];
  classes.forEach(clazz => {
    if (clazz) {
      combinedClasses = [...combinedClasses, ...clazz.split(" ")];
    }
  })
  let uniqueClasses = new Set(combinedClasses);
  return [...uniqueClasses].join(" ");
}