import { getOwnPropertyNames } from "../handler/FormHandler";
import { getEntityIdVariable } from "./decorator-utils";

export function debounce(this: any, func: Function, timeout = 500) {
  let timer: any;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

export function normalizeArray<T>(data: T | T[]): T[] {
  let dataArray: T[] = isValuePresent(data)
    ? Array.isArray(data)
      ? data
      : [data]
    : [];
  return dataArray;
}

export function isValuePresent(value: any) {
  let typeofValue = typeof value;
  return (
    value != null &&
    (typeofValue === "boolean" ||
      typeofValue === "number" ||
      typeofValue === "object" ||
      value.length > 0)
  );
}

export function populateObject(model: any, value: any): void {
  let entityIdVariable: string = getEntityIdVariable(model);
  getOwnPropertyNames(model).forEach((key) => {
    if (key !== entityIdVariable) {
      model[key] = value?.[key];
    }
  });
}
