import { InputType } from "../InputType";
import InputEntity from "./base/InputEntity";

class PhoneEntity extends InputEntity<string> {
  constructor() {
    super(InputType.PHONE)
  }

  override convertToDatatableValue(value: any) {
    value = this.convertToFormValue(value)
    return `<a class="number" href="tel:${value}">${value}</a>`
  }


  override getDefaultFormValue(): string {
    return ''
  }

  override convertToDisplayValue(value: string | null): string {
    return this.convertToFormValue(value)
  }

  override convertToFormValue(value: string | null): string {
    return value ? value : this.getDefaultFormValue()
  }
}

export default new PhoneEntity();