import { InputType } from "../InputType";
import InputEntity from "./base/InputEntity";

class DateMonthEntity extends InputEntity<Date> {
  constructor() {
    super(InputType.MONTH)
  }

  override convertToDisplayValue(value: Date | string | null): string | null {
    return this.convertToFormValue(value)?.toISOString().slice(0, 7) || null;
  }

  override convertToFormValue(value: Date | string | null): Date | null {
    if (!value) return super.getDefaultFormValue()
    let date: Date = value as Date;
    if (typeof value === "string") {
      date = new Date(value);
      if (!date) throw new Error("Date month input has invalid format: " + value)
    }
    return date;
  }
}

export default new DateMonthEntity();