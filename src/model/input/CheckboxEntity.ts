import { InputType } from "../InputType";
import InputEntity from "./base/InputEntity";

class CheckboxEntity extends InputEntity<boolean> {
  constructor() {
    super(InputType.CHECKBOX)
  }

  override convertToDisplayValue(value: any): string {
    return String(!!value)
  }

  override convertToFormValue(value: any): boolean {
    return !!value
  }
}

export default new CheckboxEntity();