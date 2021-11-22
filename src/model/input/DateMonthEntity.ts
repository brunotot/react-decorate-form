import { IRegex, IVariableGroupValidator } from "../../utility/InputEntityUtils";
import { InputType, PatternInputType } from "../InputType";
import InputEntity from "./base/InputEntity";

class DateMonthEntity extends InputEntity<Date> {
  constructor() {
    super(InputType.MONTH)
    this.variableGroupValidators = this.getVariableGroupValidators(this.getRegexInputs());
  }

  override formatInputsToUsedEntity(): Date | null {
    let yearInputValue = this.variableGroupValidators[0].value;
    let monthInputValue = this.variableGroupValidators[1].value;
    let date = new Date(`${yearInputValue}-${monthInputValue}`);
    if (isNaN(date.getMonth())) return null;
    return date;
  }

  override getRegexInputs(): IRegex[] {
    return [
      {label: 'Year', placeholder: '####', pattern: '^([0-9]{4})$', inputType: PatternInputType.NUMBER, validationFailedMessage: 'Wrong year input', exampleValue: '2021', key: 'year'},
      {label: 'Month', placeholder: '##', pattern: '^((1[0-2]{1})|([1-9]{1}$))$', inputType: PatternInputType.NUMBER, validationFailedMessage: 'Wrong month input', exampleValue: '10', key: 'month'}
    ]
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