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
import { ROW_ACTIONS_CONTAINER_CSS } from "../../utils/style-utils";

@Component({
  selector: "ia-form",
  styles: [
    /*css*/ `
      .ia-form > .ia-form-title {
        margin-bottom: 1.75rem;
      }

      .ia-input-containers {
        display: flex;
        flex-wrap: wrap;
      }

      .ia-input-container {
        flex-grow: 1;
        flex-shrink: 1;
      }
    `,
    ROW_ACTIONS_CONTAINER_CSS,
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

      <div
        class="ia-input-containers"
        [attr.style]="'column-gap: '.concat(columnGapCss)"
      >
        <ia-input
          *ngFor="let inputProperty of inputProperties"
          class="ia-input-container"
          [useWidth]="false"
          [attr.style]="
            'flex-basis: '.concat(
              !!inputProperty.props.width
                ? 'calc(' +
                    inputProperty.props.width +
                    ' - ' +
                    columnGapCss +
                    ')'
                : '100%'
            )
          "
          [name]="inputProperty.propertyName"
          [validators]="inputProperty.validatorFns"
          [type]="inputProperty.inputType"
          [props]="inputProperty.props"
        >
        </ia-input>
      </div>

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
export class FormComponent implements OnInit {
  formHandler!: FormHandler;
  columnGapCss: string = "0.5rem";

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
