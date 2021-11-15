import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgSelect2Component, Select2OptionData } from 'ng-select2';
import ReactiveInput from '../../../model/ReactiveInput';
import { InputType } from '../../../model/InputType';
import { ISelect2MultipleId, ISelect2SingleId } from '../../../model/Select2';
import VIEW_PROVIDERS, { buildProviders } from '../../../model/Provider';

@Component({
  selector: 'ngxp-select2',
  templateUrl: './select2.component.html',
  styleUrls: ['./select2.component.scss'],
  providers: buildProviders(Select2Component),
  viewProviders: VIEW_PROVIDERS
})
export class Select2Component extends ReactiveInput implements OnInit {
  @ViewChild(NgSelect2Component) select2Component!: NgSelect2Component;
  @Output() valueChanged: EventEmitter<any> = new EventEmitter();
  @Input() shouldStartValidating: boolean = false;
  @Input() allowClear: boolean = true;
  @Input() width: string = "100%";
  @Input() placeholder!: string;
  @Input() data: Select2OptionData[] = [];
  @Input() options: any = {};
  @Input() type!: InputType;
  @Input() value: any;
  @Input() classAppend!: string;
  InputType = InputType;
  isDisabled: boolean = false;
  valueSet: boolean = false;

  constructor() {
    super();
  }

  private mapValue: () => void = () => {
    this.valueSet = true;
    let valueAsAny = this.value as any;
    if (this.value === null || this.value === undefined || this.value === '' || typeof this.value === "string" || Array.isArray(this.value)) {
      return;
    } else if ('id' in valueAsAny) {
      this.value = (valueAsAny as ISelect2SingleId).id;
    } else {
      this.value = (valueAsAny as ISelect2MultipleId).ids;
    }
  }

  ngOnInit(): void {
    this.options = {
      multiple: this.type === InputType.SELECT_MULTIPLE,
      tags: true,
    }
  }

  clearSelection() {
    this.writeValue(null);
  }

  handleValue() {
    if (this.shouldStartValidating) {
      let $selectionContainer = $(`#${this.formControlName} .select2-selection`);
      $selectionContainer
        .addClass(this.classAppend)
        .removeClass(this.classAppend === "input-invalid" ? "input-valid" : "input-invalid");
    }
    this.mapValue();
  }

  ngAfterViewChecked() {
    this.handleValue();
  }

  ngAfterViewInit() {
    console.log("Done");
    this.mapValue();    
    this.select2Component?.writeValue(this.value);
  }

  baseValueChanged(value: any) {
    this.writeValue(value);
    this.valueChanged.emit(value);
  }

  override writeValue(value: any) {
    this.value = value
    this.select2Component?.writeValue(this.value);
    this.handleValue();
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }
}
