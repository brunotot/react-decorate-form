import { InputType } from "../InputType";
import InputEntity from "./base/InputEntity";

class NumberEntity extends InputEntity<number> {
  constructor() {
    super(InputType.NUMBER)
  }

  override convertToDatatableValue(value: any) {
    return `<span class="number">${Number(value)}</span>`
  }

  override convertToDisplayValue(value: number | null): string | null {
    if (isNaN(value as any) || value === null || value === undefined) return null;
    return String(value)
  }

  override convertToFormValue(value: number | null): number | null {
    if (isNaN(value as any) || value === null || value === undefined) return this.getDefaultFormValue();
    return Number(value)
  }
}

export default new NumberEntity();