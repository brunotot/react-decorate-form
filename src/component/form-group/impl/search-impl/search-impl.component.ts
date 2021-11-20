import { Component, OnInit } from '@angular/core';
import VIEW_PROVIDERS, { buildProviders } from '../../../../model/Provider';
import ReactiveInput from '../../../../model/ReactiveInput';

@Component({
  selector: 'ngxp-search-impl',
  templateUrl: './search-impl.component.html',
  styleUrls: ['./search-impl.component.scss'],
  providers: buildProviders(SearchImplComponent),
  viewProviders: VIEW_PROVIDERS
})
export class SearchImplComponent extends ReactiveInput implements OnInit {
  override defaultClass: string = 'form-control width-auto';

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}