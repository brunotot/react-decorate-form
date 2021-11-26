import { dateFormatted } from "../../utility/DateUtils";
import { InputType } from "../InputType";
import InputEntity from "./base/InputEntity";

class DateEntity extends InputEntity<Date> {
  constructor() {
    super(InputType.DATE)
  }

  override convertToDatatableValueReadOnly(value: any) {
    return dateFormatted(value);
  }

  override convertToDatatableValue(value: any) {
    return `<span>${this.convertToDatatableValueReadOnly(value)}</span>`
  }

  override convertToDisplayValue(value: Date | string | null): string | null {
    return this.convertToFormValue(value)?.toISOString().slice(0, 10) || null;
  }

  override convertToFormValue(value: Date | string | null): Date | null {
    if (!value) return super.getDefaultFormValue()
    let date: Date = value as Date;
    if (typeof value === "string") {
      date = new Date(value);
      if (!date) throw new Error("Date input has invalid format: " + value)
    }
    return date;
  }
}

export default new DateEntity();