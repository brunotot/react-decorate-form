import { Component, OnInit, Optional } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { InputType } from '../../../types/input-types';
import { VIEW_PROVIDERS, buildProviders } from '../../../setup/provider-setup';
import InputConfigComponent from '../InputConfigComponent';

@Component({
  selector: 'ia-input-url',
  templateUrl: './input-url.component.html',
  styleUrls: ['./input-url.component.scss'],
  providers: buildProviders(InputUrlComponent),
  viewProviders: VIEW_PROVIDERS,
})
export class InputUrlComponent extends InputConfigComponent implements OnInit {
  override get inputType(): InputType {
    return InputType.URL;
  }

  constructor(@Optional() formGroupDirective: FormGroupDirective) {
    super(formGroupDirective);
  }

  ngOnInit(): void {}
}
