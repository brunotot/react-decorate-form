import { Component, OnInit, Optional } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { InputType } from '../../../types/input-types';
import { VIEW_PROVIDERS, buildProviders } from '../../../setup/provider-setup';
import InputConfigComponent from '../InputConfigComponent';

@Component({
  selector: 'ia-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss'],
  providers: buildProviders(InputSearchComponent),
  viewProviders: VIEW_PROVIDERS,
})
export class InputSearchComponent
  extends InputConfigComponent
  implements OnInit
{
  override get inputType(): InputType {
    return InputType.SEARCH;
  }

  override get defaultProps(): any {
    return {
      matIconPrefix: 'search',
      matIconSuffix: 'close',
    };
  }

  constructor(@Optional() formGroupDirective: FormGroupDirective) {
    super(formGroupDirective);
  }

  ngOnInit(): void {}
}
