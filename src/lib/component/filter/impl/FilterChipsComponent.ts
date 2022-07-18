import { Component } from '@angular/core';
import FilterBaseComponent from '../FilterBaseComponent';
import { isValuePresent } from '../../../utils/object-utils';
import { TEMPLATE_DATATABLE_FILTER_NORMAL } from '../../../utils/template-utils';

@Component({
  selector: 'ia-filter-chips',
  template: TEMPLATE_DATATABLE_FILTER_NORMAL,
})
export class FilterChipsComponent extends FilterBaseComponent {
  constructor() {
    super();
  }

  override get formControlNames(): string[] {
    let valuesFiltered = super.nonFilteredPresentDataForPropertyName;
    let arrays = valuesFiltered.map((o) => o[super.propertyName]);
    let merged = [].concat.apply([], arrays);
    return super.getUniqueSortedStrings(merged);
  }

  override filterMapper(
    value: undefined | string[],
    formControlName: string
  ): boolean {
    let selectionNormalized = isValuePresent(value)
      ? Array.isArray(value)
        ? value
        : [value]
      : [];
    return selectionNormalized.some((text) => text === formControlName);
  }
}
