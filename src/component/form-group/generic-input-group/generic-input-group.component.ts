import { Component, Input, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng-select2';
import ReactiveInput from '../../../model/ReactiveInput';
import { InputType } from '../../../model/InputType';
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
  @Input() class: string = 'form-control width-auto';
  @Input() classAppend: string = '';
  @Input() type!: InputType;
  @Input() validationClass: string = '';
  @Input() errorMessages: string[] = [];
  @Input() placeholder: string = "Enter value";
  @Input() value!: any;
  @Input() isSubmitPressed: boolean = false;
  @Input() select2Data: Select2OptionData[] = [];
  InputType = InputType;
  passwordShown: boolean = false;

  constructor() { 
    super() 
  }

  ngOnInit(): void {
  }

}
