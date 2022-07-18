import { Component, Input } from '@angular/core';
import { isValuePresent } from '../../utils/object-utils';
import { InputType } from '../../types/input-types';

@Component({ template: '' })
export default class DisplayContentBaseComponent {
  InputType = InputType;
  _data: any;
  _props: any;
  _type: any;
  @Input('type') set type(type: InputType) {
    this._type = type;
  }
  @Input('props') set props(props: any) {
    this._props = props;
  }
  @Input('data') set data(data: any) {
    this._data = data;
  }
  get data(): any {
    return this._data;
  }
  get type(): InputType {
    return this._type;
  }
  get props(): any {
    return this._props;
  }
  get empty(): boolean {
    return this._data == null || this._data.length === 0;
  }
  public static getSearchableString(data: any, props: any): string {
    return isValuePresent(data)
      ? Array.isArray(data)
        ? data.map((value) => String(value)).join(' ')
        : (String(data) as string)
      : '';
  }
}
