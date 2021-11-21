import { Component, OnInit } from '@angular/core';
import { InputType } from '../../../../model/InputType';
import VIEW_PROVIDERS, { buildProviders } from '../../../../model/Provider';
import ReactiveInput from '../../../../model/ReactiveInput';

@Component({
  selector: 'ngxp-password-impl',
  templateUrl: './password-impl.component.html',
  styleUrls: ['./password-impl.component.scss'],
  providers: buildProviders(PasswordImplComponent),
  viewProviders: VIEW_PROVIDERS
})
export class PasswordImplComponent extends ReactiveInput implements OnInit {
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