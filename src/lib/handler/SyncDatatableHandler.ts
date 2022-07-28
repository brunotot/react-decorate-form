import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { getEntityIdVariable } from "./../utils/decorator-utils";
import { messages } from "../constants/messages";
import { getSearchableString } from "../setup/search-filtering-setup";
import { BaseDatatableHandler } from "./BaseDatatableHandler";

export class SyncDatatableHandler extends BaseDatatableHandler {
  get dataSource(): MatTableDataSource<any> {
    return this._dataSource;
  }

  get data(): any[] {
    return this.dataSource.data;
  }

  configure(paginator: MatPaginator, sort: MatSort): void {
    this.paginator = paginator;
    this.sort = sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data: any, filter: any) => {
      return this._compliesSearch(data, filter) && this._compliesFilter(data);
    };
  }

  applyChanges(): void {
    this.dataSource.filter = this._tags as any;
    this.dataSource._updateChangeSubscription();
  }

  create(element: any): void {
    this.data.push(element);
    this.syncChangeEmitter.next(this.data);
    this.applyChanges();
    this._showSnack(messages.createSuccess);
    this._navigateLastPage();
  }

  update(element: any): void {
    let index = this._findIndex(element);
    this.data[index] = element;
    this.syncChangeEmitter.next(this.data);
    this.applyChanges();
    this._showSnack(messages.updateSuccess);
  }

  delete(element: any): void {
    let index = this._findIndex(element);
    this.data.splice(index, 1);
    this.syncChangeEmitter.next(this.data);
    this.applyChanges();
    this._showSnack(messages.deleteSuccess);
  }

  private _findIndex(element: any): number {
    let entityIdVariable = getEntityIdVariable(element);
    return this.data.findIndex(
      (dataElement) =>
        dataElement[entityIdVariable] === element[entityIdVariable]
    );
  }

  private _compliesFilter(data: any): boolean {
    let filterPropertyNames = Object.keys(this.filters);
    return (
      filterPropertyNames.length === 0 ||
      filterPropertyNames.every((propertyName) => {
        let filterFn = this.filters[propertyName];
        return filterFn(data[propertyName]);
      })
    );
  }

  private _compliesSearch(data: any, filter: any): boolean {
    let dataKeys: string[] = Object.keys(data);
    let filterArray = filter as Array<string>;
    return filterArray.every((filterSearch) => {
      return dataKeys.some((columnName) => {
        let value = data[columnName];
        if (!(columnName in this.inputPropertiesMap)) {
          return false;
        }
        let type = this.inputPropertiesMap[columnName].inputType;
        let props = this.inputPropertiesMap[columnName].props;
        let searchableString = getSearchableString(type, value, props);
        let searchableStringNormalized =
          this._normalizeSearch(searchableString);
        return searchableStringNormalized.includes(filterSearch);
      });
    });
  }

  private _navigateLastPage(): void {
    setTimeout(() => this.paginator.lastPage());
  }
}
