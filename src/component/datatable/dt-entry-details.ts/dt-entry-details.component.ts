import { Component, Input, OnInit } from "@angular/core";
import { IDisplayConfigMap } from "../../../type/FormInputConfig";
import { IForm } from "../../../form/base/BaseForm";

@Component({
  selector: 'ngxp-dt-entry-details',
  templateUrl: './dt-entry-details.component.html',
  styleUrls: ['./dt-entry-details.component.scss']
})
export class DtEntryDetailsComponent implements OnInit {
  @Input() entry!: IForm;
  @Input() displayConfigMap!: IDisplayConfigMap;
  @Input() formControlNames: string[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  getReadValue(formControlName: string) {
    let displayConfig = this.displayConfigMap[formControlName];
    return displayConfig.inputEntity.convertToDatatableValue(this.entry[formControlName], displayConfig, true)
  }
}
