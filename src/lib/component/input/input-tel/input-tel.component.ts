import { Component, OnInit, Optional } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { InputType } from '../../../types/input-types';
import { VIEW_PROVIDERS, buildProviders } from '../../../setup/provider-setup';
import InputConfigComponent from '../InputConfigComponent';

@Component({
  selector: 'ia-input-tel',
  templateUrl: './input-tel.component.html',
  styleUrls: ['./input-tel.component.scss'],
  providers: buildProviders(InputTelComponent),
  viewProviders: VIEW_PROVIDERS,
})
export class InputTelComponent extends InputConfigComponent implements OnInit {
  override get inputType(): InputType {
    return InputType.TEL;
  }

  constructor(@Optional() formGroupDirective: FormGroupDirective) {
    super(formGroupDirective);
  }

  ngOnInit(): void {}
}
