import { IDisplayConfig } from "../FormControlWrapper";
import { InputType } from "../InputType";
import InputEntity from "./base/InputEntity";

class SelectEntity extends InputEntity<string | string[]> {
  constructor() {
    super(InputType.SELECT)
  }

  override getDefaultFormValue(displayConfig: IDisplayConfig) {
    return !!displayConfig.select2Config?.multiple ? [] : "";
  }

  override convertToDisplayValue(value: string | string[], displayConfig: IDisplayConfig): string {
    if (!value) return this.getDefaultFormValue(displayConfig) as any
    return value as any;
  }

  override convertToFormValue(value: string | string[] | null, displayConfig: IDisplayConfig): string | string[] {
    if (!value) return this.getDefaultFormValue(displayConfig)
    return value;
  }
}

export default new SelectEntity();