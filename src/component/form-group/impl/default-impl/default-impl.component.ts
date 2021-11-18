import { Component, OnInit } from '@angular/core';
import VIEW_PROVIDERS, { buildProviders } from '../../../../model/Provider';
import ReactiveInput from '../../../../model/ReactiveInput';

@Component({
  selector: 'ngxp-default-impl',
  templateUrl: './default-impl.component.html',
  styleUrls: ['./default-impl.component.scss'],
  providers: buildProviders(DefaultImplComponent),
  viewProviders: VIEW_PROVIDERS
})
export class DefaultImplComponent extends ReactiveInput implements OnInit {
  override defaultClass: string = 'form-control width-auto';

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}