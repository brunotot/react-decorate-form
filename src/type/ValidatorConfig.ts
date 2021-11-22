import { IColor, IFile, IPhone, ITime, IWeek } from "../model/ValidatorBuilder"

// isValid::any
export interface IAnyValidatorConfig   { message: string, isValid: (value: any) => boolean }

// isValid::(string | string[])
export interface ISelectValidatorConfig   { message: string, isValid: (value: string | string[]) => boolean }

// isValid::string
export interface ITextValidatorConfig     { message: string, isValid: (value: string) => boolean }
export interface ITextAreaValidatorConfig { message: string, isValid: (value: string) => boolean }
export interface IHiddenValidatorConfig   { message: string, isValid: (value: string) => boolean }
export interface IPasswordValidatorConfig { message: string, isValid: (value: string) => boolean }
export interface ISearchValidatorConfig   { message: string, isValid: (value: string) => boolean }
export interface IEmailValidatorConfig    { message: string, isValid: (value: string) => boolean }

// isValid::number
export interface INumberValidatorConfig   { message: string, isValid: (value: number) => boolean }
export interface IRangeValidatorConfig    { message: string, isValid: (value: number) => boolean }

// isValid::boolean
export interface ICheckboxValidatorConfig { message: string, isValid: (value: boolean) => boolean }

// isValid::IColor
export interface IColorValidatorConfig    { message: string, isValid: (value: IColor) => boolean }

// isValid::Date
export interface IDateValidatorConfig     { message: string, isValid: (value: Date) => boolean }
export interface IDateTimeValidatorConfig { message: string, isValid: (value: Date) => boolean }
export interface IMonthValidatorConfig    { message: string, isValid: (value: Date) => boolean }

// isValid::URL
export interface IURLValidatorConfig      { message: string, isValid: (value: URL) => boolean }

// isValid::IPhone
export interface IPhoneValidatorConfig    { message: string, isValid: (value: IPhone) => boolean }

// isValid::IWeek
export interface IWeekValidatorConfig     { message: string, isValid: (value: IWeek) => boolean }

// isValid::ITime
export interface ITimeValidatorConfig     { message: string, isValid: (value: ITime) => boolean }

// isValid::IFile
export interface IFileValidatorConfig     { message: string, isValid: (value: IFile | IFile[]) => boolean }



