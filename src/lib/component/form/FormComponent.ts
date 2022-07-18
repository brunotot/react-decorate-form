import 'reflect-metadata';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import FormHandler, { IInputProperty } from '../../handler/FormHandler';

@Component({
  selector: 'ia-form',
  templateUrl: './FormComponent.html',
  styleUrls: ['./FormComponent.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormComponent implements OnInit {
  formHandler!: FormHandler;

  @Input() title: string = '';
  @Input() model: any = {};
  @Output() onSubmit = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    this.formHandler = new FormHandler(this.model);
  }

  reset() {
    this.form.reset();
  }

  getInputPropertyByFieldName(fieldName: string): IInputProperty {
    return this.formHandler.getInputPropertyByFieldName(fieldName);
  }

  get form(): FormGroup {
    return this.formHandler.form;
  }

  get inputProperties(): IInputProperty[] {
    return this.formHandler.inputProperties;
  }

  get errors() {
    return this.formHandler.errors;
  }

  submit() {
    if (!this.form.invalid && !this.form.errors) {
      this.onSubmit.next(this.formHandler.getModelValue());
    }
  }
}
