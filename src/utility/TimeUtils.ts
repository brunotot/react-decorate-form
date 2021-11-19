import { ITime, splitToTwoValues } from "../model/ValidatorBuilder";

export function getDefaultTimeValue(): ITime {
  return {
    hh: 99,
    mm: 99,
    timeString: '99:99'
  }
}

export function getInitialTimeValue(value: string | ITime): ITime {
  if (!value) return getDefaultTimeValue();
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

export function timeToString(time: ITime): string {
  return time.timeString;
}