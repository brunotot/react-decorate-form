import { IDisplayConfig } from "../FormControlWrapper";
import { InputType } from "../InputType";
import { IFile } from "../ValidatorBuilder";
import InputEntity from "./base/InputEntity";

class FileEntity extends InputEntity<IFile | IFile[]> {
  constructor() {
    super(InputType.FILE)
  }

  override getDefaultFormValue(displayConfig: IDisplayConfig) {
    return !!displayConfig.multiple ? [] : null;
  }

  override convertToDisplayValue(value: IFile | IFile[] | string | null): string {
    return value as any;
  }

  override convertToFormValue(value: IFile | IFile[] | null): IFile | IFile[] | null {
    return value as any
  }
}

export default new FileEntity();