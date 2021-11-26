import { InputType } from "../InputType";
import InputEntity from "./base/InputEntity";

class CheckboxEntity extends InputEntity<boolean> {
  constructor() {
    super(InputType.CHECKBOX)
  }

  override convertToDatatableValue(value: any) {
    return `<span class="fa ${!!value ? 'fa-checkmark' : 'fa-times'}"></span>`
  }

  override convertToDisplayValue(value: any): string {
    return String(!!value)
  }

  override convertToFormValue(value: any): boolean {
    return !!value
  }
}

export default new CheckboxEntity();