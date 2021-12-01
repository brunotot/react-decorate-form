import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import VIEW_PROVIDERS, { buildProviders } from '../../../model/Provider';
import ReactiveInput from '../../../model/ReactiveInput';

@Component({
  selector: 'rib-base-form-input-row',
  templateUrl: './base-form-input-row.component.html',
  styleUrls: ['./base-form-input-row.component.scss', './../../../../assets/core/scss/style.scss'],
  providers: buildProviders(BaseFormInputRowComponent),
  viewProviders: VIEW_PROVIDERS,
  encapsulation: ViewEncapsulation.None
})
export class BaseFormInputRowComponent extends ReactiveInput implements OnInit {
  @Input() inputWrapperClass: string = 'col-sm-12 col-md-9';
  @Input() rowWrapperClass: string = 'row my-2';
  @Input() labelClass: string = 'col-form-label col-sm-12 col-md-3 pt-2';
  @Input() errorMessages!: string[];

  constructor() { 
    super()
  }

  ngOnInit(): void {
  }
}
