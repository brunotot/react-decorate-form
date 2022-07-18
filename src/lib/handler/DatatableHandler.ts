import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { getSearchableString } from '../setup/search-filtering-setup';
import { isValuePresent } from '../utils/object-utils';
import { messages } from '../constants/messages';
import {
  DatatableFiltersMap,
  IInputPropertiesMap,
} from '../types/datatable-types';

export default class DatatableHandler {
  private static INDEX_VAR_NAME = '_idx';
  private static SNACK_DURATION_MS: number = 3000;

  inputPropertiesMap: IInputPropertiesMap;
  dataSource: MatTableDataSource<any>;

  private filters: DatatableFiltersMap = {};
  private _snackBar: MatSnackBar;
  private _tags: string[] = [];

  private get _tableData(): any[] {
    return this.dataSource.data;
  }

  private get _paginator(): MatPaginator {
    return this.dataSource.paginator;
  }

  constructor(
    modelData: any[],
    inputPropertiesMap: any,
    snackBar: MatSnackBar
  ) {
    for (let i = 0; i < modelData.length; i++) {
      modelData[i][DatatableHandler.INDEX_VAR_NAME] = i;
    }
    this.inputPropertiesMap = inputPropertiesMap;
    this.dataSource = new MatTableDataSource<any>(modelData);
    this._snackBar = snackBar;
  }

  initAfterViewInit(paginator: MatPaginator, sort: MatSort): void {
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;

    this.dataSource.filterPredicate = (data: any, filter: any) => {
      return this.compliesSearch(data, filter) && this.compliesFilter(data);
    };
  }

  create(object: any) {
    this._tableData.push(object);
    this.renderTable();
    this.showSnack(messages.createSuccess);
    this.navigateLastPage();
  }

  update(variableIndex: number, object: any) {
    let index = this.findIndex(variableIndex);
    this._tableData[index] = object;
    this.renderTable();
    this.showSnack(messages.updateSuccess);
  }

  delete(variableIndex: number) {
    let index = this.findIndex(variableIndex);
    this._tableData.splice(index, 1);
    this.renderTable();
    this.showSnack(messages.deleteSuccess);
  }

  search(tags: string[]) {
    let tagsNormalized: any = Array.isArray(tags)
      ? tags
          .map((search) => this.normalizeSearch(search))
          .filter((search) => !!search)
      : [];
    this._tags = tagsNormalized;
    this.triggerFilter();
  }

  setFilter(propertyName: string, filterConfig: (data: any) => boolean) {
    this.filters[propertyName] = filterConfig;
    this.triggerFilter();
  }

  private triggerFilter(): void {
    this.dataSource.filter = this._tags as any;
  }

  private compliesFilter(data: any): boolean {
    let filterPropertyNames = Object.keys(this.filters);
    return (
      filterPropertyNames.length === 0 ||
      filterPropertyNames.every((propertyName) => {
        let filterFn = this.filters[propertyName];
        return filterFn(data[propertyName]);
      })
    );
  }

  private compliesSearch(data: any, filter: any): boolean {
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
        let searchableStringNormalized = this.normalizeSearch(searchableString);
        return searchableStringNormalized.includes(filterSearch);
      });
    });
  }

  private normalizeSearch(search: string) {
    return isValuePresent(search)
      ? String(search)
          .trim()
          .replace(/ +(?= )/g, '')
          .toLowerCase()
      : '';
  }

  private findIndex(variableIndex: number) {
    return this._tableData.findIndex(
      (item) => item[DatatableHandler.INDEX_VAR_NAME] === variableIndex
    );
  }

  private navigateLastPage(): void {
    setTimeout(() => this._paginator.lastPage());
  }

  private renderTable(): void {
    this.dataSource._updateChangeSubscription();
  }

  private showSnack(message: string) {
    this._snackBar.open(message, messages.closeSnack, {
      duration: DatatableHandler.SNACK_DURATION_MS,
    });
  }
}
