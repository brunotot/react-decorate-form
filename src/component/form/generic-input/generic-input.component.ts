import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import ReactiveInput from '../../../model/ReactiveInput';
import VIEW_PROVIDERS, { buildProviders } from '../../../model/Provider';

@Component({
  selector: 'rib-generic-input',
  templateUrl: './generic-input.component.html',
  styleUrls: ['./generic-input.component.scss', './../../../../assets/core/scss/style.scss'],
  providers: buildProviders(GenericInputComponent),
  viewProviders: VIEW_PROVIDERS,
  encapsulation: ViewEncapsulation.None
})
export class GenericInputComponent extends ReactiveInput implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
