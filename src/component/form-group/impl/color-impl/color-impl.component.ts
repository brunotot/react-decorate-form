import { Component, OnInit } from '@angular/core';
import VIEW_PROVIDERS, { buildProviders } from '../../../../model/Provider';
import ReactiveInput from '../../../../model/ReactiveInput';

@Component({
  selector: 'ngxp-color-impl',
  templateUrl: './color-impl.component.html',
  styleUrls: ['./color-impl.component.scss'],
  providers: buildProviders(ColorImplComponent),
  viewProviders: VIEW_PROVIDERS
})
export class ColorImplComponent extends ReactiveInput implements OnInit {
  override defaultClass: string = 'checkbox';

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
