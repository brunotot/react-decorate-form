import { Component, OnInit } from '@angular/core';
import VIEW_PROVIDERS, { buildProviders } from '../../../../model/Provider';
import ReactiveInput from '../../../../model/ReactiveInput';

@Component({
  selector: 'ngxp-checkbox-impl',
  templateUrl: './checkbox-impl.component.html',
  styleUrls: ['./checkbox-impl.component.scss'],
  providers: buildProviders(CheckboxImplComponent),
  viewProviders: VIEW_PROVIDERS
})
export class CheckboxImplComponent extends ReactiveInput implements OnInit {
  override defaultClass: string = 'form-check-input checkbox';
  override defaultValidClass: string = 'shadow-valid focus-valid';
  override defaultInvalidClass: string = 'shadow-invalid focus-invalid';
  override defaultBaseValidationClass: string = '';

  constructor() {
    super();
  }

  ngAfterViewInit() {
    this.writeValue(!!this.value); // throws ExpressionChangedAfterItHasBeenCheckedError
  }

  ngOnInit(): void {
  }
}
