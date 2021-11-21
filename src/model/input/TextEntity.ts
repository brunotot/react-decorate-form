import { InputType } from "../InputType";
import InputEntity from "./base/InputEntity";

class TextEntity extends InputEntity<string> {
  constructor() {
    super([
      InputType.TEXT,
      InputType.TEXTAREA,
      InputType.HIDDEN,
      InputType.PASSWORD,
      InputType.SEARCH,
      InputType.EMAIL
    ])
  }

  override convertToDisplayValue(value: string | null): string {
    return typeof value === 'string' ? value : ''
  }

  override convertToFormValue(value: string | null): string {
    return this.convertToDisplayValue(value)
  }
}

export default new TextEntity();