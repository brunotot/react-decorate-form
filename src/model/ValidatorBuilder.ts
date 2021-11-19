import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { hexToColor } from "../utility/ColorUtils";
import { getInitialTimeValue } from "../utility/TimeUtils";
import { getInitialWeekValue } from "../utility/WeekUtils";
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

function build(
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


const forAny = (validatorName: string, message: string, isValid: (value: any) => boolean) => build(validatorName, message, isValid)
const forDateTime = (validatorName: string, message: string, isValid: (value: Date) => boolean) => build(validatorName, message, (value: string) => isValid(new Date(value)))
const forDate = (validatorName: string, message: string, isValid: (value: Date) => boolean) => build(validatorName, message, (value: string) => isValid(new Date(value)))
const forMonth = (validatorName: string, message: string, isValid: (value: Date) => boolean) => build(validatorName, message, (value: string) => isValid(new Date(value)))
const forText = (validatorName: string, message: string, isValid: (value: string) => boolean) => build(validatorName, message, isValid)
const forTextArea = (validatorName: string, message: string, isValid: (value: string) => boolean) => build(validatorName, message, isValid)
const forColor = (validatorName: string, message: string, isValid: (value: string) => boolean) => build(validatorName, message, isValid)
const forPassword = (validatorName: string, message: string, isValid: (value: string) => boolean) => build(validatorName, message, isValid)
const forEmail = (validatorName: string, message: string, isValid: (value: string) => boolean) => build(validatorName, message, isValid)
const forNumber = (validatorName: string, message: string, isValid: (value: number) => boolean) => build(validatorName, message, isValid)
const forRange = (validatorName: string, message: string, isValid: (value: number) => boolean) => build(validatorName, message, isValid)
const forCheckbox = (validatorName: string, message: string, isValid: (value: boolean) => boolean) => build(validatorName, message, c => isValid(!!c))
const forHidden = (validatorName: string, message: string, isValid: (value: string | IColor) => boolean) => build(validatorName, message, v => typeof v === "string" ? isValid(hexToColor(v)) : isValid(v))
const forUrl = (validatorName: string, message: string, isValid: (value: string) => boolean) => build(validatorName, message, isValid)
const forTel = (validatorName: string, message: string, isValid: (value: string) => boolean) => build(validatorName, message, isValid)
const forSearch = (validatorName: string, message: string, isValid: (value: string) => boolean) => build(validatorName, message, isValid)
const forWeek = (validatorName: string, message: string, isValid: (value: IWeek) => boolean) => build(validatorName, message, v => isValid(getInitialWeekValue(v)))
const forTime = (validatorName: string, message: string, isValid: (value: ITime) => boolean) => build(validatorName, message, t => isValid(getInitialTimeValue(t)))
const forSelect = (validatorName: string, message: string, isValid: (value: string | string[]) => boolean) => build(validatorName, message, isValid)
const forFile = (validatorName: string, message: string, isValid: (value: IFile | IFile[]) => boolean) => build(validatorName, message, isValid)


const ValidatorBuilder = {
  build,
  /*forNumber,
  forDateTime,
  forDate,
  forMonth,
  forText,
  forTextArea,
  forColor,
  forEmail,
  forPassword,
  forRange,
  forHidden,
  forCheckbox,
  forUrl,
  forTel,
  forSearch,
  forTime,
  forWeek,
  forSelect,
  forFile,
  forAny*/
}

export default ValidatorBuilder;