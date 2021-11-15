import { Component, Input } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";

@Component({ template: '' })
export default class ReactiveInput implements ControlValueAccessor {
  @Input() formControlName!: string;
  val: any = ''
  
  constructor() { }

  set v(val: any) {
    this.val = val
    this.onChange(val)
    this.onTouch(val)
  }

  onChange: any = () => {}
  onTouch: any = () => {}

  writeValue(value: any) {
    this.v = value
  }

  registerOnChange(fn: any) {
    this.onChange = fn
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn
  }
}