import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { Subject } from "rxjs";
import { IInputMaterialSearchProps } from "../../decorator/input/FormInputDecorator";
import { BaseDatatableHandler } from "../../handler/BaseDatatableHandler";
import { IInputProperty } from "../../handler/FormHandler";
import { isValuePresent } from "../../utils/object-utils";

@Component({ template: "" })
export default class FilterBaseComponent implements OnInit {
  @Input() datatableHandler!: BaseDatatableHandler;
  @Input() inputProperty!: IInputProperty;
  @Input() resetSubject!: Subject<void>;
  _formGroup!: FormGroup;

  /* OVERRIDABLE */
  get formControlNames(): string[] {
    let arrayFiltered = this.nonFilteredPresentDataForPropertyName.map((o) =>
      String(o[this.propertyName])
    );
    return this.getUniqueSortedStrings(arrayFiltered);
  }
  filterMapper(value: any, formControlName: string): boolean {
    return String(value) === String(formControlName);
  }
  /* OVERRIDABLE */

  constructor() {}

  filterSearch: string = "";
  filterSearchProps: IInputMaterialSearchProps = {
    label: "Search filters",
    placeholder: "Start typing...",
  };
  onFilterSearchChange(filterSearch: string) {
    this.filterSearch = (filterSearch || "").toLowerCase();
  }

  get props(): any {
    return this.inputProperty.props;
  }

  get nonFilteredPresentDataForPropertyName(): any[] {
    let array = this.nonFilteredData;
    let arrayFiltered = array.filter((o) =>
      isValuePresent(o[this.propertyName])
    );
    return arrayFiltered;
  }

  get formGroup(): FormGroup {
    if (!this._formGroup) {
      this._formGroup = new FormGroup({});
    }

    let formControlNames: string[] = this.formControlNames;
    for (let formControlName of formControlNames) {
      if (!this._formGroup.contains(formControlName)) {
        this._formGroup.addControl(formControlName, new FormControl(false));
      }
    }

    let currentControlNames = Object.keys(this._formGroup.controls);
    for (let currentControlName of currentControlNames) {
      if (!formControlNames.includes(currentControlName)) {
        this._formGroup.removeControl(currentControlName);
      }
    }

    return this._formGroup;
  }

  get propertyName(): string {
    return this.inputProperty.propertyName as string;
  }

  get filteredData(): any[] {
    return (this.datatableHandler.dataSource as MatTableDataSource<any>)
      .filteredData;
  }

  get nonFilteredData(): any[] {
    return (this.datatableHandler.dataSource as MatTableDataSource<any>).data;
  }

  getUniqueSortedStrings(strings: string[]): string[] {
    let collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: "base",
    });
    return [...new Set(strings)].sort(collator.compare);
  }

  getFilteredCount(formControlName: string): number {
    return this.filteredData.filter((o) =>
      this.filterMapper(o[this.propertyName], String(formControlName))
    ).length;
  }

  getNonFilteredCount(formControlName: string): number {
    return this.nonFilteredData.filter((o) =>
      this.filterMapper(o[this.propertyName], String(formControlName))
    ).length;
  }

  getDisplayStyle(formControlName: string): object {
    return {
      display: formControlName.toLowerCase().includes(this.filterSearch)
        ? "inherit"
        : "none",
    };
  }

  ngOnInit(): void {
    this.formGroup.valueChanges.subscribe((formValue) => {
      let keys = Object.keys(formValue);
      let isEmpty = !keys.some((key) => formValue[key] === true);
      this.datatableHandler.setFilter(this.propertyName, (value: string) => {
        return (
          isEmpty ||
          keys
            .filter((key) => formValue[key] === true)
            .some((key) => this.filterMapper(value, key))
        );
      });
    });

    this.resetSubject.subscribe(() => {
      this.formGroup.reset(false);
    });
  }
}
