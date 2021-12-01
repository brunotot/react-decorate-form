import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import VIEW_PROVIDERS, { buildProviders } from '../../../../model/Provider';
import ReactiveInput from '../../../../model/ReactiveInput';

@Component({
  selector: 'rib-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss', './../../../../../assets/core/scss/style.scss'],
  providers: buildProviders(SearchComponent),
  viewProviders: VIEW_PROVIDERS,
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent extends ReactiveInput implements OnInit {
  override defaultClass: string = 'form-control width-auto';

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}