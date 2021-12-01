import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { InputType } from '../../../../model/InputType';
import VIEW_PROVIDERS, { buildProviders } from '../../../../model/Provider';
import ReactiveInput from '../../../../model/ReactiveInput';

@Component({
  selector: 'rib-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss', './../../../../../assets/core/scss/style.scss'],
  providers: buildProviders(PasswordComponent),
  viewProviders: VIEW_PROVIDERS,
  encapsulation: ViewEncapsulation.None
})
export class PasswordComponent extends ReactiveInput implements OnInit {
  override defaultClass: string = 'form-control width-auto';

  passwordInputType: InputType = InputType.PASSWORD;
  passwordShown: boolean = false;

  onPasswordShowClick() {
    this.passwordShown = !this.passwordShown;
    this.passwordInputType = this.passwordShown ? this.InputType.TEXT : this.InputType.PASSWORD;
  }

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}