import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { InputType } from '../../../../model/InputType';
import VIEW_PROVIDERS, { buildProviders } from '../../../../model/Provider';
import ReactiveInput from '../../../../model/ReactiveInput';

@Component({
  selector: 'ngxp-text-or-type-impl',
  templateUrl: './text-or-type-impl.component.html',
  styleUrls: ['./text-or-type-impl.component.scss'],
  providers: buildProviders(TextOrTypeImplComponent),
  viewProviders: VIEW_PROVIDERS
})
export class TextOrTypeImplComponent extends ReactiveInput implements OnInit {
  override defaultClass: string = 'form-control width-auto';
  textOrType: InputType = InputType.TEXT;
  isHovered: boolean = false;
  isFocused: boolean = false
  @ViewChild('textOrTypeElem', {static: false}) textOrTypeElem!: ElementRef;

  constructor() {
    super();
  }

  onUnfocus() {
    /*if (!this.isHovered) */this.textOrType = !!this.value ? this.displayConfig.inputType : InputType.TEXT
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

  val: boolean = false;
  ngOnInit(): void {
    if (!!this.value) this.textOrType = this.displayConfig.inputType;
  }
}