import { Component, Input, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng-select2';
import ReactiveInput from '../../../model/ReactiveInput';
import { InputType } from '../../../model/InputType';
import VIEW_PROVIDERS, { buildProviders } from '../../../model/Provider';

@Component({
  selector: 'ngxp-generic-input',
  templateUrl: './generic-input.component.html',
  styleUrls: ['./generic-input.component.scss'],
  providers: buildProviders(GenericInputComponent),
  viewProviders: VIEW_PROVIDERS
})
export class GenericInputComponent extends ReactiveInput implements OnInit {
  InputType = InputType;
  @Input() class: string = 'form-control width-auto';
  @Input() checkboxClass: string = 'form-check-input checkbox';
  @Input() classAppend: string = '';
  @Input() type!: InputType;
  @Input() placeholder: string = "Enter value";
  @Input() value!: any;
  @Input() isSubmitPressed: boolean = false;
  @Input() select2Data: Select2OptionData[] = [];

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
