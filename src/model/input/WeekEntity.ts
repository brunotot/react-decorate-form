import { weekFormatted } from "../../utility/DateUtils";
import { IRegex } from "../../utility/InputEntityUtils";
import { InputType, PatternInputType } from "../InputType";
import { IWeek, splitToTwoValues } from "../ValidatorBuilder";
import InputEntity from "./base/InputEntity";

class WeekEntity extends InputEntity<IWeek> {
  constructor() {
    super(InputType.WEEK);
    this.variableGroupValidators = this.getVariableGroupValidators(this.getRegexInputs());
  }

  override convertToDatatableValueReadOnly(value: any) {
    return weekFormatted(this.convertToFormValue(value));
  }

  override convertToDatatableValue(value: any) {
    return `<span class="number">${weekFormatted(this.convertToFormValue(value))}</span>`
  }

  override formatInputsToUsedEntity(): IWeek | null {
    let yearInputValue = this.variableGroupValidators[0].value;
    let weekInputValue = this.variableGroupValidators[1].value;
    if (isNaN(yearInputValue as any) || isNaN(weekInputValue as any)) return null;
    return {
      week: Number(weekInputValue),
      weekString: `${yearInputValue.padStart(4, '0')}-W${weekInputValue.padStart(2, '0')}`,
      year: Number(yearInputValue)
    }
  }

  override getRegexInputs(): IRegex[] {
    return [
      {label: 'Year', placeholder: '####', pattern: '^([0-9]{4})$', inputType: PatternInputType.NUMBER, validationFailedMessage: 'Wrong year input', exampleValue: '2021', key: 'year'},
      {label: 'Week', placeholder: '##', pattern: '^((5[0-3]{1})|([0-4]{1}[0-9]{1})|[1-9]{1})$', inputType: PatternInputType.NUMBER, validationFailedMessage: 'Wrong week input', exampleValue: '40', key: 'week'}
    ]
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

export default new WeekEntity();