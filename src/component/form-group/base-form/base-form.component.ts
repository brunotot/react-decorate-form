import { Component, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { IForm } from '../../../form/base/BaseForm';
import { Form } from '../../../form/Form';
import { InputType } from '../../../model/InputType';
import { ISelect2MultipleId, ISelect2SingleId } from '../../../model/Select2';

@Component({
  selector: 'ngxp-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.scss']
})
export class BaseFormComponent implements OnInit {
  @Input() form!: Form;
  @Input() formTitle!: string;
  @Input() fnSubmit!: (form: IForm) => any;
  isSubmitPressed: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit(e: any) {
    this.isSubmitPressed = true;
    if (this.form.invalid || this.form.errors)  {
      e.preventDefault();
      return;
    }
    let value = this.form.value;
    Object.keys(value).forEach(k => {
      let { displayConfigs } = this.form.formControlWrapper;
      let displayConfig = displayConfigs.find(displayConfig => displayConfig.variable === k);
      if (displayConfig) {
        let { inputType } = displayConfig;
        if (inputType === InputType.INPUT_DATETIME || inputType === InputType.INPUT_DATE) value[k] = new Date(value[k])
        else if (inputType === InputType.INPUT_NUMBER) value[k] = Number(value[k]);
        else if (inputType === InputType.INPUT_CHECKBOX) value[k] = Boolean(value[k]);
        else if (inputType === InputType.SELECT_SINGLE) value[k] = typeof value[k] === "string" ? value[k] : (value[k] as ISelect2SingleId).id;
        else if (inputType === InputType.SELECT_MULTIPLE) value[k] = Array.isArray(value[k]) ? value[k] : (value[k] as ISelect2MultipleId).ids;
        else value[k] = String(value[k]);
      }
    })
    this.fnSubmit(value);
  }

  calculateValidationClass(isSubmitPressed: boolean, varName: string): string {
    if (!isSubmitPressed) return '';
    let hasErrors: boolean = !!this.form.get(varName)?.errors;
    return hasErrors ? 'input-invalid' : 'input-valid';
  }

  getErrorMessages(varName: string): string[] {
    let validationErrors: ValidationErrors | null = this.form.get(varName)?.errors || null;
    if (!validationErrors) return [];
    let keys = Object.keys(validationErrors);
    return keys.map(key => this.form.getValidationFailedMessage(varName, key));
  }
}
