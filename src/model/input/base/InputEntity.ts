import { isText } from "../../../utility/InputEntityUtils";
import { IDisplayConfig } from "../../FormControlWrapper"
import { InputType } from "../../InputType"

const MSG_METHOD_NOT_IMPLEMENTED = 'Method not implemented'

export default class InputEntity<FORM_TYPE> {
  inputTypes: InputType[]

  constructor(inputTypes: InputType | InputType[] = [InputType.TEXT]) {
    this.inputTypes = Array.isArray(inputTypes) ? inputTypes : [inputTypes];
  }

  instanceOfFormType(object: any): object is FORM_TYPE {
    for (let inputType of this.inputTypes) {
      if (inputType === InputType.TIME) return "hh" in object
      else if (inputType === InputType.DATE) return object instanceof Date
      else if (inputType === InputType.DATETIME) return object instanceof Date
      else if (inputType === InputType.MONTH) return object instanceof Date
      else if (inputType === InputType.COLOR) return "hex" in object
    } 
    return typeof object === 'string'
  }

  instanceOfDisplayType(object: any): object is string {
    for (let inputType of this.inputTypes) {

    }
    return typeof object === 'string'
  }

  convertToDisplayValue(value: FORM_TYPE | string | null, displayConfig: IDisplayConfig | undefined = undefined): string | null {
    throw new Error(MSG_METHOD_NOT_IMPLEMENTED)
  }

  convertToFormValue(value: string | FORM_TYPE | null, displayConfig: IDisplayConfig | undefined = undefined): FORM_TYPE | null {
    throw new Error(MSG_METHOD_NOT_IMPLEMENTED)
  }

  getDefaultFormValue(displayConfig: IDisplayConfig | undefined = undefined): FORM_TYPE | null {
    return isText(this.inputTypes) ? '' as any : null;
  }

  getDefaultDisplayValue(displayConfig: IDisplayConfig | undefined = undefined): string | null {
    return this.convertToDisplayValue(this.getDefaultFormValue(displayConfig), displayConfig)
  }

  getDisplayValue(value: FORM_TYPE | string | null, displayConfig: IDisplayConfig | undefined = undefined): string | null {
    if (value === undefined || value === null) return this.getDefaultDisplayValue(displayConfig)
    if (this.instanceOfDisplayType(value)) return value as string
    return this.convertToDisplayValue(value as FORM_TYPE, displayConfig)
  }

  getFormValue(value: FORM_TYPE | string | null, displayConfig: IDisplayConfig | undefined = undefined): FORM_TYPE | string | null {
    if (value === undefined || value === null) return this.getDefaultFormValue(displayConfig)
    if (this.instanceOfFormType(value)) return value as FORM_TYPE
    return this.convertToFormValue(value as string, displayConfig)
  }

  normalizeValue(value: FORM_TYPE | null): FORM_TYPE | null {
    if (isText(this.inputTypes)) return (typeof value === 'string' ? value : '') as FORM_TYPE
    throw new Error(MSG_METHOD_NOT_IMPLEMENTED)
  }
}