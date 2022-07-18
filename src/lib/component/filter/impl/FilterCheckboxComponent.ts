import { Component } from '@angular/core';
import FilterBaseComponent from '../FilterBaseComponent';
import { TEMPLATE_DATATABLE_FILTER_CHECKBOX } from '../../../utils/template-utils';

@Component({
  selector: 'ia-filter-checkbox',
  template: TEMPLATE_DATATABLE_FILTER_CHECKBOX,
})
export class FilterCheckboxComponent extends FilterBaseComponent {
  constructor() {
    super();
  }
}
