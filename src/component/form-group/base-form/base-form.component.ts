import { Component, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ISelect2Config } from '../../../model/FormControlWrapper';
import { IForm } from '../../../form/base/BaseForm';
import { Form } from '../../../form/Form';
import { InputType } from '../../../model/InputType';
import { ISelect2MultipleId, ISelect2SingleId } from '../../../model/Select2';
import { ValidationStatus } from '../../../model/ValidationStatus';

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
    Object.keys(value).forEach(k => {
      let { displayConfigs } = this.form.formControlWrapper;
      let displayConfig = displayConfigs.find(displayConfig => displayConfig.formControlName === k);
      if (displayConfig) {
        let { inputType } = displayConfig;
        if (inputType === InputType.INPUT_DATETIME || inputType === InputType.INPUT_DATE) value[k] = new Date(value[k])
        else if (inputType === InputType.INPUT_NUMBER) value[k] = Number(value[k]);
        else if (inputType === InputType.INPUT_CHECKBOX) value[k] = Boolean(value[k]);
        else if (inputType === InputType.SELECT) {
          let valueAsSelect = value[k] as ISelect2Config;
          if (valueAsSelect.options.multiple) {
            value[k] = Array.isArray(value[k]) ? value[k] : (value[k] as ISelect2MultipleId).ids
          } else {
            value[k] = typeof value[k] === "string" ? value[k] : (value[k] as ISelect2SingleId).id
          }
        } else value[k] = String(value[k]);
      }
    })
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
}
