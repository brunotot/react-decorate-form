import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import VIEW_PROVIDERS, { buildProviders } from '../../../../model/Provider';
import ReactiveInput from '../../../../model/ReactiveInput';

@Component({
  selector: 'rib-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss', './../../../../../assets/core/scss/style.scss'],
  providers: buildProviders(ColorComponent),
  viewProviders: VIEW_PROVIDERS,
  encapsulation: ViewEncapsulation.None
})
export class ColorComponent extends ReactiveInput implements OnInit {
  override defaultClass: string = 'checkbox';

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
