import { Component, OnInit } from '@angular/core';
import { getDefaultColorValue, getInitialColorValue } from '../../../../utility/ColorUtils';
import VIEW_PROVIDERS, { buildProviders } from '../../../../model/Provider';
import ReactiveInput from '../../../../model/ReactiveInput';
import { Style } from '../../../../model/Style';

@Component({
  selector: 'ngxp-color-impl',
  templateUrl: './color-impl.component.html',
  styleUrls: ['./color-impl.component.scss'],
  providers: buildProviders(ColorImplComponent),
  viewProviders: VIEW_PROVIDERS
})
export class ColorImplComponent extends ReactiveInput implements OnInit {
  override defaultClass: string = 'checkbox';
  getDefaultColorValue = getDefaultColorValue;

  onColorChange(e: any) {
    let value = e.target.value ? e.target.value : Style.COLOR_BLACK;
    this.writeValue(getInitialColorValue(value));
  }

  get hexValue() {
    return !!this.currentFormValue ? this.currentFormValue.hex : getDefaultColorValue().hex
  }

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
