import { IForm } from "../form/base/BaseForm";
import { IDisplayConfig } from "../model/FormControlWrapper";
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

export interface IPaginationState {
  currentPageNumber: number,
  entriesPerPage: number,
  searchFilter: string,
  sortingFormControlName: string,
  sortingType: SortingType
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

export interface IAjaxResponse {
  data: IForm[],
  count: number
}

export interface IAjax {
  loadData: (paginationState: IPaginationState, displayConfigsByFormControlName: {[key: string]: IDisplayConfig}) => Promise<IAjaxResponse>
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

const DATE_INPUT_TYPES = [
  InputType.DATE,
  InputType.DATETIME
]

const TEXT_INPUT_DISPLAY_TYPES = [
  InputType.TEXT,
  InputType.TEXTAREA,
  InputType.HIDDEN,
  InputType.SEARCH,
]

const NUMBER_INPUT_TYPE = [
  InputType.NUMBER,
  InputType.RANGE
]

export function getInputEntity(inputType: InputType): InputEntity<any> {
  return INPUT_ENTITITES.find(inputEntity => inputEntity.inputTypes.includes(inputType)) || TextEntity;
}

function isTextInternal(inputType: InputType) {
  return TEXT_INPUT_TYPES.includes(inputType);
}

function isDateInternal(inputType: InputType) {
  return DATE_INPUT_TYPES.includes(inputType);
}

function isNumberInternal(inputType: InputType) {
  return NUMBER_INPUT_TYPE.includes(inputType);
}

function isTextDisplayInternal(inputType: InputType) {
  return TEXT_INPUT_DISPLAY_TYPES.includes(inputType);
}

export function isText(inputTypes: InputType | InputType[] = []) {
  return Array.isArray(inputTypes) 
    ? !!inputTypes.find(inputType => isTextInternal(inputType)) 
    : isTextInternal(inputTypes)
}

export function isNumber(inputTypes: InputType | InputType[] = []) {
  return Array.isArray(inputTypes) 
    ? !!inputTypes.find(inputType => isNumberInternal(inputType)) 
    : isNumberInternal(inputTypes)
}

export function isDate(inputTypes: InputType | InputType[] = []) {
  return Array.isArray(inputTypes) 
    ? !!inputTypes.find(inputType => isDateInternal(inputType)) 
    : isDateInternal(inputTypes)
}

export function isTextDisplay(inputTypes: InputType | InputType[] = []) {
  return Array.isArray(inputTypes) 
    ? !!inputTypes.find(inputType => isTextDisplayInternal(inputType)) 
    : isTextDisplayInternal(inputTypes)
}

export enum SortingType {
  ASC = 'asc',
  DESC = 'desc'
}

export function getCompareFn(inputEntity: InputEntity<any>, displayConfig: IDisplayConfig, sortingType: SortingType): (a: any, b: any) => 1 | -1 | 0 {
  let { inputType } = displayConfig;
  if (isNumber(inputType)) return (valueA, valueB) => {
    let a = inputEntity.convertToFormValue(valueA, displayConfig);
    let b = inputEntity.convertToFormValue(valueB, displayConfig);
    let numberA = a === null ? (sortingType === SortingType.ASC ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY) : Number(a)
    let numberB = b === null ? (sortingType === SortingType.ASC ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY) : Number(b)
    return sortingType === SortingType.ASC 
      ? (numberA > numberB ? 1 : numberA === numberB ? 0 : -1) 
      : (numberB > numberA ? 1 : numberA === numberB ? 0 : -1)
  }
  if (isDate(inputType)) return (valueA, valueB) => {
    let a = inputEntity.convertToFormValue(valueA, displayConfig);
    let b = inputEntity.convertToFormValue(valueB, displayConfig);
    let timeA = a === null ? (sortingType === SortingType.ASC ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY) : Number(a?.getTime())
    let timeB = b === null ? (sortingType === SortingType.ASC ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY) : Number(b?.getTime())
    return sortingType === SortingType.ASC 
      ? (timeA > timeB ? 1 : timeA === timeB ? 0 : -1) 
      : (timeB > timeA ? 1 : timeA === timeB ? 0 : -1)
  }
  if (inputType === InputType.WEEK) return (valueA, valueB) => {
    let a = inputEntity.convertToFormValue(valueA, displayConfig);
    let b = inputEntity.convertToFormValue(valueB, displayConfig);
    let yearA = a === null ? (sortingType === SortingType.ASC ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY) : Number(a.year)
    let yearB = b === null ? (sortingType === SortingType.ASC ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY) : Number(b.year)
    let weekA = a === null ? (sortingType === SortingType.ASC ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY) : Number(a.week)
    let weekB = b === null ? (sortingType === SortingType.ASC ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY) : Number(b.week)
    if (yearA > yearB) return sortingType === SortingType.ASC ? 1 : -1;
    else if (yearA < yearB) return sortingType === SortingType.ASC ? -1 : 1;
    else {
      if (weekA > weekB) return sortingType === SortingType.ASC ? 1 : -1;
      else if (weekA < weekB) return sortingType === SortingType.ASC ? -1 : 1;
      return 0;
    }
  }
  if (inputType === InputType.MONTH) return (valueA, valueB) => {
    let a = inputEntity.convertToFormValue(valueA, displayConfig);
    let b = inputEntity.convertToFormValue(valueB, displayConfig);
    let yearA = a === null ? (sortingType === SortingType.ASC ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY) : Number(a.getFullYear())
    let yearB = b === null ? (sortingType === SortingType.ASC ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY) : Number(b.getFullYear())
    let monthA = a === null ? (sortingType === SortingType.ASC ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY) : Number(a.getMonth())
    let monthB = b === null ? (sortingType === SortingType.ASC ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY) : Number(b.getMonth())
    if (yearA > yearB) return sortingType === SortingType.ASC ? 1 : -1;
    else if (yearA < yearB) return sortingType === SortingType.ASC ? -1 : 1;
    else {
      if (monthA > monthB) return sortingType === SortingType.ASC ? 1 : -1;
      else if (monthA < monthB) return sortingType === SortingType.ASC ? -1 : 1;
      return 0;
    }
  }
  return (valueA, valueB) => {
    let a = inputEntity.convertToDatatableValueReadOnly(valueA);
    let b = inputEntity.convertToDatatableValueReadOnly(valueB);
    let stringA = a ? String(a) : '';
    let stringB = b ? String(b) : '';
    return sortingType === SortingType.ASC 
      ? stringA.localeCompare(stringB) as 0 | 1 | -1
      : stringB.localeCompare(stringA) as 0 | 1 | -1
  }
}
