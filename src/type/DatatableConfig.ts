import { IForm } from "../form/base/BaseForm";

export interface ISave {
  created: IForm[],
  deleted: IForm[],
  updated: IForm[]
}