import "reflect-metadata";
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import FormHandler, { IInputProperty } from "../../handler/FormHandler";

@Component({
  selector: "ia-form",
  styles: [
    /*css*/ `
      .ia-form > .ia-form-title {
        margin-bottom: 1.75rem;
      }

      .ia-form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 0.75rem;
      }

      @media screen and (max-width: 300px) {
        .ia-form-actions {
          flex-direction: column;
        }

        .ia-form-actions button {
          margin: 0;
          width: 100%;
        }
      }
    `,
  ],
  template: /*html*/ `
    <form
      [ngClass]="'ia-form '.concat(formClass)"
      *ngIf="formHandler && inputProperties.length > 0"
      (submit)="submit()"
      [formGroup]="form"
    >
      <h1 [ngClass]="'ia-form-title '.concat(titleClass)" *ngIf="title">
        {{ title }}
      </h1>

      <ia-input
        *ngFor="let inputProperty of inputProperties"
        [name]="inputProperty.propertyName"
        [validators]="inputProperty.validatorFns"
        [type]="inputProperty.inputType"
        [props]="inputProperty.props"
      >
      </ia-input>

      <div class="ia-form-actions">
        <ia-button
          (onClick)="reset()"
          appearance="mat-raised-button"
          color="basic"
          type="button"
          icon="restart_alt"
          label="Reset"
        >
        </ia-button>
        <ia-button
          appearance="mat-raised-button"
          color="primary"
          type="submit"
          icon="save"
          label="Submit"
        >
        </ia-button>
      </div>
    </form>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class FormComponent<T> implements OnInit {
  formHandler!: FormHandler;

  @Input() titleClass: string = "";
  @Input() title: string = "";
  @Input() formClass: string = "";
  @Input() actionsAlignment: "start" | "end" = "end";
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
