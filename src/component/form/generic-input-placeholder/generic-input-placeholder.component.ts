import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { InputType } from '../../../model/InputType';
import VIEW_PROVIDERS, { buildProviders } from '../../../model/Provider';
import ReactiveInput from '../../../model/ReactiveInput';

@Component({
  selector: 'rib-generic-input-placeholder',
  templateUrl: './generic-input-placeholder.component.html',
  styleUrls: ['./generic-input-placeholder.component.scss', './../../../../assets/core/scss/style.scss'],
  providers: buildProviders(GenericInputPlaceholderComponent),
  viewProviders: VIEW_PROVIDERS,
  encapsulation: ViewEncapsulation.None
})
export class GenericInputPlaceholderComponent extends ReactiveInput implements OnInit {
  override defaultClass: string = 'form-control width-auto';
  
  @ViewChild('textOrTypeElem', {static: false}) textOrTypeElem!: ElementRef;
  textOrType: InputType = InputType.TEXT;
  isHovered: boolean = false;
  isFocused: boolean = false

  constructor() {
    super();
  }

  onUnfocus() {
    this.textOrType = !!this.value ? this.displayConfig.inputType : InputType.TEXT
    this.isFocused = false;
  }

  onFocus() {
    this.textOrType = this.displayConfig.inputType
    this.isFocused = true;
    setTimeout(() => this.textOrTypeElem.nativeElement.click())
  }

  get formattedDisplayValue() {
    return this.displayConfig.inputEntity.convertToDisplayValue(this.value);
  }

  ngOnInit(): void {
    if (!!this.value) this.textOrType = this.displayConfig.inputType;
  }
}