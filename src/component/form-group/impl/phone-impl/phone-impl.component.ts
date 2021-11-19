import { Component, OnInit } from '@angular/core';
import { getDefaultPhoneValue, getInitialPhoneValue } from '../../../../utility/PhoneUtils';
import VIEW_PROVIDERS, { buildProviders } from '../../../../model/Provider';
import ReactiveInput from '../../../../model/ReactiveInput';

@Component({
  selector: 'ngxp-phone-impl',
  templateUrl: './phone-impl.component.html',
  styleUrls: ['./phone-impl.component.scss'],
  providers: buildProviders(PhoneImplComponent),
  viewProviders: VIEW_PROVIDERS
})
export class PhoneImplComponent extends ReactiveInput implements OnInit {
  override defaultClass: string = 'form-control width-auto';
  getDefaultPhoneValue = getDefaultPhoneValue;

  onPhoneChange($event: any) {
    let value: string = $event.target.value ? $event.target.value : '';
    let phone = getInitialPhoneValue(value);
    this.writeValue(phone);
  }

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}