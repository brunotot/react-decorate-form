import { Observable, of as observableOf } from "rxjs";
import { PaginationOffset } from "../types/datatable-types";

export interface DatatableResponse<T> {
  items: T[];
  totalCount: number;
}

export interface DatabaseService<T> {
  create?(T: any): Observable<T>;
  update?(T: any): Observable<T>;
  delete?(T: any): Observable<void>;
}

export abstract class DatabaseService<T> {
  constructor() {}

  abstract getAll(
    paginationOffset: PaginationOffset
  ): Observable<DatatableResponse<T>>;

  create?(element: T): Observable<T> {
    return observableOf(element);
  }

  update?(element: T): Observable<T> {
    return observableOf(element);
  }

  delete?(element: T): Observable<void> {
    return observableOf();
  }
}
