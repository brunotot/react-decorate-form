import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { getOwnPropertyNames } from "../../handler/FormHandler";

@Component({
  selector: "ia-dialog-update",
  styles: [
    /*css*/ `
      .ia-dialog-header {
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
        margin-bottom: 1.5rem;
        align-items: center;
        gap: 0.5rem;
      }
      .ia-dialog-header > div > h1 {
        margin-bottom: 0;
      }
      .ia-dialog-form {
        margin-bottom: 1.5rem;
      }
    `,
  ],
  template: /*html*/ `
    <div class="ia-dialog-header">
      <div>
        <h1 *ngIf="title">{{ title }}</h1>
      </div>
      <ia-button appearance="mat-fab" icon="close" (onClick)="onCloseClick()">
      </ia-button>
    </div>
    <mat-dialog-content class="mat-typography">
      <ia-form
        formClass="ia-dialog-form"
        [model]="model"
        (onSubmit)="onSubmit($event)"
      ></ia-form>
    </mat-dialog-content>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class DialogUpdateComponent implements OnInit {
  model: any;
  title: string;
  index: number;

  constructor(
    public dialogRef: MatDialogRef<DialogUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.model = data.model;
    let keys = getOwnPropertyNames(this.model);
    this.title = this.model[keys[0]];
    this.index = data.index;
  }

  onCloseClick(): void {
    this.onNoClick();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}

  onSubmit(data: any) {
    this.dialogRef.close({
      model: data,
      index: this.index,
    });
  }
}
