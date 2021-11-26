import { InputType } from "../InputType";
import InputEntity from "./base/InputEntity";

class EmailEntity extends InputEntity<string> {
  constructor() {
    super(InputType.EMAIL)
  }

  override convertToDatatableValue(value: any) {
    return `<a class="number" href="mailto:${value}">${value}</a>`
  }

  override convertToDisplayValue(value: string | null): string {
    return typeof value === 'string' ? value : ''
  }

  override convertToFormValue(value: string | null): string {
    return this.convertToDisplayValue(value)
  }
}

export default new EmailEntity();