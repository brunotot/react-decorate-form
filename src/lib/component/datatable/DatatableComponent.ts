import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { InputType } from "../../types/input-types";
import FormHandler from "../../handler/FormHandler";
import { DialogUpdateComponent } from "../dialog/DialogUpdateComponent";
import {
  IInputChipsMetadata,
  IInputSearchMetadata,
} from "../../decorator/input/FormInputDecorator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DialogReadComponent } from "../dialog/DialogReadComponent";
import DatatableHandler from "../../handler/DatatableHandler";
import { IInputPropertiesMap } from "../../types/datatable-types";
import { DatabaseService } from "../../service/DatabaseService";
import {
  catchError,
  map,
  merge,
  startWith,
  switchMap,
  of as observableOf,
  BehaviorSubject,
} from "rxjs";
import { messages } from "../../constants/messages";
import { debounce, normalizeArray } from "../../utils/object-utils";
import { variables } from "../../constants/variables";
import { DialogCreateComponent } from "../dialog/DialogCreateComponent";
import { DialogDeleteComponent } from "../dialog/DialogDeleteComponent";

@Component({
  selector: "ia-datatable",
  templateUrl: "./DatatableComponent.html",
  styleUrls: ["./DatatableComponent.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DatatableComponent implements OnInit {
  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) {}

  get actionsColumnLabel(): string {
    return messages.actionsColumnLabel;
  }

  @Input() createDialogTitle: string = messages.createDialogTitle;
  @Input() deleteDialogTitle: string = messages.deleteDialogTitle;
  @Input() createButtonText: string = messages.createButtonText;

  actionsColumnName: string = "_actions";
  datatableHandler!: DatatableHandler;
  InputType = InputType;
  inputPropertiesMap: IInputPropertiesMap = {};
  formHandler!: FormHandler;
  columnNames: string[] = [];
  columnNamesWithoutActions: string[] = [];

  get filterInputPropertiesMap(): IInputPropertiesMap {
    return Object.keys(this.inputPropertiesMap)
      .filter((key) => this.filters.includes(key))
      .reduce((curr, key) => {
        return Object.assign(curr, { [key]: this.inputPropertiesMap[key] });
      }, {});
  }

  get useFilters(): boolean {
    return this.filters.length > 0;
  }
  get useCreateAction(): boolean {
    return this.actions.includes("create");
  }
  get useReadAction(): boolean {
    return this.actions.includes("read");
  }
  get useUpdateAction(): boolean {
    return this.actions.includes("update");
  }
  get useDeleteAction(): boolean {
    return this.actions.includes("delete");
  }
  get useCellActions(): boolean {
    return this.useReadAction || this.useUpdateAction || this.useDeleteAction;
  }

  @Input() useSearch: boolean = true;
  @Input() actions: ("create" | "read" | "update" | "delete")[] = [];
  @Input() filters: string[] = [];

  @Input() actionCreateIcon: string = variables.actionCreateIcon;
  @Input() actionUpdateIcon: string = variables.actionUpdateIcon;
  @Input() actionDeleteIcon: string = variables.actionDeleteIcon;
  @Input() actionReadIcon: string = variables.actionReadIcon;

  @Input() sortOptions: string[] = [];
  @Input() pageSizeOptions: number[] = [];
  @Input() formClass: any;
  @Input() data: any[] = [];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  searchChange: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  @Input() searchOptions: IInputSearchMetadata | IInputChipsMetadata = {
    type: InputType.SEARCH,
    metadata: {
      label: messages.searchLabel,
      placeholder: messages.searchPlaceholder,
      matIconPrefix: variables.searchPrefixIcon,
    },
  };

  get dataSource(): MatTableDataSource<any> {
    return this.datatableHandler.dataSource;
  }

  get noDataFoundMessage(): string {
    return messages.noDataFound;
  }

  ngOnInit(): void {
    if (!this.databaseService) {
      this.isLoadingResults = false;
    }
    let emptyForm = new this.formClass({});
    this.formHandler = new FormHandler(emptyForm);
    for (let columnName of this.formHandler.propertyNames) {
      let inputProperty =
        this.formHandler.getInputPropertyByFieldName(columnName);
      if (!!inputProperty) {
        let inputType = inputProperty.inputType;
        if (InputType.PASSWORD !== inputType) {
          this.columnNamesWithoutActions.push(columnName);
          this.inputPropertiesMap[columnName] = inputProperty;
        }
      }
    }
    this.columnNames = [...this.columnNamesWithoutActions];
    if (this.useCellActions) {
      this.columnNames.push(this.actionsColumnName);
    }
    this.datatableHandler = new DatatableHandler(
      this.data,
      this.inputPropertiesMap,
      this._snackBar
    );
  }

  ngAfterViewInit() {
    this.datatableHandler.initAfterViewInit(this.paginator, this.sort);
    if (!!this.databaseService) {
      this._initAjaxConfig();
    }
  }

  /* Ajax */
  @Input() databaseService!: DatabaseService<any>;
  resultsLength = 0;
  isLoadingResults = true;
  private _initAjaxConfig() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page, this.searchChange)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.databaseService
            .getAll({
              pageSize: this.paginator.pageSize,
              pageIndex: this.paginator.pageIndex,
              sortDirection: this.sort.direction,
              sortBy: this.sort.active,
              keywords: this.searchChange.value,
            })
            .pipe(catchError(() => observableOf(null)));
        }),
        map((data) => {
          this.isLoadingResults = false;
          if (data === null) {
            return [];
          }
          this.resultsLength = data.totalCount;
          return data.items;
        })
      )
      .subscribe((data) => (this.data = data));
  }
  /* Ajax */

  debouncedSearchChange = debounce((keywords: string[]) =>
    this.searchChange.next(keywords)
  );

  onSearchChange(keywords: string | string[]) {
    let keywordsArray = normalizeArray(keywords);
    if (this.searchOptions.type === InputType.SEARCH) {
      this.debouncedSearchChange(keywordsArray);
      return;
    }
    this.searchChange.next(keywordsArray);
  }

  openCreateDialog() {
    let formModel = new this.formClass({});
    this._openDialog({
      dialogComponent: DialogCreateComponent,
      formModel,
      dialogTitle: this.createDialogTitle,
      onCloseEnd: (result: any) => {
        this.datatableHandler.create(result);
      },
    });
  }

  openReadDialog(formModel: any) {
    this._openDialog({
      dialogComponent: DialogReadComponent,
      formModel: formModel,
    });
  }

  openUpdateDialog(formModel: any) {
    this._openDialog({
      dialogComponent: DialogUpdateComponent,
      formModel,
      onCloseEnd: (result: any) => {
        this.datatableHandler.update(result);
      },
    });
  }

  openDeleteDialog(formModel: any) {
    this._openDialog({
      dialogComponent: DialogDeleteComponent,
      formModel,
      dialogTitle: this.deleteDialogTitle,
      onCloseEnd: (result: any) => {
        this.datatableHandler.delete(result);
      },
    });
  }

  private _openDialog<T>(opts: {
    dialogComponent: any;
    dialogTitle?: string;
    formModel: any;
    onCloseEnd?: (result: T) => void;
  }) {
    let { dialogComponent, dialogTitle, formModel, onCloseEnd } = opts;
    const dialogRef = this.dialog.open(dialogComponent, {
      width: variables.actionsDialogWidth,
      data: {
        model: formModel,
        title: dialogTitle,
      },
    });
    if (onCloseEnd) {
      this._handleDialogClose(dialogRef, onCloseEnd);
    }
  }

  private _handleDialogClose<T>(
    dialogRef: MatDialogRef<any>,
    onCloseEnd: (result: T) => void
  ) {
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      onCloseEnd(result);
    });
  }
}
