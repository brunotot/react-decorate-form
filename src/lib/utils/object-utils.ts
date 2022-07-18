import { getOwnPropertyNames } from '../handler/FormHandler';

export function isValuePresent(value: any) {
  let typeofValue = typeof value;
  return (
    value != null &&
    (typeofValue === 'boolean' ||
      typeofValue === 'number' ||
      typeofValue === 'object' ||
      value.length > 0)
  );
}

export function populateObject(model: any, value: any): void {
  getOwnPropertyNames(model).forEach((key) => (model[key] = value[key]));
}
