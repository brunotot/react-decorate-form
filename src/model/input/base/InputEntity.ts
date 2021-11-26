import { splitIntoLines } from "../../../utility/StringUtils";
import { IRegex, isText, isTextDisplay, IVariableGroupValidator } from "../../../utility/InputEntityUtils";
import { IDisplayConfig } from "../../FormControlWrapper"
import { InputType } from "../../InputType"

const MSG_METHOD_NOT_IMPLEMENTED = 'Method not implemented'
const MAX_STRING_LENGTH_TO_FIT_ONE_LINE_IN_PX = 15;

export default class InputEntity<FORM_TYPE> {
  variableGroupValidators: IVariableGroupValidator[] = [];
  inputTypes: InputType[]

  constructor(inputTypes: InputType | InputType[] = [InputType.TEXT]) {
    this.inputTypes = Array.isArray(inputTypes) ? inputTypes : [inputTypes];
  }

  getVariableGroupValidators(regexInputs: IRegex[]) {
    let validatorsGroup = [];
    for (let i = 0; i < regexInputs.length; i++) {
      validatorsGroup.push({ value: '' , index: i, isValid: false });
    }
    return validatorsGroup;
  }

  formatInputsToUsedEntity(variableGroupValidators: IVariableGroupValidator[]): any {
    return null;
  }

  getRegexInputs(): IRegex[] {
    return [];
  }

  convertToDisplayValue(value: FORM_TYPE | string | null, displayConfig: IDisplayConfig | undefined = undefined): string | null {
    throw new Error(MSG_METHOD_NOT_IMPLEMENTED)
  }

  convertToFormValue(value: string | FORM_TYPE | null, displayConfig: IDisplayConfig | undefined = undefined): FORM_TYPE | null {
    throw new Error(MSG_METHOD_NOT_IMPLEMENTED)
  }

  convertToDatatableValue(value: string | FORM_TYPE | null, displayConfig: IDisplayConfig | undefined = undefined) {
    if (isTextDisplay(this.inputTypes)) {
      let text = String(value);
      let splittedLines = splitIntoLines(text, MAX_STRING_LENGTH_TO_FIT_ONE_LINE_IN_PX);
      if (splittedLines.length > 2) {
        let secondValue = splittedLines[1];
        secondValue = secondValue.length <= 12 ? secondValue.concat('...') : secondValue.substring(0, secondValue.length - 3).concat('...')
        text = splittedLines[0].concat(' ', secondValue);
      }
      return `<span title="${text}" class="text-display">${text}</span>`
    }
    throw new Error(`${MSG_METHOD_NOT_IMPLEMENTED} [${this.inputTypes.join(", ")}]`)
  }

  getDefaultFormValue(displayConfig: IDisplayConfig | undefined = undefined): FORM_TYPE | null {
    return isText(this.inputTypes) ? '' as any : null;
  }

  getDefaultDisplayValue(displayConfig: IDisplayConfig | undefined = undefined): string | null {
    return this.convertToDisplayValue(this.getDefaultFormValue(displayConfig), displayConfig)
  }

  normalizeValue(value: FORM_TYPE | null): FORM_TYPE | null {
    if (isText(this.inputTypes)) return (typeof value === 'string' ? value : '') as FORM_TYPE
    throw new Error(MSG_METHOD_NOT_IMPLEMENTED)
  }
}