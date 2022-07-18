import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { getOwnPropertyNames } from '../../handler/FormHandler';

@Component({
  selector: 'ia-dialog-read',
  template: /*html*/ `
    <ia-display-data [title]="title" [model]="model"></ia-display-data>
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
    let keys = getOwnPropertyNames(this.model);
    this.title = data[keys[0]];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
