import { Component, Input, OnInit } from '@angular/core';
import { getInitialColorValue } from '../../../utility/ColorUtils';
import { IForm } from '../../../form/base/BaseForm';
import { Form } from '../../../form/Form';
import { InputType } from '../../../model/InputType';
import { ValidationStatus } from '../../../model/ValidationStatus';
import { ValidationErrors } from '@angular/forms';
import { Style } from '../../../model/Style';

@Component({
  selector: 'ngxp-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.scss']
})
export class BaseFormComponent implements OnInit {
  @Input() form!: Form;
  @Input() formTitle!: string;
  @Input() fnSubmit!: (form: IForm) => any;
  validationStatus: ValidationStatus = ValidationStatus.IDLE;
  InputType = InputType;

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit(e: any) {
    if (this.form.invalid || this.form.errors) {
      this.validationStatus = ValidationStatus.INVALID;
      e.preventDefault();
      return;
    }
    this.validationStatus = ValidationStatus.VALID;
    let value = this.form.value;
    console.log(value);
    this.fnSubmit(value);
  }

  calculateValidationStatus(validationStatus: ValidationStatus, varName: string): ValidationStatus {
    if (validationStatus === ValidationStatus.IDLE) return ValidationStatus.IDLE;
    let hasErrors: boolean = !!this.form.get(varName)?.errors;
    return hasErrors ? ValidationStatus.INVALID : ValidationStatus.VALID;
  }

  getErrorMessages(varName: string): string[] {
    if (this.validationStatus === ValidationStatus.IDLE) return [];
    let validationErrors: ValidationErrors | null = this.form.get(varName)?.errors || null;
    if (!validationErrors) return [];
    let keys = Object.keys(validationErrors);
    return keys.map(key => this.form.getValidationFailedMessage(varName, key));
  }

  onResetClick() {
    this.form.formControlWrapper.displayConfigs.forEach(displayConfig => {
      let config: any = {};
      if (displayConfig.inputType === InputType.INPUT_RANGE) {
        config[displayConfig.formControlName] = Math.round((displayConfig.max! + displayConfig.min!) / 2);
      } else if (displayConfig.inputType === InputType.INPUT_COLOR) {
        config[displayConfig.formControlName] = getInitialColorValue(Style.COLOR_BLACK)
      }
      this.form.patchValue(config)
    })
  }
}
