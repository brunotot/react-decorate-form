import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import ReactiveInput from '../../../../model/ReactiveInput';
import VIEW_PROVIDERS, { buildProviders } from '../../../../model/Provider';
import { Style } from '../../../../model/Style';
import { ValidationStatus } from '../../../../model/ValidationStatus';
import $ from '../../../../model/$';
import { Select2OptionData } from '../../../../type/FormInputConfig';

declare var window: any;

@Component({
  selector: 'ngxp-select2-impl',
  templateUrl: './select2-impl.component.html',
  styleUrls: ['./select2-impl.component.scss'],
  providers: buildProviders(Select2Component),
  viewProviders: VIEW_PROVIDERS
})
export class Select2Component extends ReactiveInput implements OnInit {
  @Output() valueChanged: EventEmitter<any> = new EventEmitter();
  @ViewChild('selectionElem') selectionElem!: ElementRef;

  override defaultClass = 'selection-wrapper';
  override classAppend = '';
  override class = '';
  screenHeight: number = window.innerHeight;
  selectedValues: {[key: string]: string} = {};
  dropdownOpened: boolean = false;
  searchFilter: string = '';
  String = String;
  select2ContainerSelector!: string;
  firstTimeValidation: boolean = false;
  isVisibleDownwards: boolean = true;
  classLoadingDone: boolean = false;
  constructor() {
    super();
  }

  get selectDropdownCss(): string {
    let clazz = 'select-dropdown ';
    clazz += this.dropdownOpened && this.classLoadingDone ? 'd-block' : 'd-none';
    clazz += this.isVisibleDownwards ? '' : ' visibility-upwards';
    return clazz;
  }

  get selections(): Select2OptionData[] {
    return Object.entries(this.selectedValues).map(([id, text]) => ({ id, text }));
  }

  filter(option: Select2OptionData) {
    return option.text.toLowerCase().includes(this.searchFilter.toLowerCase());
  }

  removeSelection(id: string) {
    delete this.selectedValues[id];
  }

  get select2Value(): any {
    return this.displayConfig.select2Config?.value || '';
  }

  @HostListener('window:resize', ['$event'])
  onResize($event: any) {
    this.screenHeight = $event.target.innerHeight;
    this.setVisibleDownwards();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll($event: any) {
    this.setVisibleDownwards();
  }

  isSelected(id: string) {
    return id in this.selectedValues;
  }

  get select2Data(): Select2OptionData[] {
    return this.displayConfig.select2Config?.data || [];
  }

  get hasClear(): boolean {
    return !!this.displayConfig.select2Config?.allowClear && Object.keys(this.selectedValues).length > 0
  }

  onClear() {
    this.selectedValues = {};
  }

  get isMultiple(): boolean {
    return !!this.displayConfig.select2Config?.multiple;
  }

  onSelectChange(option: Select2OptionData) {
    this.searchFilter = '';
    let selectedValues = this.isMultiple ? this.selectedValues : {};
    let isClearAllowed = this.displayConfig?.allowClear;
    let isSelectedClicked = false;
    if (option.id in this.selectedValues) {
      isSelectedClicked = true;
      if (isClearAllowed) {
        delete this.selectedValues[option.id]
      }
    } else {
      selectedValues[option.id] = option.text;
      this.dropdownOpened = this.isMultiple;
    }
    this.selectedValues = !isClearAllowed && isSelectedClicked ? this.selectedValues : selectedValues;
    let values = Object.keys(this.selectedValues);
    this.writeValue(this.isMultiple ? values : values.join(""))
  }

  setInitialValue() {
    let normalizedValueArray = this.isMultiple ? this.value : [this.value];
    let currentValues: {[key: string]: string} = {};
    normalizedValueArray.forEach((id: string) => {
      let foundOption = this.select2Data.find(option => option.id === id);
      if (foundOption) {
        currentValues[id] = foundOption.text;
      }
    })
    this.selectedValues = currentValues;
  }

  onDropdownClick($event: any) {
    var element = $event.target;
    if (!element.classList.contains('selection-clear') && !element.classList.contains('selection-remove')) {
      this.classLoadingDone = false;
      this.dropdownOpened = !this.dropdownOpened; 
      this.setVisibleDownwards()
    }
  }

  getVisibleDownwards() {
    let nativeElement: any = this.selectionElem?.nativeElement;
    if (!nativeElement || !this.dropdownOpened) return true;
    let clientRects: any = Object.values(nativeElement.getClientRects())[0];
    let top: number = clientRects.top;
    return this.screenHeight - top > 290;
  }

  setVisibleDownwards() {
    setTimeout(() => {
      this.isVisibleDownwards = this.getVisibleDownwards();
      this.classLoadingDone = true;
    })
  }

  ngOnInit(): void {
    this.setInitialValue();
    this.select2ContainerSelector =  `#${this.displayConfig.formControlName} .select2-selection`;
    this.setVisibleDownwards();
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
  }

  ngAfterViewChecked() {
    this.handleValue();
  }

  baseValueChanged(value: any) {
    this.writeValue(value);
    this.valueChanged.emit(value);
  }

}
