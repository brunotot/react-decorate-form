import { HttpErrorResponse } from "@angular/common/http";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import {
  catchError,
  merge,
  startWith,
  switchMap,
  of as observableOf,
  map,
} from "rxjs";
import { messages } from "../constants/messages";
import { BaseDatatableHandler } from "./BaseDatatableHandler";

export class AsyncDatatableHandler extends BaseDatatableHandler {
  get dataSource(): any[] {
    return this._modelData;
  }

  configure(paginator: MatPaginator, sort: MatSort): void {
    this.paginator = paginator;
    this.sort = sort;
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(
      this.sort.sortChange,
      this.paginator.page,
      this.searchChange,
      this._refreshTableEmitter
    )
      .pipe(
        startWith({}),
        switchMap(() => {
          this._startLoader();
          return this._databaseService!.getAll({
            pageSize: this.paginator.pageSize,
            pageIndex: this.paginator.pageIndex,
            sortDirection: this.sort.direction,
            sortBy: this.sort.active,
            keywords: this.searchChange.value,
          }).pipe(catchError(() => observableOf(null)));
        }),
        map((data) => {
          this._stopLoader();
          if (data == null) {
            return [];
          }
          this.totalCount = data.totalCount;
          return data.items.map((item) => {
            return item instanceof this._formClass
              ? item
              : new this._formClass(item);
          });
        })
      )
      .subscribe((data) => (this._modelData = data));
  }

  applyChanges(): void {
    this._refreshTableEmitter.next();
  }

  create(element: any): void {
    !!this._databaseService!.create && this._startLoader();
    this._databaseService!.create?.(element).subscribe({
      next: () => {
        this.applyChanges();
        this._showSnack(messages.createSuccess);
      },
      error: (error: HttpErrorResponse) => {
        this._showSnack(error.message);
      },
      complete: () => {
        this._stopLoader();
      },
    });
  }

  update(element: any): void {
    !!this._databaseService!.update && this._startLoader();
    this._databaseService!.update?.(element).subscribe({
      next: () => {
        this.applyChanges();
        this._showSnack(messages.updateSuccess);
      },
      error: (error: HttpErrorResponse) => {
        this._showSnack(error.message);
      },
      complete: () => {
        this._stopLoader();
      },
    });
  }

  delete(element: any): void {
    !!this._databaseService!.delete && this._startLoader();
    this._databaseService!.delete?.(element).subscribe({
      next: () => {
        this.applyChanges();
        this._showSnack(messages.deleteSuccess);
      },
      error: (error: HttpErrorResponse) => {
        this._showSnack(error.message);
      },
      complete: () => {
        this._stopLoader();
      },
    });
  }
}
