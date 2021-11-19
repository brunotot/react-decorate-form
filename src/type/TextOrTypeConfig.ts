import { ITime, IWeek } from "../model/ValidatorBuilder";
import { getInitialColorValue } from "../utility/ColorUtils";
import { getInitialTimeValue } from "../utility/TimeUtils";
import { getInitialWeekValue } from "../utility/WeekUtils";

export interface ITextOrType {
  getValueForForm: (value: any) => any,
  getValueForDisplay: (value: any) => string | null
}

const TEXT_OR_TYPE_WEEK: ITextOrType = {
  getValueForForm: (value: string) => !!value ? getInitialWeekValue(value) : null,
  getValueForDisplay: (value: IWeek) => !!value ? (value.weekString === '0000-W00' ? null : value.weekString) : null
}

const TEXT_OR_TYPE_DATE: ITextOrType = {
  getValueForForm: (value: string) => !!value ? new Date(value) : null,
  getValueForDisplay: (value: Date) => !!value ? value.toISOString().slice(0, 10) : null
}

const TEXT_OR_TYPE_DATETIME: ITextOrType = {
  getValueForForm: (value: string) => !!value ? new Date(value) : null,
  getValueForDisplay: (value: Date) => !!value ? value.toISOString().slice(0, 16) : null
}

const TEXT_OR_TYPE_MONTH: ITextOrType = {
  getValueForForm: (value: string) => !!value ? new Date(value) : null,
  getValueForDisplay: (value: Date) => !!value ? value.toISOString().slice(0, 7) : null
}

const TEXT_OR_TYPE_TIME: ITextOrType = {
  getValueForForm: (value: string) => !!value ? getInitialTimeValue(value) : null,
  getValueForDisplay: (value: ITime) => !!value ? (value.timeString === '99:99' ? null : value.timeString) : null
}

export { TEXT_OR_TYPE_DATETIME };
export { TEXT_OR_TYPE_MONTH };
export { TEXT_OR_TYPE_WEEK };
export { TEXT_OR_TYPE_TIME };
export { TEXT_OR_TYPE_DATE };