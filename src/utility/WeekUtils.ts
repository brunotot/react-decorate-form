import { IWeek, splitToTwoValues } from "../model/ValidatorBuilder";

export function getDefaultWeekValue(): IWeek {
  return {
    week: 0,
    year: 0,
    weekString: '0000-W00'
  }
}

export function getInitialWeekValue(value: string | IWeek): IWeek {
  if (!value) return getDefaultWeekValue()
  if (typeof value !== 'string') return value as IWeek;
  let [year, week] = splitToTwoValues("-W", value);
  return {
    year: Number(year),
    week: Number(week),
    weekString: value
  }
}

export function weekToString(week: IWeek): string {
  return week.weekString;
}