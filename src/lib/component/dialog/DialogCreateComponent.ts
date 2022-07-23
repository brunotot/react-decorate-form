import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CREATE_UPDATE_DIALOG_CSS } from "../../utils/style-utils";
import { CREATE_UPDATE_DIALOG_HTML } from "../../utils/template-utils";

@Component({
  selector: "ia-dialog-create",
  styles: [CREATE_UPDATE_DIALOG_CSS],
  template: CREATE_UPDATE_DIALOG_HTML,
  encapsulation: ViewEncapsulation.None,
})
export class DialogCreateComponent implements OnInit {
  model: any;
  title: string;

  constructor(
    public dialogRef: MatDialogRef<DialogCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.model = data.model;
    this.title = data.title;
  }

  ngOnInit(): void {}

  onSubmit(data: any) {
    this.dialogRef.close({
      model: data,
    });
  }

  onCloseClick(): void {
    this.onNoClick();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
