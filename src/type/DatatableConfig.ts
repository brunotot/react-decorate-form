import { IForm } from "../form/base/BaseForm";

export interface ISave {
  created: IForm[],
  deleted: IForm[],
  updated: IForm[]
}

export interface IActionPermissions {
  create?: boolean,
  read?: boolean,
  update?: boolean,
  delete?: boolean
}

export interface IActionPermissionsNonNull {
  create: boolean,
  read: boolean,
  update: boolean,
  delete: boolean
}

export const DEFAULT_ACTION_PERMISSIONS: IActionPermissionsNonNull = {
  create: true,
  read: true,
  update: true,
  delete: true
}