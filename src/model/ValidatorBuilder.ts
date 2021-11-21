import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { IValidatorConfig } from "./FormControlWrapper";

export function splitToTwoValues(separator: string, stringToSplitFrom: string) {
  let stringSplit = stringToSplitFrom.split(separator);
  if (stringSplit.length !== 2) throw new Error(`String: "${stringToSplitFrom}" has separator: "${separator}" on multiple places!`)
  return [stringSplit[0], stringSplit[1]];
}

export interface IFile {
  lastModified: number,
  lastModifiedDate: Date,
  name: string, 
  size: number
  type: string,
  content: string
}

export interface ITime {
  hh: number,
  mm: number,
  timeString: string
}

export interface IWeek {
  year: number,
  week: number,
  weekString: string
}

export interface IPhone {
  countryCode: string,
  areaCode: string,
  lineNumber: string,
  globalNumber: string,
  localNumber: string
}

export interface IHSL {
  hue: number,
  saturation: number,
  lightness: number
}

export interface IRGB {
  red: number,
  green: number,
  blue: number
}

export interface IColor {
  hex: string,
  rgb: IRGB,
  hsl: IHSL
}

export function build(
  validatorName: string, 
  message: string,
  isValid: (value: any) => boolean
): IValidatorConfig {
  return {
    validatorName,
    message,
    validator: getValidatorFn(validatorName, isValid)
  }
}

function getValidatorFn(
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