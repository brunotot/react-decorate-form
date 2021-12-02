import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import VIEW_PROVIDERS, { buildProviders } from '../../../../model/Provider';
import ReactiveInput from '../../../../model/ReactiveInput';

@Component({
  selector: 'rib-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss', './../../../../../assets/core/scss/style.scss'],
  providers: buildProviders(NumberComponent),
  viewProviders: VIEW_PROVIDERS,
  encapsulation: ViewEncapsulation.None
})
export class NumberComponent extends ReactiveInput implements OnInit {
  override defaultClass: string = 'form-control width-auto';

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}