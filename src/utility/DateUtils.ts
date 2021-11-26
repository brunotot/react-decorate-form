import { ITime, IWeek } from "../model/ValidatorBuilder";

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function dateFormatted(item: any): string {
  let date = item as Date;
  let dd = `${date.getDate()}`.padStart(2, '0');
  let mm = `${date.getMonth() + 1}`.padStart(2, '0');
  let yyyy = `${date.getFullYear()}`;
  return `${dd}.${mm}.${yyyy}`
}

export function timeFormatted(item: any): string {
  let mins: string = '';
  let hours: string = '';
  if (item instanceof Date) {
    let date = item as Date;
    mins = `${date.getMinutes()}`.padStart(2, '0');
    hours = `${date.getHours()}`.padStart(2, '0');
  } else {
    let time = item as ITime;
    mins = `${time.mm}`.padStart(2, '0');
    hours = `${time.hh}`.padStart(2, '0');
  }
  return `${hours}:${mins}h`
}

export function monthFormatted(item: any): string {
  let date = item as Date;
  let year = `${date.getFullYear()}`;
  let month = MONTH_NAMES[date.getMonth()];
  return `${month} ${year}`;
}

export function weekFormatted(item: any): string {
  let weekInstance = item as IWeek;
  let year = `${weekInstance.year}`;
  let week = `${weekInstance.week}`;
  let weekLastDigit = weekInstance.week % 10;
  let suffix = 'th';
  if (weekLastDigit === 1) suffix = 'st';
  else if (weekLastDigit === 2) suffix = 'nd';
  else if (weekLastDigit === 3) suffix = 'rd';
  return `${week}${suffix} of ${year}`;
}