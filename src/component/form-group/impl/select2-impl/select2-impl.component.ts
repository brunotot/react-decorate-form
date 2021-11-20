import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgSelect2Component, Select2OptionData } from 'ng-select2';
import ReactiveInput from '../../../../model/ReactiveInput';
import { ISelect2MultipleId, ISelect2SingleId } from '../../../../model/Select2';
import VIEW_PROVIDERS, { buildProviders } from '../../../../model/Provider';
import { Style } from '../../../../model/Style';
import { ValidationStatus } from '../../../../model/ValidationStatus';

@Component({
  selector: 'ngxp-select2-impl',
  templateUrl: './select2-impl.component.html',
  styleUrls: ['./select2-impl.component.scss'],
  providers: buildProviders(Select2Component),
  viewProviders: VIEW_PROVIDERS
})
export class Select2Component extends ReactiveInput implements OnInit {
  @ViewChild(NgSelect2Component) select2Component!: NgSelect2Component;
  @Output() valueChanged: EventEmitter<any> = new EventEmitter();

  String = String;
  valueSet: boolean = false;
  select2ContainerSelector!: string;
  firstTimeValidation: boolean = false;

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
    this.select2ContainerSelector =  `#${this.displayConfig.formControlName} .select2-selection`;
  }

  clearSelection() {
    this.writeValue(null);
  }

  handleValue() {
    let $selectionContainer = $(this.select2ContainerSelector);
    if (this.validationStatus !== ValidationStatus.IDLE) {
      if (!this.firstTimeValidation) {
        $selectionContainer.addClass(Style.CLASS_INPUT_VALIDATION)
        this.firstTimeValidation = true;
      }
      let validationClass = this.validationStatus === ValidationStatus.VALID ? Style.CLASS_INPUT_VALID : Style.CLASS_INPUT_INVALID;
      $selectionContainer
        .addClass(validationClass)
        .removeClass(this.validationStatus === ValidationStatus.INVALID ? Style.CLASS_INPUT_VALID : Style.CLASS_INPUT_INVALID);
    } else {
      $selectionContainer
        .css('border', Style.STYLE_BORDER_INPUT_DEFAULT)
    }
    this.mapValue();
  }

  ngAfterViewChecked() {
    this.handleValue();
  }

  ngAfterViewInit() {
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
}
