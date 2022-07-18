import { Component, Input, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import DatatableHandler from "../../../handler/DatatableHandler";
import { InputType } from "../../../types/input-types";
import { IInputProperty } from "../../../handler/FormHandler";
import { TEMPLATE_DATATABLE_FILTER_CONTENT } from "../../../utils/template-utils";

@Component({
  selector: "ia-filter-content",
  template: TEMPLATE_DATATABLE_FILTER_CONTENT,
})
export class FilterContentComponent implements OnInit {
  @Input() datatableHandler!: DatatableHandler;
  @Input() inputProperty!: IInputProperty;
  @Input() resetSubject!: Subject<void>;
  InputType = InputType;

  constructor() {}

  get inputType(): InputType {
    return this.inputProperty.inputType;
  }

  ngOnInit(): void {}
}
