import { InputType } from "../InputType";
import { IWeek, splitToTwoValues } from "../ValidatorBuilder";
import InputEntity from "./base/InputEntity";

class PhoneEntity extends InputEntity<IWeek> {
  constructor() {
    super(InputType.WEEK)
  }

  override convertToDisplayValue(value: IWeek | string | null): string | null {
    return this.convertToFormValue(value)?.weekString || null
  }

  override convertToFormValue(value: IWeek | string | null): IWeek | null {
    if (!value) return this.getDefaultFormValue()
    if (typeof value !== 'string') return value as IWeek;
    let [year, week] = splitToTwoValues("-W", value);
    return {
      year: Number(year),
      week: Number(week),
      weekString: value
    }
  }
}

export default new PhoneEntity();