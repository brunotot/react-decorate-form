import { Component } from '@angular/core';
import FilterBaseComponent from '../FilterBaseComponent';
import { TEMPLATE_DATATABLE_FILTER_COLOR } from '../../../utils/template-utils';

@Component({
  selector: 'ia-filter-color',
  template: TEMPLATE_DATATABLE_FILTER_COLOR,
})
export class FilterColorComponent extends FilterBaseComponent {
  constructor() {
    super();
  }
}
