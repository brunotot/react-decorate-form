import { Component } from '@angular/core';
import FilterBaseComponent from '../FilterBaseComponent';
import { SelectOption } from '../../../types/select-types';
import { isValuePresent } from '../../../utils/object-utils';
import { TEMPLATE_DATATABLE_FILTER_NORMAL } from '../../../utils/template-utils';

@Component({
  selector: 'ia-filter-select',
  template: TEMPLATE_DATATABLE_FILTER_NORMAL,
})
export class FilterSelectComponent extends FilterBaseComponent {
  constructor() {
    super();
  }

  override get formControlNames(): string[] {
    let valuesFiltered = super.nonFilteredPresentDataForPropertyName;
    let arrays = valuesFiltered.map((o) => o[super.propertyName]);
    let merged = [].concat.apply([], arrays);
    let mergedUnique = super.getUniqueSortedStrings(merged);
    let items: SelectOption[] = super.props.items;
    let mergedUniqueLables = mergedUnique
      .filter((key) => items.some((item) => item.id === key))
      .map((key) => items.find((item) => item.id === key).text);
    return super.getUniqueSortedStrings(mergedUniqueLables);
  }

  override filterMapper(
    value: undefined | string | string[],
    formControlName: string
  ): boolean {
    let selectionNormalized = isValuePresent(value)
      ? Array.isArray(value)
        ? value
        : [value]
      : [];
    let items: SelectOption[] = super.props.items;
    let result = selectionNormalized.some((id) =>
      items.some(
        (option) => option.id === id && option.text === formControlName
      )
    );
    return result;
  }
}
