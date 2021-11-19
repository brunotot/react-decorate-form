import { Component, OnInit } from '@angular/core';
import ReactiveInput from '../../../model/ReactiveInput';
import VIEW_PROVIDERS, { buildProviders } from '../../../model/Provider';
import { InputType } from '../../../model/InputType';
import { TEXT_OR_TYPE_DATE, TEXT_OR_TYPE_DATETIME, TEXT_OR_TYPE_MONTH, TEXT_OR_TYPE_TIME, TEXT_OR_TYPE_WEEK } from '../../../type/TextOrTypeConfig';

@Component({
  selector: 'ngxp-generic-input',
  templateUrl: './generic-input.component.html',
  styleUrls: ['./generic-input.component.scss'],
  providers: buildProviders(GenericInputComponent),
  viewProviders: VIEW_PROVIDERS
})
export class GenericInputComponent extends ReactiveInput implements OnInit {
  get textOrTypeConfig() {
    switch (this.displayConfig.inputType) {
      case InputType.INPUT_WEEK: return TEXT_OR_TYPE_WEEK
      case InputType.INPUT_TIME: return TEXT_OR_TYPE_TIME
      case InputType.INPUT_DATETIME: return TEXT_OR_TYPE_DATETIME
      case InputType.INPUT_DATE: return TEXT_OR_TYPE_DATE
      default: return TEXT_OR_TYPE_MONTH
    }
  }

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
