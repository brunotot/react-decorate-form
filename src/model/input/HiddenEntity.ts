import { InputType } from "../InputType";
import InputEntity from "./base/InputEntity";

class HiddenEntity extends InputEntity<string> {
  constructor() {
    super(InputType.HIDDEN)
  }

  override convertToDatatableValue(value: any) {
    return `<span class="${isNaN(value) ? 'hidden' : 'number'}">${value}</span>`
  }

  override convertToDisplayValue(value: string | null): string {
    return typeof value === 'string' ? value : ''
  }

  override convertToFormValue(value: string | null): string {
    return this.convertToDisplayValue(value)
  }
}

export default new HiddenEntity();