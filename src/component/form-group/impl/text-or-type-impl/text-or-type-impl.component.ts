import { Component, Input, OnInit } from '@angular/core';
import { ITextOrType } from '../../../../type/TextOrTypeConfig';
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
  @Input() textOrTypeConfig!: ITextOrType;
  textOrType: InputType = InputType.INPUT_TEXT;
  isHovered: boolean = false;
  isFocused: boolean = false

  constructor() {
    super();
  }

  onUnfocus() {
    if (!this.isHovered) this.textOrType = !!this.value ? this.displayConfig.inputType : InputType.INPUT_TEXT
    this.isFocused = false;
  }

  onFocus() {
    this.textOrType = this.displayConfig.inputType
    this.isFocused = true;
  }

  onUnhover() {
    if (!this.isFocused) this.textOrType = !!this.value ? this.displayConfig.inputType : InputType.INPUT_TEXT
    this.isHovered = false;
  }

  onHover() {
    this.textOrType = this.displayConfig.inputType
    this.isHovered = true;
  }

  get formattedDisplayValue() {
    return this.textOrTypeConfig.getValueForDisplay(this.value);
  }

  onInput($event: any) {
    let value = $event.target.value;
    let formattedValue = this.textOrTypeConfig.getValueForForm(value);
    this.writeValue(formattedValue);
  }

  ngOnInit(): void {
    if (!!this.value) this.textOrType = this.displayConfig.inputType;
  }
}