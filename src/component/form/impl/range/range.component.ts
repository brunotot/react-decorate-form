import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import VIEW_PROVIDERS, { buildProviders } from '../../../../model/Provider';
import ReactiveInput from '../../../../model/ReactiveInput';

@Component({
  selector: 'rib-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss', './../../../../../assets/core/scss/style.scss'],
  providers: buildProviders(RangeComponent),
  viewProviders: VIEW_PROVIDERS,
  encapsulation: ViewEncapsulation.None
})
export class RangeComponent extends ReactiveInput implements OnInit {
  @ViewChild('rangeSelectorDivWrapper') rangeSelectorDivWrapper!: ElementRef;
  @ViewChild('rangeContainerWrapper') rangeContainerWrapper!: ElementRef;
  windowWidth: number = 0;
  
  override defaultClass: string = 'w-100 row range-wrapper';
  down: boolean = false;
  calculatedWidth: number = -1;
  
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
    let max = this.displayConfig.max!;
    let min = this.displayConfig.min!;
    let value: number = Number(e.target.value ? e.target.value : (max+min)/2);
    this.writeValue(value);
  }

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
