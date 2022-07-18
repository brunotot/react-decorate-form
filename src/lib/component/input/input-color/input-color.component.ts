import { Component, OnInit, Optional } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { InputType } from '../../../types/input-types';
import { VIEW_PROVIDERS, buildProviders } from '../../../setup/provider-setup';
import InputConfigComponent from '../InputConfigComponent';

@Component({
  selector: 'ia-input-color',
  templateUrl: './input-color.component.html',
  styleUrls: ['./input-color.component.scss'],
  providers: buildProviders(InputColorComponent),
  viewProviders: VIEW_PROVIDERS,
})
export class InputColorComponent
  extends InputConfigComponent
  implements OnInit
{
  override get inputType(): InputType {
    return InputType.COLOR;
  }

  constructor(@Optional() formGroupDirective: FormGroupDirective) {
    super(formGroupDirective);
  }

  ngOnInit(): void {}
}
