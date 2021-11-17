import { Component, Input, OnInit } from '@angular/core';
import ReactiveInput from '../../../model/ReactiveInput';
import VIEW_PROVIDERS, { buildProviders } from '../../../model/Provider';

@Component({
  selector: 'ngxp-generic-input',
  templateUrl: './generic-input.component.html',
  styleUrls: ['./generic-input.component.scss'],
  providers: buildProviders(GenericInputComponent),
  viewProviders: VIEW_PROVIDERS
})
export class GenericInputComponent extends ReactiveInput implements OnInit {
  @Input() checkboxClass: string = 'form-check-input checkbox';

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
