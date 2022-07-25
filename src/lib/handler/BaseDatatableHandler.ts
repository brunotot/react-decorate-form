import { EventEmitter } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { BehaviorSubject } from "rxjs";
import { messages } from "../constants/messages";
import { variables } from "../constants/variables";
import { DatabaseService } from "../service/DatabaseService";
import {
  DatatableFiltersMap,
  IInputPropertiesMap,
} from "../types/datatable-types";
import { InputType } from "../types/input-types";
import { isValuePresent } from "../utils/object-utils";
import FormHandler from "./FormHandler";

export interface IBaseDatatableHandler {
  modelData?: any[];
  databaseService?: DatabaseService<any>;
  snackBar: MatSnackBar;
  formClass: any;
  columnNames: string[];
}

export abstract class BaseDatatableHandler {
  isLoading: boolean;
  columnNamesWithoutActions: string[];
  columnNames: string[];
  inputPropertiesMap: IInputPropertiesMap;
  filters: DatatableFiltersMap;
  paginator!: MatPaginator;
  sort!: MatSort;
  totalCount: number;
  searchChange: BehaviorSubject<string[]>;

  protected _modelData: any[];
  protected _formClass: any;
  protected _dataSource: MatTableDataSource<any>;
  protected _refreshTableEmitter: EventEmitter<void>;
  protected _databaseService?: DatabaseService<any>;
  protected _snackBar: MatSnackBar;
  protected _tags: string[];

  constructor({
    modelData,
    snackBar,
    databaseService,
    formClass,
    columnNames,
  }: IBaseDatatableHandler) {
    this.columnNames = columnNames;
    this.searchChange = new BehaviorSubject<string[]>([]);
    this.totalCount = 0;
    this.inputPropertiesMap = {};
    this.columnNamesWithoutActions = [];
    this.isLoading = true;
    this._tags = [];
    this.filters = {};
    this._modelData = modelData || [];
    this._formClass = formClass;

    this._refreshTableEmitter = new EventEmitter<void>();
    this._databaseService = databaseService;
    this._dataSource = new MatTableDataSource<any>(this._modelData);
    this._snackBar = snackBar;

    let useAllColumnNames: boolean = this.columnNames.length === 0;
    let emptyForm = new this._formClass({});
    let formHandler = new FormHandler(emptyForm);
    for (let columnName of formHandler.propertyNames) {
      if (useAllColumnNames || this.columnNames.includes(columnName)) {
        if (!useAllColumnNames) {
          this.columnNames.push(columnName);
        }
        let inputProperty = formHandler.getInputPropertyByFieldName(columnName);
        if (!!inputProperty) {
          let inputType = inputProperty.inputType;
          if (InputType.PASSWORD !== inputType) {
            this.columnNamesWithoutActions.push(columnName);
            this.inputPropertiesMap[columnName] = inputProperty;
          }
        }
      }
    }
  }

  abstract get dataSource(): MatTableDataSource<any> | any[];
  abstract configure(paginator: MatPaginator, sort: MatSort): void;
  abstract applyChanges(): void;
  abstract create(element: any): void;
  abstract update(element: any): void;
  abstract delete(element: any): void;

  search(tags: string[]) {
    let tagsNormalized: any = Array.isArray(tags)
      ? tags
          .map((search) => this._normalizeSearch(search))
          .filter((search) => !!search)
      : [];
    this._tags = tagsNormalized;
    this.applyChanges();
  }

  setFilter(propertyName: string, filterConfig: (data: any) => boolean) {
    this.filters[propertyName] = filterConfig;
    this.applyChanges();
  }

  protected _startLoader(): void {
    this.isLoading = true;
  }

  protected _stopLoader(): void {
    this.isLoading = false;
  }

  protected _normalizeSearch(search: string) {
    return isValuePresent(search)
      ? String(search)
          .trim()
          .replace(/ +(?= )/g, "")
          .toLowerCase()
      : "";
  }

  protected _showSnack(message: string) {
    this._snackBar.open(message, messages.closeSnack, {
      duration: variables.snackDurationMs,
    });
  }
}
