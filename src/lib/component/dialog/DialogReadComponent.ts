import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { getEntityNameVariable } from "../../utils/decorator-utils";
import { CREATE_UPDATE_DIALOG_CSS } from "../../utils/style-utils";

@Component({
  selector: "ia-dialog-read",
  styles: [CREATE_UPDATE_DIALOG_CSS],
  template: /*html*/ `
    <div class="ia-dialog-header">
      <div>
        <h1 *ngIf="title">{{ title }}</h1>
      </div>
      <ia-button appearance="mat-fab" icon="close" (onClick)="onCloseClick()">
      </ia-button>
    </div>
    <mat-dialog-content class="mat-typography">
      <ia-display-data [title]="title" [model]="model"></ia-display-data>
    </mat-dialog-content>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class DialogReadComponent implements OnInit {
  model: any;
  title: string;

  constructor(
    public dialogRef: MatDialogRef<DialogReadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.model = data.model;
    let entityNameVariable = getEntityNameVariable(this.model);
    this.title = this.model[entityNameVariable];
  }

  onCloseClick(): void {
    this.onNoClick();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
