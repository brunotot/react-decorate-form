import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import VIEW_PROVIDERS, { buildProviders } from '../../../../model/Provider';
import ReactiveInput from '../../../../model/ReactiveInput';

const SM_BREAKPOINT: number = 767;

@Component({
  selector: 'ngxp-range-impl',
  templateUrl: './range-impl.component.html',
  styleUrls: ['./range-impl.component.scss'],
  providers: buildProviders(RangeImplComponent),
  viewProviders: VIEW_PROVIDERS
})
export class RangeImplComponent extends ReactiveInput implements OnInit {
  @ViewChild('rangeSelectorDivWrapper') rangeSelectorDivWrapper!: ElementRef;
  @ViewChild('rangeContainerWrapper') rangeContainerWrapper!: ElementRef;
  windowWidth: number = 0;
  
  override defaultClass: string = 'w-100 row range-wrapper';
  down: boolean = false;
  calculatedWidth: number = -1;

  calculateStartEndBadgeMaxWidth(sliderWidth: number) {
    let wrapperWidth = this.getCalculatedWidth(this.rangeContainerWrapper);
    let freeSpaceWidth = wrapperWidth - sliderWidth;
    let delta = 25;
    let calculation = (freeSpaceWidth / 2) - delta;
    return this.windowWidth > SM_BREAKPOINT ? `${calculation}px` : '100%';
  }
  
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

  @HostListener('window:resize', ['$event'])
  onResize($event: any) {
    this.windowWidth = $event.target.innerWidth;
    this.calculatedWidth = this.getCalculatedWidth(this.rangeSelectorDivWrapper);
  }

  getCalculatedWidth(elemRef: ElementRef): number {
    let nativeElement = elemRef?.nativeElement;
    if (!nativeElement) return -1;
    return nativeElement.offsetWidth!;
  }

  ngAfterViewChecked() {
    this.calculatedWidth = this.getCalculatedWidth(this.rangeSelectorDivWrapper);
  }

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
