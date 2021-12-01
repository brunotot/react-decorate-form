import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import VIEW_PROVIDERS, { buildProviders } from '../../../../model/Provider';
import ReactiveInput from '../../../../model/ReactiveInput';

@Component({
  selector: 'rib-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss', './../../../../../assets/core/scss/style.scss'],
  providers: buildProviders(CheckboxComponent),
  viewProviders: VIEW_PROVIDERS,
  encapsulation: ViewEncapsulation.None
})
export class CheckboxComponent extends ReactiveInput implements OnInit {
  override defaultClass: string = 'form-check-input checkbox';
  override defaultValidClass: string = 'shadow-valid focus-valid';
  override defaultInvalidClass: string = 'shadow-invalid focus-invalid';
  override defaultBaseValidationClass: string = '';

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
