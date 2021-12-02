import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { IDisplayConfigMap } from "../../../type/FormInputConfig";
import { IForm } from "../../../form/base/BaseForm";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'rib-datatable-read-entry-modal',
  templateUrl: './datatable-read-entry-modal.component.html',
  styleUrls: ['./datatable-read-entry-modal.component.scss', './../../../../assets/core/scss/style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DatatableReadEntryModalComponent implements OnInit {
  @Input() entry!: IForm;
  @Input() displayConfigMap!: IDisplayConfigMap;
  @Input() formControlNames: string[] = [];

  constructor(private sanitized: DomSanitizer) {
  }

  ngOnInit() {
  }

  getReadValue(formControlName: string) {
    let displayConfig = this.displayConfigMap[formControlName];
    let html = displayConfig.inputEntity.convertToDatatableValue(this.entry[formControlName], displayConfig, true)
    return this.sanitized.bypassSecurityTrustHtml(html)
  }
}
