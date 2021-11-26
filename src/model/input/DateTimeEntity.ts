import { dateFormatted, timeFormatted } from "../../utility/DateUtils";
import { InputType } from "../InputType";
import InputEntity from "./base/InputEntity";

class DateTimeEntity extends InputEntity<Date> {
  constructor() {
    super(InputType.DATETIME)
  }

  override convertToDatatableValue(value: any) {
    return `
      <div class="d-flex flex-column">
        <span>${dateFormatted(value)}</span>
        <span>${timeFormatted(value)}</span>
      </div>
    `
  }

  override convertToDisplayValue(value: Date | string | null): string | null {
    return this.convertToFormValue(value)?.toISOString().slice(0, 16) || null;
  }

  override convertToFormValue(value: Date | string | null): Date | null {
    if (!value) return super.getDefaultFormValue()
    let date: Date = value as Date;
    if (typeof value === "string") {
      date = new Date(value);
      if (!date) throw new Error("Datetime input has invalid format: " + value)
    }
    return date;
  }
}

export default new DateTimeEntity();