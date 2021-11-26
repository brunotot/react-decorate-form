import { timeFormatted } from "../../utility/DateUtils";
import { InputType } from "../InputType";
import { ITime, splitToTwoValues } from "../ValidatorBuilder";
import InputEntity from "./base/InputEntity";

class TimeEntity extends InputEntity<ITime> {
  constructor() {
    super(InputType.TIME)
  }

  override convertToDatatableValueReadOnly(value: any) {
    return timeFormatted(this.convertToFormValue(value));
  }

  override convertToDatatableValue(value: any) {
    return `<span>${timeFormatted(this.convertToFormValue(value))}</span>`
  }

  override convertToDisplayValue(value: ITime | string | null): string | null {
    return this.convertToFormValue(value)?.timeString || null
  }

  override convertToFormValue(value: ITime | string | null): ITime | null {
    if (!value) return this.getDefaultFormValue();
    if (typeof value === 'string') {
      let [hh, mm] = splitToTwoValues(":", value);
      return {
        hh: Number(hh),
        mm: Number(mm),
        timeString: value
      }
    }
    return value as ITime;
  }
}

export default new TimeEntity();