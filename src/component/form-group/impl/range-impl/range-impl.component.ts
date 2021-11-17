import { Component, OnInit } from '@angular/core';
import VIEW_PROVIDERS, { buildProviders } from '../../../../model/Provider';
import ReactiveInput from '../../../../model/ReactiveInput';

@Component({
  selector: 'ngxp-range-impl',
  templateUrl: './range-impl.component.html',
  styleUrls: ['./range-impl.component.scss'],
  providers: buildProviders(RangeImplComponent),
  viewProviders: VIEW_PROVIDERS
})
export class RangeImplComponent extends ReactiveInput implements OnInit {
  override defaultClass: string = 'w-100 row range-wrapper';
  firstChange: boolean = false;
  down: boolean = false;

  mousemove(e: any) {
    if (!this.down) return;
    this.handleChange(e);
  }

  mouseup(e: any) {
    this.down = false;
    this.handleChange(e);
  }

  mousedown(e: any) {
    this.down = true;
  }

  handleChange(e: any) {
    let value: number = Number(e.target.value);
    this.writeValue(value);
    this.firstChange = false;
  }

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
