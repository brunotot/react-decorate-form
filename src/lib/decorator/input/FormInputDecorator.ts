import 'reflect-metadata';
import { getMetadataKeyName } from '../../handler/FormHandler';
import { InputType } from '../../types/input-types';
import { SelectOption } from '../../types/select-types';

export default function FormInput(
  inputMetadata:
    | IInputTextMetadata
    | IInputTextAreaMetadata
    | IInputPasswordMetadata
    | IInputCheckboxMetadata
    | IInputNumberMetadata
    | IInputDateMetadata
    | IInputSelectMetadata
    | IInputEmailMetadata
    | IInputChipsMetadata
    | IInputSearchMetadata
    | IInputMultilanguageMetadata
    | IInputColorMetadata
    | IInputTelMetadata
    | IInputUrlMetadata
) {
  let { type, metadata } = inputMetadata;
  return function (target: any, key: string) {
    let value: any = target[key];
    target[key] = value;
    Reflect.defineMetadata(getMetadataKeyName(type), metadata, target, key);
  };
}

/* Props */
interface IInputMaterialPropsNoSuffix {
  label?: string;
  placeholder?: string;
  hint?: string;
  appearance?: InputAppearanceType;
  width?: string;
  matIconPrefix?: string;
}

interface IInputMaterialProps extends IInputMaterialPropsNoSuffix {
  matIconSuffix?: string;
}

interface IInputTextMetadata {
  type: InputType.TEXT;
  metadata: IInputMaterialTextProps;
}

interface IInputEmailMetadata {
  type: InputType.EMAIL;
  metadata: IInputMaterialEmailProps;
}

interface IInputTextAreaMetadata {
  type: InputType.TEXTAREA;
  metadata: IInputMaterialTextAreaProps;
}

interface IInputPasswordMetadata {
  type: InputType.PASSWORD;
  metadata: IInputMaterialPasswordProps;
}

interface IInputCheckboxMetadata {
  type: InputType.CHECKBOX;
  metadata: IInputMaterialCheckboxProps;
}

interface IInputNumberMetadata {
  type: InputType.NUMBER;
  metadata: IInputMaterialNumberProps;
}

interface IInputDateMetadata {
  type: InputType.DATE;
  metadata: IInputMaterialDateProps;
}

interface IInputChipsMetadata {
  type: InputType.CHIPS;
  metadata: IInputMaterialChipsProps;
}

interface IInputSelectMetadata {
  type: InputType.SELECT;
  metadata: IInputMaterialSelectProps;
}

interface IInputSearchMetadata {
  type: InputType.SEARCH;
  metadata: IInputMaterialSearchProps;
}

interface IInputMultilanguageMetadata {
  type: InputType.MULTILANGUAGE;
  metadata: IInputMaterialMultilanguageProps;
}

interface IInputColorMetadata {
  type: InputType.COLOR;
  metadata: IInputMaterialColorProps;
}

interface IInputTelMetadata {
  type: InputType.TEL;
  metadata: IInputMaterialTelProps;
}

interface IInputUrlMetadata {
  type: InputType.URL;
  metadata: IInputMaterialUrlProps;
}

/** Props types **/
type InputAppearanceType = 'legacy' | 'standard' | 'fill' | 'outline';
export { InputAppearanceType };
export interface IInputMaterialTextProps extends IInputMaterialProps {}
export interface IInputMaterialEmailProps extends IInputMaterialProps {}
export interface IInputMaterialTextAreaProps extends IInputMaterialProps {}
export interface IInputMaterialPasswordProps extends IInputMaterialProps {}
export interface IInputMaterialNumberProps extends IInputMaterialProps {}
export interface IInputMaterialChipsProps extends IInputMaterialProps {}
export interface IInputMaterialSearchProps extends IInputMaterialProps {}
export interface IInputMaterialDateProps extends IInputMaterialPropsNoSuffix {}
export interface IInputMaterialEmailProps extends IInputMaterialProps {}
export interface IInputMaterialColorProps extends IInputMaterialProps {}
export interface IInputMaterialTelProps extends IInputMaterialProps {}
export interface IInputMaterialUrlProps extends IInputMaterialProps {}
export interface IInputMaterialSelectProps extends IInputMaterialProps {
  items: SelectOption[] | any[];
  multiple?: boolean;
}
export interface IInputMaterialCheckboxProps {
  label: string;
  hint?: string;
}
export interface IInputMaterialMultilanguageProps extends IInputMaterialProps {
  languages: string[];
  formClass: any;
}

// Return types

interface IMultilanguageObject {
  [key: string]: any;
}

type ICheckbox = boolean | undefined | null;
type IChips = string[] | undefined | null;
type IColor = string | undefined | null;
type IDate = string | Date | undefined | null;
type IEmail = string | undefined | null;
type INumber = number | undefined | null;
type IPassword = string | undefined | null;
type ISearch = string | undefined | null;
type IText = string | undefined | null;
type ISelect = string | number | string[] | number[] | undefined | null;
type ITel = string | undefined | null;
type ITextArea = string | undefined | null;
type IURL = string | undefined | null;
type IMultilanguage = IMultilanguageObject | undefined | null;

export { ICheckbox };
export { IChips };
export { IColor };
export { IDate };
export { IEmail };
export { INumber };
export { IPassword };
export { ISearch };
export { IText };
export { ISelect };
export { ITel };
export { ITextArea };
export { IURL };
export { IMultilanguage };
