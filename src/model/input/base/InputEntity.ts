import { InputType } from "../../InputType"

const MSG_METHOD_NOT_IMPLEMENTED = 'Method not implemented'

export default class InputEntity<FORM_TYPE, DISPLAY_TYPE> {
  formTypeDiscriminator: string
  displayTypeDiscriminator: string
  inputType: InputType

  constructor(
    formTypeDiscriminator: string, 
    displayTypeDiscriminator: string,
    inputType: InputType
  ) {
    this.formTypeDiscriminator = formTypeDiscriminator
    this.displayTypeDiscriminator = displayTypeDiscriminator
    this.inputType = inputType;
  }

  instanceOfFormType(object: any): object is FORM_TYPE {
    let discriminator = 'discriminator' in object ? object.discriminator : '';
    return typeof object === this.formTypeDiscriminator || discriminator === this.formTypeDiscriminator
  }

  instanceOfDisplayType(object: any): object is DISPLAY_TYPE {
    let discriminator = 'discriminator' in object ? object.discriminator : '';
    return typeof object === this.displayTypeDiscriminator || discriminator === this.displayTypeDiscriminator
  }

  convertToDisplayValue(value: FORM_TYPE | null): DISPLAY_TYPE | null {
    throw new Error(MSG_METHOD_NOT_IMPLEMENTED)
  }

  convertToFormValue(value: DISPLAY_TYPE | null): FORM_TYPE | null {
    throw new Error(MSG_METHOD_NOT_IMPLEMENTED)
  }

  getDefaultValue(): string | null {
    return this.formTypeDiscriminator === 'string' ? '' : null;
  }

  getDisplayValue(value: FORM_TYPE | DISPLAY_TYPE | null): DISPLAY_TYPE | string | null {
    if (value === undefined || value === null) return this.getDefaultValue()
    if (this.instanceOfDisplayType(value)) return value as DISPLAY_TYPE
    return this.convertToDisplayValue(value as FORM_TYPE)
  }

  getFormValue(value: FORM_TYPE | DISPLAY_TYPE | null): FORM_TYPE | string | null {
    if (value === undefined || value === null) return this.getDefaultValue()
    if (this.instanceOfFormType(value)) return value as FORM_TYPE
    return this.convertToFormValue(value as DISPLAY_TYPE)
  }

  normalizeValue(value: FORM_TYPE | null): FORM_TYPE | null {
    if (this.formTypeDiscriminator === 'string') return (typeof value === 'string' ? value : '') as FORM_TYPE
    throw new Error(MSG_METHOD_NOT_IMPLEMENTED)
  }
}