import { Component, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { IForm, ITimeDisplay, IWeekConfig } from '../../../form/base/BaseForm';
import { Form } from '../../../form/Form';
import { InputType } from '../../../model/InputType';
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
        if (inputType === InputType.INPUT_DATETIME || inputType === InputType.INPUT_DATE || inputType === InputType.INPUT_MONTH) value[k] = new Date(value[k])
        else if (inputType === InputType.INPUT_NUMBER || inputType === InputType.INPUT_RANGE) value[k] = isNaN(value[k]) ? null : Number(value[k]);
        else if (inputType === InputType.INPUT_CHECKBOX) value[k] = Boolean(value[k]);
        else if (inputType === InputType.SELECT) {
          let valueAsAny = value[k] as any;
          if ("ids" in valueAsAny) {
            value[k] = Array.isArray(value[k]) ? value[k] : valueAsAny.ids
          } else {
            value[k] = typeof value[k] === "string" ? value[k] : valueAsAny.id
          }
        } else if (inputType === InputType.INPUT_TIME) {
          let valueAsString = value[k] ? value[k] : "0:0";
          let splitValue = valueAsString.split(":");
          let hh = Number(splitValue[0]);
          let mm = Number(splitValue[1]);
          value[k] = {
            hh,
            mm
          } as ITimeDisplay
        } else if (inputType === InputType.INPUT_WEEK) {
          let valueAsString = value[k] ? value[k] : "0000-W0";
          let splitValue = valueAsString.split("-W");
          let year = Number(splitValue[0]);
          let week = Number(splitValue[1]);
          value[k] = {
            year,
            week
          } as IWeekConfig
        } else if (inputType === InputType.INPUT_FILE) {
          console.log(value[k]);
        } else {
          value[k] = String(value[k]);
        }
      }
    })
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
}
