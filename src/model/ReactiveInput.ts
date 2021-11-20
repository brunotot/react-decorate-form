import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { Form } from "../form/Form";
import { IDisplayConfig } from "./FormControlWrapper";
import { InputType } from "./InputType";
import { getValidationClass, handleUniqueClasses, Style } from "./Style";
import { ValidationStatus } from "./ValidationStatus";

@Component({ template: '' })
export default class ReactiveInput implements ControlValueAccessor {
  @Input() validationStatus: ValidationStatus = ValidationStatus.IDLE;
  @Input() displayConfig!: IDisplayConfig
  @Input() classAppend: string = '';
  @Input() class: string = '';
  @Input() value!: any;
  @Input() form!: Form;

  InputType = InputType;
  ValidationStatus = ValidationStatus;
  Style = Style;

  get placeholderValue() { return this.displayConfig.placeholder ? this.displayConfig.placeholder : this.defaultPlaceholder }
  get typeValue() { return this.displayConfig.inputType ? this.displayConfig.inputType : this.defaultType }

  defaultBaseValidationClass: string = Style.CLASS_INPUT_VALIDATION;
  defaultValidClass: string = Style.CLASS_INPUT_VALID;
  defaultInvalidClass: string = Style.CLASS_INPUT_INVALID;
  defaultClass: string = '';
  defaultPlaceholder: string = 'Enter value'
  defaultType = InputType.INPUT_TEXT;

  handleUniqueClasses = handleUniqueClasses;
  getValidationClass = getValidationClass;

  calculateClassWrapper(
    baseValidationClass: string = '',
    validClass: string,
    invalidClass: string) {
    let classStart = this.validationStatus === ValidationStatus.IDLE ? '' : baseValidationClass;
    return classStart.concat(
      ' ',
      handleUniqueClasses(
        this.class ? this.class : this.defaultClass, 
        this.classAppend, 
        getValidationClass(this.validationStatus, validClass, invalidClass)))
  }

  get currentFormValue() {
    let formValue: any = this.form.get(this.displayConfig.formControlName);
    return !!formValue ? formValue.value : null;
  }

  get defaultClassWrapper() {
    return this.calculateClassWrapper(
      this.defaultBaseValidationClass,
      this.defaultValidClass,
      this.defaultInvalidClass
    );
  }
  
  constructor() { }

  onChange: any = () => {}
  onTouch: any = () => {}

  writeValue(value: any) {
    let config = {} as any;
    config[this.displayConfig.formControlName] = value;
    this.form.patchValue(config);
    this.value = value
    this.onChange(value)
    this.onTouch(value)
  }

  registerOnChange(fn: any) {
    this.onChange = fn
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn
  }
}