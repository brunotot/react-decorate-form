import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import VIEW_PROVIDERS, { buildProviders } from '../../../../model/Provider';
import ReactiveInput from '../../../../model/ReactiveInput';

@Component({
  selector: 'rib-datetime',
  templateUrl: './datetime.component.html',
  styleUrls: ['./datetime.component.scss', './../../../../../assets/core/scss/style.scss'],
  providers: buildProviders(DateTimeComponent),
  viewProviders: VIEW_PROVIDERS,
  encapsulation: ViewEncapsulation.None
})
export class DateTimeComponent extends ReactiveInput implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}