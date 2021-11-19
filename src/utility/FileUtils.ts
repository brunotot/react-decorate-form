import { IFile } from "../model/ValidatorBuilder";

export function getInitialFileValue(multiple: boolean): IFile[] | null {
  return multiple ? [] : null;
}