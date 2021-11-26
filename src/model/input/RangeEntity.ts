import { IDisplayConfig } from "../FormControlWrapper";
import { InputType } from "../InputType";
import InputEntity from "./base/InputEntity";

class RangeEntity extends InputEntity<number> {
  constructor() {
    super(InputType.RANGE)
  }
  
  override convertToDatatableValue(value: any) {
    return `<span class="number">${Number(value)}</span>`
  }

  override getDefaultFormValue(displayConfig: IDisplayConfig) {
    return Math.round((displayConfig.max! + displayConfig.min!) / 2)
  }

  override convertToDisplayValue(value: number | null, displayConfig: IDisplayConfig): string {
    return String(this.convertToFormValue(value, displayConfig))
  }

  override convertToFormValue(value: number | null, displayConfig: IDisplayConfig): number {
    let min = displayConfig.min!;
    let max = displayConfig.max!;
    if (min >= max) throw new Error(`Min[${min}] is larger than max[${max}]`);
    return isNaN(value as any)
      ? this.getDefaultFormValue(displayConfig)
      : Number(value)
  }
}

export default new RangeEntity();