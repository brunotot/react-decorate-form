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
import { DialogUpdateComponent } from "../dialog/DialogUpdateComponent";
import {
  IInputChipsMetadata,
  IInputSearchMetadata,
} from "../../decorator/input/FormInputDecorator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DialogReadComponent } from "../dialog/DialogReadComponent";
import { IInputPropertiesMap } from "../../types/datatable-types";
import { DatabaseService } from "../../service/DatabaseService";
import { messages } from "../../constants/messages";
import { debounce, normalizeArray } from "../../utils/object-utils";
import { variables } from "../../constants/variables";
import { DialogCreateComponent } from "../dialog/DialogCreateComponent";
import { DialogDeleteComponent } from "../dialog/DialogDeleteComponent";
import {
  BaseDatatableHandler,
  IBaseDatatableHandler,
} from "../../handler/BaseDatatableHandler";
import { AsyncDatatableHandler } from "../../handler/AsyncDatatableHandler";
import { SyncDatatableHandler } from "../../handler/SyncDatatableHandler";

@Component({
  selector: "ia-datatable",
  templateUrl: "./DatatableComponent.html",
  styleUrls: ["./DatatableComponent.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DatatableComponent implements OnInit {
  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) {}

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() databaseService!: DatabaseService<any>;
  @Input() ajax: boolean = false;
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
  @Input() createDialogTitle: string = messages.createDialogTitle;
  @Input() deleteDialogTitle: string = messages.deleteDialogTitle;
  @Input() createButtonText: string = messages.createButtonText;
  @Input() searchOptions: IInputSearchMetadata | IInputChipsMetadata = {
    type: InputType.SEARCH,
    metadata: {
      label: messages.searchLabel,
      placeholder: messages.searchPlaceholder,
      matIconPrefix: variables.searchPrefixIcon,
    },
  };

  actionsColumnName: string = "_actions";
  datatableHandler!: BaseDatatableHandler;
  InputType = InputType;
  columnNames: string[] = [];
  columnNamesWithoutActions: string[] = [];

  get tableDataSource(): any[] | MatTableDataSource<any> {
    return this.datatableHandler.dataSource;
  }

  get actionsColumnLabel(): string {
    return messages.actionsColumnLabel;
  }
  get dataSource(): MatTableDataSource<any> {
    return this.datatableHandler.dataSource as MatTableDataSource<any>;
  }
  get noDataFoundMessage(): string {
    return messages.noDataFound;
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
  get inputPropertiesMap(): IInputPropertiesMap {
    return this.datatableHandler?.inputPropertiesMap || {};
  }
  get filterInputPropertiesMap(): IInputPropertiesMap {
    return Object.keys(this.inputPropertiesMap)
      .filter((key) => this.filters.includes(key))
      .reduce((curr, key) => {
        return Object.assign(curr, { [key]: this.inputPropertiesMap[key] });
      }, {});
  }

  ngOnInit(): void {
    let datatableHandlerConfig: IBaseDatatableHandler = {
      formClass: this.formClass,
      snackBar: this._snackBar,
      databaseService: this.databaseService,
      modelData: this.data,
    };

    if (this.ajax) {
      this.datatableHandler = new AsyncDatatableHandler(datatableHandlerConfig);
    } else {
      this.datatableHandler = new SyncDatatableHandler(datatableHandlerConfig);
    }

    this.columnNamesWithoutActions =
      this.datatableHandler.columnNamesWithoutActions;
    this.columnNames = [...this.columnNamesWithoutActions];
    if (this.useCellActions) {
      this.columnNames.push(this.actionsColumnName);
    }
  }

  ngAfterViewInit() {
    this.datatableHandler.configure(this.paginator, this.sort);
  }

  debouncedSearchChange = debounce((keywords: string[]) =>
    this.datatableHandler.search(keywords)
  );

  onSearchChange(keywords: string | string[]) {
    let keywordsArray = normalizeArray(keywords);
    if (this.searchOptions.type === InputType.SEARCH) {
      this.debouncedSearchChange(keywordsArray);
      return;
    }
    this.datatableHandler.search(keywordsArray);
  }

  openCreateDialog() {
    let formModel = new this.formClass({});
    this._openDialog({
      dialogComponent: DialogCreateComponent,
      formModel,
      dialogTitle: this.createDialogTitle,
      onCloseEnd: (result: any) => {
        result && result.model && this.datatableHandler.create(result.model);
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
        result && result.model && this.datatableHandler.update(result.model);
      },
    });
  }

  openDeleteDialog(formModel: any) {
    this._openDialog({
      dialogComponent: DialogDeleteComponent,
      formModel,
      dialogTitle: this.deleteDialogTitle,
      onCloseEnd: (result: any) => {
        result && result.model && this.datatableHandler.delete(result.model);
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
