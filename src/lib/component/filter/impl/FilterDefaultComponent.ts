import { Component } from '@angular/core';
import FilterBaseComponent from '../FilterBaseComponent';
import { TEMPLATE_DATATABLE_FILTER_NORMAL } from '../../../utils/template-utils';

@Component({
  selector: 'ia-filter-default',
  template: TEMPLATE_DATATABLE_FILTER_NORMAL,
})
export class FilterDefaultComponent extends FilterBaseComponent {
  constructor() {
    super();
  }
}
