import { InputType } from "../InputType";
import InputEntity from "./base/InputEntity";

const FORM_TYPE = 'string'
const DISPLAY_TYPE = 'string'
const INPUT_TYPE = InputType.INPUT_TEXT

class TextEntity extends InputEntity<string, string> {
  constructor() {
    super(FORM_TYPE, DISPLAY_TYPE, INPUT_TYPE)
  }

  override convertToDisplayValue(value: string | null): string {
    return typeof value === 'string' ? value : ''
  }

  override convertToFormValue(value: string | null): string {
    return this.convertToDisplayValue(value)
  }
}

export default new TextEntity();