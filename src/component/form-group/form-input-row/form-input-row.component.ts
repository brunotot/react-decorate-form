import { Component, Input, OnInit } from '@angular/core';
import VIEW_PROVIDERS, { buildProviders } from '../../../model/Provider';
import ReactiveInput from '../../../model/ReactiveInput';

@Component({
  selector: 'ngxp-form-input-row',
  templateUrl: './form-input-row.component.html',
  styleUrls: ['./form-input-row.component.scss'],
  providers: buildProviders(FormInputRowComponent),
  viewProviders: VIEW_PROVIDERS
})
export class FormInputRowComponent extends ReactiveInput implements OnInit {
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
