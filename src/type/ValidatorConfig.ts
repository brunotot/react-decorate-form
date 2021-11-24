import { IFormNonNull } from "../form/base/BaseForm";
import { IColor, IFile, IPhone, ITime, IWeek } from "../model/ValidatorBuilder"

// isValid::any
export interface IAnyValidatorConfig   { message: string, isValid: (value: any, form: IFormNonNull) => boolean }

// isValid::(string | string[])
export interface ISelectSingleValidatorConfig   { message: string, isValid: (value: string, form: IFormNonNull) => boolean }
export interface ISelectMultipleValidatorConfig   { message: string, isValid: (value: string[], form: IFormNonNull) => boolean }

// isValid::string
export interface ITextValidatorConfig     { message: string, isValid: (value: string, form: IFormNonNull) => boolean }
export interface ITextAreaValidatorConfig { message: string, isValid: (value: string, form: IFormNonNull) => boolean }
export interface IHiddenValidatorConfig   { message: string, isValid: (value: string, form: IFormNonNull) => boolean }
export interface IPasswordValidatorConfig { message: string, isValid: (value: string, form: IFormNonNull) => boolean }
export interface ISearchValidatorConfig   { message: string, isValid: (value: string, form: IFormNonNull) => boolean }
export interface IEmailValidatorConfig    { message: string, isValid: (value: string, form: IFormNonNull) => boolean }

// isValid::number
export interface INumberValidatorConfig   { message: string, isValid: (value: number, form: IFormNonNull) => boolean }
export interface IRangeValidatorConfig    { message: string, isValid: (value: number, form: IFormNonNull) => boolean }

// isValid::boolean
export interface ICheckboxValidatorConfig { message: string, isValid: (value: boolean, form: IFormNonNull) => boolean }

// isValid::IColor
export interface IColorValidatorConfig    { message: string, isValid: (value: IColor, form: IFormNonNull) => boolean }

// isValid::Date
export interface IDateValidatorConfig     { message: string, isValid: (value: Date, form: IFormNonNull) => boolean }
export interface IDateTimeValidatorConfig { message: string, isValid: (value: Date, form: IFormNonNull) => boolean }
export interface IMonthValidatorConfig    { message: string, isValid: (value: Date, form: IFormNonNull) => boolean }

// isValid::URL
export interface IURLValidatorConfig      { message: string, isValid: (value: URL, form: IFormNonNull) => boolean }

// isValid::IPhone
export interface IPhoneValidatorConfig    { message: string, isValid: (value: IPhone, form: IFormNonNull) => boolean }

// isValid::IWeek
export interface IWeekValidatorConfig     { message: string, isValid: (value: IWeek, form: IFormNonNull) => boolean }

// isValid::ITime
export interface ITimeValidatorConfig     { message: string, isValid: (value: ITime, form: IFormNonNull) => boolean }

// isValid::IFile
export interface IFileSingleValidatorConfig     { message: string, isValid: (value: IFile | null, form: IFormNonNull) => boolean }
export interface IFileMultipleValidatorConfig     { message: string, isValid: (value: IFile[] | null, form: IFormNonNull) => boolean }