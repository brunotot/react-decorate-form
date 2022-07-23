import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import FormHandler, { IInputProperty } from "../../../handler/FormHandler";

@Component({
  selector: "ia-display-data",
  templateUrl: "./display-data.component.html",
  styleUrls: ["./display-data.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DisplayDataComponent implements OnInit {
  @Input() title: string = "";
  @Input() model: any;
  inputProperties: IInputProperty[] = [];

  constructor() {}

  ngOnInit(): void {
    let formHandler = new FormHandler(this.model);
    this.inputProperties = formHandler.inputProperties;
  }
}
