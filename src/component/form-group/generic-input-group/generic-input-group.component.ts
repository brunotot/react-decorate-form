import { Component, Input, OnInit } from '@angular/core';
import ReactiveInput from '../../../model/ReactiveInput';
import VIEW_PROVIDERS, { buildProviders } from '../../../model/Provider';

@Component({
  selector: 'ngxp-generic-input-group',
  templateUrl: './generic-input-group.component.html',
  styleUrls: ['./generic-input-group.component.scss'],
  providers: buildProviders(GenericInputGroupComponent),
  viewProviders: VIEW_PROVIDERS
})
export class GenericInputGroupComponent extends ReactiveInput implements OnInit {
  @Input() inputGroupClass: string = 'input-group justify-content-between';
  @Input() errorMessages: string[] = [];
  passwordShown: boolean = false;

  onPasswordShowClick() {
    this.passwordShown = !this.passwordShown;
    this.displayConfig.inputType = this.displayConfig.inputType === this.InputType.INPUT_PASSWORD 
      ? (this.passwordShown ? this.InputType.INPUT_TEXT : this.InputType.INPUT_PASSWORD) 
      : this.displayConfig.inputType;
  }

  constructor() { 
    super() 
  }

  ngOnInit(): void {
  }
}
