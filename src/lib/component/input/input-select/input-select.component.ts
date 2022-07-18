import { Component, OnInit, Optional } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { InputType } from '../../../types/input-types';
import { VIEW_PROVIDERS, buildProviders } from '../../../setup/provider-setup';
import InputConfigComponent from '../InputConfigComponent';
import { SelectOption } from '../../../types/select-types';

@Component({
  selector: 'ia-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
  providers: buildProviders(InputSelectComponent),
  viewProviders: VIEW_PROVIDERS,
})
export class InputSelectComponent
  extends InputConfigComponent
  implements OnInit
{
  override get inputType(): InputType {
    return InputType.SELECT;
  }

  isMultiple!: boolean;
  items: SelectOption[] = null as unknown as SelectOption[];

  constructor(@Optional() formGroupDirective: FormGroupDirective) {
    super(formGroupDirective);
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.id === o2;
  }

  ngOnInit(): void {}
}
