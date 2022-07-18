import { IInputProperty } from '../handler/FormHandler';

interface DatatableFiltersMap {
  [key: string]: (value: any) => boolean;
}

interface IInputPropertiesMap {
  [key: string]: IInputProperty;
}

export { DatatableFiltersMap, IInputPropertiesMap };
