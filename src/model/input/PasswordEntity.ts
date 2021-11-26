import { InputType } from "../InputType";
import InputEntity from "./base/InputEntity";

class PasswordEntity extends InputEntity<string> {
  constructor() {
    super(InputType.PASSWORD)
  }

  override convertToDatatableValueReadOnly(value: any) {
    return 'hidden';
  }

  override convertToDatatableValue(value: any) {
    return `<span class="no-data">${this.convertToDatatableValueReadOnly(value)}</span>`
  }

  override convertToDisplayValue(value: string | null): string {
    return typeof value === 'string' ? value : ''
  }

  override convertToFormValue(value: string | null): string {
    return this.convertToDisplayValue(value)
  }
}

export default new PasswordEntity();