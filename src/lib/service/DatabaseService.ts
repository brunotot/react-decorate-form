import { Observable } from "rxjs";
import { PaginationOffset } from "../types/datatable-types";

export interface DatabaseApi<T> {
  items: T[];
  totalCount: number;
}

export interface DatabaseService<T> {
  create?(T: any): T;
  update?(T: any): T;
  delete?(T: any): boolean;
}

export abstract class DatabaseService<T> {
  constructor() {}

  abstract getAll(
    paginationOffset: PaginationOffset
  ): Observable<DatabaseApi<T>>;

  create?(obj: T): T {
    return obj;
  }

  update?(obj: T): T {
    return obj;
  }

  delete?(obj: T): boolean {
    return true;
  }
}
