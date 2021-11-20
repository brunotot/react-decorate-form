import { Component, OnInit } from '@angular/core';
import VIEW_PROVIDERS, { buildProviders } from '../../../../model/Provider';
import ReactiveInput from '../../../../model/ReactiveInput';

@Component({
  selector: 'ngxp-url-impl',
  templateUrl: './url-impl.component.html',
  styleUrls: ['./url-impl.component.scss'],
  providers: buildProviders(UrlImplComponent),
  viewProviders: VIEW_PROVIDERS
})
export class UrlImplComponent extends ReactiveInput implements OnInit {
  override defaultClass: string = 'form-control width-auto';

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}