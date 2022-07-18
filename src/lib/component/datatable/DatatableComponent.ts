import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InputType } from '../../types/input-types';
import FormHandler from '../../handler/FormHandler';
import { DialogUpdateComponent } from '../dialog/DialogUpdateComponent';
import { IInputMaterialChipsProps } from '../../decorator/input/FormInputDecorator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogReadComponent } from '../dialog/DialogReadComponent';
import DatatableHandler from '../../handler/DatatableHandler';
import { IInputPropertiesMap } from '../../types/datatable-types';

@Component({
  selector: 'ia-datatable',
  templateUrl: './DatatableComponent.html',
  styleUrls: ['./DatatableComponent.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DatatableComponent implements OnInit {
  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) {}

  datatableHandler: DatatableHandler;
  InputType = InputType;
  inputPropertiesMap: IInputPropertiesMap = {};
  formHandler!: FormHandler;
  columnNames: string[] = [];
  columnNamesWithoutActions: string[] = [];
  @Input() formClass: any;
  @Input() data: any[] = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchProps: IInputMaterialChipsProps = {
    label: 'Search',
    placeholder: 'Start typing...',
    matIconPrefix: 'search',
  };
  get dataSource(): MatTableDataSource<any> {
    return this.datatableHandler.dataSource;
  }

  ngOnInit(): void {
    let classModel = this.data[0] || {};
    this.formHandler = new FormHandler(classModel);
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
    this.columnNames = [...this.columnNamesWithoutActions, 'actions'];
    this.datatableHandler = new DatatableHandler(
      this.data,
      this.inputPropertiesMap,
      this._snackBar
    );
  }

  ngAfterViewInit() {
    this.datatableHandler.initAfterViewInit(this.paginator, this.sort);
  }

  onSearchChange(tags: string[]) {
    this.datatableHandler.search(tags);
  }

  openReadDialog(formModel: any) {
    this.dialog.open(DialogReadComponent, {
      width: '90%',
      data: {
        model: formModel,
      },
    });
  }

  openUpdateDialog(formModel: any, variableIndex?: number): void {
    const dialogRef = this.dialog.open(DialogUpdateComponent, {
      width: '90%',
      data: {
        model: formModel,
        index: typeof variableIndex === 'number' ? variableIndex : -1,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      let { model, index } = result;
      if (index === -1) {
        this.datatableHandler.create(model);
      } else {
        this.datatableHandler.update(index, model);
      }
    });
  }

  onRead(idx: number) {
    let realIndex = this.getRealIndex(idx);
    let formModel = this.data[realIndex];
    this.openReadDialog(formModel);
  }

  onUpdate(variableIndex: number, element: any) {
    this.openUpdateDialog(element, variableIndex);
  }

  onCreate() {
    this.openUpdateDialog(new this.formClass({}));
  }

  onDelete(i: number) {
    this.datatableHandler.delete(i);
  }

  getRealIndex(index: number): number {
    if (!this.paginator) {
      return -1;
    }
    return this.paginator.pageIndex == 0
      ? index
      : index + this.paginator.pageIndex * this.paginator.pageSize;
  }
}
