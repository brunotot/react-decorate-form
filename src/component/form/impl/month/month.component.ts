import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import VIEW_PROVIDERS, { buildProviders } from '../../../../model/Provider';
import ReactiveInput from '../../../../model/ReactiveInput';

@Component({
  selector: 'rib-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss', './../../../../../assets/core/scss/style.scss'],
  providers: buildProviders(MonthComponent),
  viewProviders: VIEW_PROVIDERS,
  encapsulation: ViewEncapsulation.None
})
export class MonthComponent extends ReactiveInput implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}