import "reflect-metadata";
import { getMetadataKeyName } from "../../handler/FormHandler";
import { InputType } from "../../types/input-types";
import { SelectOption } from "../../types/select-types";

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
    generateMetadata(target, key, type, metadata);
  };
}

export function generateMetadata(
  target: any,
  key: string,
  type: InputType,
  metadata: any
): void {
  Reflect.defineMetadata(getMetadataKeyName(type), metadata, target, key);
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

export interface IInputTextMetadata {
  type: InputType.TEXT;
  metadata: IInputMaterialTextProps;
}

export interface IInputEmailMetadata {
  type: InputType.EMAIL;
  metadata: IInputMaterialEmailProps;
}

export interface IInputTextAreaMetadata {
  type: InputType.TEXTAREA;
  metadata: IInputMaterialTextAreaProps;
}

export interface IInputPasswordMetadata {
  type: InputType.PASSWORD;
  metadata: IInputMaterialPasswordProps;
}

export interface IInputCheckboxMetadata {
  type: InputType.CHECKBOX;
  metadata: IInputMaterialCheckboxProps;
}

export interface IInputNumberMetadata {
  type: InputType.NUMBER;
  metadata: IInputMaterialNumberProps;
}

export interface IInputDateMetadata {
  type: InputType.DATE;
  metadata: IInputMaterialDateProps;
}

export interface IInputChipsMetadata {
  type: InputType.CHIPS;
  metadata: IInputMaterialChipsProps;
}

export interface IInputSelectMetadata {
  type: InputType.SELECT;
  metadata: IInputMaterialSelectProps;
}

export interface IInputSearchMetadata {
  type: InputType.SEARCH;
  metadata: IInputMaterialSearchProps;
}

export interface IInputMultilanguageMetadata {
  type: InputType.MULTILANGUAGE;
  metadata: IInputMaterialMultilanguageProps;
}

export interface IInputColorMetadata {
  type: InputType.COLOR;
  metadata: IInputMaterialColorProps;
}

export interface IInputTelMetadata {
  type: InputType.TEL;
  metadata: IInputMaterialTelProps;
}

export interface IInputUrlMetadata {
  type: InputType.URL;
  metadata: IInputMaterialUrlProps;
}

/** Props types **/
type InputAppearanceType = "legacy" | "standard" | "fill" | "outline";
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
