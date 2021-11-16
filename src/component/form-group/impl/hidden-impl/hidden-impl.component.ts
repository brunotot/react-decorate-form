import { Component, OnInit } from '@angular/core';
import VIEW_PROVIDERS, { buildProviders } from '../../../../model/Provider';
import ReactiveInput from '../../../../model/ReactiveInput';

@Component({
  selector: 'ngxp-hidden-impl',
  templateUrl: './hidden-impl.component.html',
  styleUrls: ['./hidden-impl.component.scss'],
  providers: buildProviders(HiddenImplComponent),
  viewProviders: VIEW_PROVIDERS
})
export class HiddenImplComponent extends ReactiveInput implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
