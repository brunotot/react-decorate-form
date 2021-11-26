import InputEntity from "../model/input/base/InputEntity";
import CheckboxEntity from "../model/input/CheckboxEntity";
import ColorEntity from "../model/input/ColorEntity";
import DateEntity from "../model/input/DateEntity";
import DateMonthEntity from "../model/input/DateMonthEntity";
import DateTimeEntity from "../model/input/DateTimeEntity";
import EmailEntity from "../model/input/EmailEntity";
import FileEntity from "../model/input/FileEntity";
import HiddenEntity from "../model/input/HiddenEntity";
import NumberEntity from "../model/input/NumberEntity";
import PasswordEntity from "../model/input/PasswordEntity";
import PhoneEntity from "../model/input/PhoneEntity";
import RangeEntity from "../model/input/RangeEntity";
import SelectEntity from "../model/input/SelectEntity";
import TextEntity from "../model/input/TextEntity";
import TimeEntity from "../model/input/TimeEntity";
import URLEntity from "../model/input/URLEntity";
import WeekEntity from "../model/input/WeekEntity";
import { InputType, PatternInputType } from "../model/InputType";

export interface IVariableGroupValidator {
  value: string,
  index: number,
  isValid: boolean
}

export interface IRegex {
  inputType?: PatternInputType,
  label: string,
  placeholder?: string,
  pattern?: string,
  validationFailedMessage: string,
  exampleValue: string,
  key: string
}

export interface IRegexNormalized {
  inputType: PatternInputType,
  label: string,
  placeholder: string,
  pattern: string,
  validationFailedMessage: string,
  exampleValue: string,
  key: string
}

const INPUT_ENTITITES: InputEntity<any>[] = [
  TextEntity,
  TimeEntity,
  DateEntity,
  DateTimeEntity,
  DateMonthEntity,
  ColorEntity,
  NumberEntity,
  URLEntity,
  CheckboxEntity,
  PhoneEntity,
  FileEntity,
  WeekEntity,
  RangeEntity,
  SelectEntity,
  EmailEntity,
  PasswordEntity,
  HiddenEntity
]

const TEXT_INPUT_TYPES = [
  InputType.TEXT,
  InputType.TEXTAREA,
  InputType.HIDDEN,
  InputType.PASSWORD,
  InputType.SEARCH,
  InputType.EMAIL,
  InputType.PHONE,
  InputType.URL
]

const TEXT_INPUT_DISPLAY_TYPES = [
  InputType.TEXT,
  InputType.TEXTAREA,
  InputType.HIDDEN,
  InputType.SEARCH,
]

export function getInputEntity(inputType: InputType): InputEntity<any> {
  return INPUT_ENTITITES.find(inputEntity => inputEntity.inputTypes.includes(inputType)) || TextEntity;
}

function isTextInternal(inputType: InputType) {
  return TEXT_INPUT_TYPES.includes(inputType);
}

function isTextDisplayInternal(inputType: InputType) {
  return TEXT_INPUT_DISPLAY_TYPES.includes(inputType);
}

export function isText(inputTypes: InputType | InputType[] = []) {
  return Array.isArray(inputTypes) 
    ? !!inputTypes.find(inputType => isTextInternal(inputType)) 
    : isTextInternal(inputTypes)
}

export function isTextDisplay(inputTypes: InputType | InputType[] = []) {
  return Array.isArray(inputTypes) 
    ? !!inputTypes.find(inputType => isTextDisplayInternal(inputType)) 
    : isTextDisplayInternal(inputTypes)
}