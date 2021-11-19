import { IPhone, splitToTwoValues } from "../model/ValidatorBuilder";

export function getDefaultPhoneValue(): IPhone {
  return {
    areaCode: '',
    countryCode: '',
    globalNumber: '',
    lineNumber: '',
    localNumber: ''
  }
}

export function getInitialPhoneValue(value: any): IPhone {
  if (!value) return getDefaultPhoneValue();
  return typeof value === "string" 
    ? stringToPhone(value) 
    : value;
}

export function stringToPhone(phoneString: string): IPhone {
  let areaCodeSplit = splitToTwoValues("/", phoneString);
  let areaCode = areaCodeSplit[0].substring(1);
  let [countryCode, lineNumber] = splitToTwoValues("-", areaCodeSplit[1]);
  return {
    areaCode,
    countryCode,
    globalNumber: phoneString,
    lineNumber,
    localNumber: `0${countryCode}${lineNumber}`
  }
}

export function phoneToString(phone: IPhone): string {
  return phone.globalNumber
}