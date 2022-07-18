import { Component, OnInit, Optional } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { InputType } from '../../../types/input-types';
import { VIEW_PROVIDERS, buildProviders } from '../../../setup/provider-setup';
import InputConfigComponent from '../InputConfigComponent';

@Component({
  selector: 'ia-input-text-area',
  templateUrl: './input-text-area.component.html',
  styleUrls: ['./input-text-area.component.scss'],
  providers: buildProviders(InputTextAreaComponent),
  viewProviders: VIEW_PROVIDERS,
})
export class InputTextAreaComponent
  extends InputConfigComponent
  implements OnInit
{
  override get inputType(): InputType {
    return InputType.TEXTAREA;
  }

  constructor(@Optional() formGroupDirective: FormGroupDirective) {
    super(formGroupDirective);
  }

  ngOnInit(): void {}
}
