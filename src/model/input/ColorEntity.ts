import { Style } from "../../../src/model/Style";
import { hexToColor, RGBToHex, RGBToHSL } from "../../utility/ColorUtils";
import { IRegex } from "../../utility/InputEntityUtils";
import { InputType, PatternInputType } from "../InputType";
import { IColor, IRGB } from "../ValidatorBuilder";
import InputEntity from "./base/InputEntity";

const regex1to255 = '^(([0-9]{1,2}$)|(1[0-9]{2}$)|(2[0-4]{1}[0-9]{1}$)|(25[0-5]{1}$))$'

class ColorEntity extends InputEntity<IColor> {
  constructor() {
    super(InputType.COLOR);
    this.variableGroupValidators = this.getVariableGroupValidators(this.getRegexInputs());
  }

  override convertToDatatableValueReadOnly(value: any) {
    return this.convertToFormValue(value).hex;
  }

  override convertToDatatableValue(value: any) {
    value = this.convertToFormValue(value);
    return `
      <div class="dt-color-wrapper">
        <span class="dt-color-hex">${value.hex}</span>
        <div class="dt-color" title="${value.hex}" style="background-color: ${value.hex}"></div>
      </div>
    `
  }

  override formatInputsToUsedEntity(): IColor | null {
    let redInputValue = this.variableGroupValidators[0].value;
    let greenInputValue = this.variableGroupValidators[1].value;
    let blueInputValue = this.variableGroupValidators[2].value;
    if (isNaN(redInputValue as any) || isNaN(greenInputValue as any) || isNaN(blueInputValue as any)) return null;
    let rgb: IRGB = {
      red: Number(redInputValue),
      green: Number(greenInputValue),
      blue: Number(blueInputValue)
    }
    return {
      hex: RGBToHex(rgb),
      rgb: rgb,
      hsl: RGBToHSL(rgb)
    }
  }

  override getRegexInputs(): IRegex[] {
    return [
      {label: 'Red', placeholder: '###', pattern: regex1to255, inputType: PatternInputType.NUMBER, validationFailedMessage: 'Wrong red input', exampleValue: '40', key: 'red'},
      {label: 'Green', placeholder: '###', pattern: regex1to255, inputType: PatternInputType.NUMBER, validationFailedMessage: 'Wrong green input', exampleValue: '40', key: 'green'},
      {label: 'Blue', placeholder: '###', pattern: regex1to255, inputType: PatternInputType.NUMBER, validationFailedMessage: 'Wrong blue input', exampleValue: '40', key: 'blue'}
    ]
  }

  override getDefaultDisplayValue(): string {
    return Style.COLOR_BLACK
  }

  override getDefaultFormValue(): IColor {
    return hexToColor(this.getDefaultDisplayValue())
  }

  override convertToDisplayValue(value: IColor | string | null): string | null {
    return this.convertToFormValue(value).hex;
  }

  override convertToFormValue(value: IColor | string | null): IColor {
    if (!value) return this.getDefaultFormValue()
    return typeof value === 'string' ? hexToColor(value) : value as IColor
  }
}

export default new ColorEntity();