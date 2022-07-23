import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { messages } from "../../constants/messages";
import { getEntityNameVariable } from "../../utils/decorator-utils";
import {
  CREATE_UPDATE_DIALOG_CSS,
  ROW_ACTIONS_CONTAINER_CSS,
} from "../../utils/style-utils";

@Component({
  selector: "ia-dialog-read",
  styles: [CREATE_UPDATE_DIALOG_CSS, ROW_ACTIONS_CONTAINER_CSS],
  template: /*html*/ `
    <div class="ia-dialog-header">
      <div>
        <h1>{{ titleWarning }}</h1>
      </div>
      <ia-button appearance="mat-fab" icon="close" (onClick)="onCloseClick()">
      </ia-button>
    </div>
    <mat-dialog-content class="mat-typography">
      <p style="margin-bottom: 1.5rem">{{ content }}</p>

      <div class="ia-form-actions">
        <ia-button
          (onClick)="onCloseClick()"
          appearance="mat-raised-button"
          type="button"
          label="Cancel"
        >
        </ia-button>
        <ia-button
          (onClick)="onConfirmClick()"
          appearance="mat-raised-button"
          color="primary"
          label="Confirm"
        >
        </ia-button>
      </div>
    </mat-dialog-content>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class DialogDeleteComponent implements OnInit {
  model: any;
  titleWarning: string;
  content: string;

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.model = data.model;
    this.titleWarning = data.title;
    let entityNameVariable = getEntityNameVariable(this.model);
    this.content = messages.buildDeleteDialogMessage(
      this.model[entityNameVariable]
    );
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

  onCloseClick(): void {
    this.onNoClick();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
