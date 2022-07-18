import { Component, OnInit, Optional } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { InputType } from '../../../types/input-types';
import { VIEW_PROVIDERS, buildProviders } from '../../../setup/provider-setup';
import InputConfigComponent from '../InputConfigComponent';

@Component({
  selector: 'ia-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
  providers: buildProviders(InputPasswordComponent),
  viewProviders: VIEW_PROVIDERS,
})
export class InputPasswordComponent
  extends InputConfigComponent
  implements OnInit
{
  override get inputType(): InputType {
    return InputType.PASSWORD;
  }

  hide = true;

  constructor(@Optional() formGroupDirective: FormGroupDirective) {
    super(formGroupDirective);
  }

  ngOnInit(): void {
    this.writeValue('');
  }
}
