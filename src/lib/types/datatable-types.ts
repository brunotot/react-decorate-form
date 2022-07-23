import { SortDirection } from "@angular/material/sort";
import { IInputProperty } from "../handler/FormHandler";

interface DatatableFiltersMap {
  [key: string]: (value: any) => boolean;
}

interface IInputPropertiesMap {
  [key: string]: IInputProperty;
}

interface PaginationOffset {
  pageIndex: number;
  pageSize: number;
  sortBy: string;
  sortDirection: SortDirection;
  keywords: string[];
}

export { DatatableFiltersMap, IInputPropertiesMap, PaginationOffset };
