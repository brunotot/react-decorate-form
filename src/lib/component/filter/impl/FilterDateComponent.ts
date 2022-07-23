import { Component } from "@angular/core";
import FilterBaseComponent from "../FilterBaseComponent";
import { TEMPLATE_DATATABLE_FILTER_NORMAL } from "../../../utils/template-utils";
import { formatDate } from "../../../utils/date-utils";

@Component({
  selector: "ia-filter-date",
  template: TEMPLATE_DATATABLE_FILTER_NORMAL,
})
export class FilterDateComponent extends FilterBaseComponent {
  constructor() {
    super();
  }

  override get formControlNames(): string[] {
    let valuesFiltered = super.nonFilteredPresentDataForPropertyName;
    let dates = valuesFiltered.map(
      (item) => new Date(item[super.propertyName])
    );
    let datesSorted = dates.sort();
    let datesMappedToString = datesSorted.map((date: Date) => formatDate(date));
    return super.getUniqueSortedStrings(datesMappedToString);
  }

  override filterMapper(
    value: Date | undefined,
    formControlName: string
  ): boolean {
    if (value == null) {
      return false;
    }
    let formControlDate: Date = new Date(formControlName);

    let formControlDateYear = formControlDate.getFullYear();
    let formControlDateMonth = formControlDate.getMonth();
    let formControlDateDay = formControlDate.getDate();

    let valueDateYear = value.getFullYear();
    let valueDateMonth = value.getMonth();
    let valueDateDay = value.getDate();

    return (
      formControlDateYear === valueDateYear &&
      formControlDateMonth === valueDateMonth &&
      formControlDateDay === valueDateDay
    );
  }
}
