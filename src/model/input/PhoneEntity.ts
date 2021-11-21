import { InputType } from "../InputType";
import { IPhone, splitToTwoValues } from "../ValidatorBuilder";
import InputEntity from "./base/InputEntity";

function stringToPhone(phoneString: string): IPhone {
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

class PhoneEntity extends InputEntity<IPhone> {
  constructor() {
    super(InputType.PHONE)
  }

  override getDefaultFormValue(): IPhone {
    return {
      areaCode: '',
      countryCode: '',
      globalNumber: '',
      lineNumber: '',
      localNumber: ''
    }
  }

  override convertToDisplayValue(value: IPhone | string | null): string | null {
    return this.convertToFormValue(value).globalNumber
  }

  override convertToFormValue(value: IPhone | string | null): IPhone {
    if (!value) return this.getDefaultFormValue();
    return typeof value === "string" 
      ? stringToPhone(value) 
      : value;
  }
}

export default new PhoneEntity();