import { Component, Input, OnInit } from '@angular/core';
import { IForm } from '../../../form/base/BaseForm';
import { Form } from '../../../form/Form';
import { InputType } from '../../../model/InputType';
import { ValidationStatus } from '../../../model/ValidationStatus';
import { ValidationErrors } from '@angular/forms';
import { IDisplayConfig } from '../../../model/FormControlWrapper';

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

  getErrorMessages(displayConfig: IDisplayConfig): string[] {
    let varName = displayConfig.formControlName;
    if (this.validationStatus === ValidationStatus.IDLE) return [];
    let validationErrors: ValidationErrors | null = this.form.get(varName)?.errors || null;
    if (!validationErrors) return [];
    let keys = Object.keys(validationErrors);
    return keys.map(key => this.form.getValidationFailedMessage(varName, key, displayConfig));
  }

  onResetClick() {
    let config: {[key: string]: any} = {};
    this.form
      .formControlWrapper
      .displayConfigs
      .forEach(displayConfig => 
        config[displayConfig.formControlName] = displayConfig.inputEntity.getDefaultFormValue(displayConfig))
    this.form.patchValue(config)
  }
}
