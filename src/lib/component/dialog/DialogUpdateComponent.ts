import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { getOwnPropertyNames } from '../../handler/FormHandler';

@Component({
  selector: 'ia-dialog-update',
  template: /*html*/ `
    <ia-form
      [title]="title"
      [model]="model"
      (onSubmit)="onSubmit($event)"
    ></ia-form>
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
