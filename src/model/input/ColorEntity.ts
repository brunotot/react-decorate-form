import { Style } from "../../../src/model/Style";
import { hexToColor } from "../../utility/ColorUtils";
import { InputType } from "../InputType";
import { IColor } from "../ValidatorBuilder";
import InputEntity from "./base/InputEntity";

class ColorEntity extends InputEntity<IColor> {
  constructor() {
    super(InputType.COLOR)
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