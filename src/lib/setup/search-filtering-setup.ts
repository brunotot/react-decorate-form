import DisplayBaseComponent from '../component/display/DisplayContentBaseComponent';
import { DisplaySelectComponent } from '../component/display/ia-display-select/ia-display-select.component';
import { DisplayDateComponent } from '../component/display/ia-display-date/ia-display-date.component';
import { InputType } from '../types/input-types';

const CUSTOM_TYPE_COMPONENT_MAP: {
  [key: number]: (data: any, props: any) => string;
} = {
  [InputType.SELECT]: DisplaySelectComponent.getSearchableString,
  [InputType.DATE]: DisplayDateComponent.getSearchableString,
};

export function getSearchableString(type: InputType, data: any, props: any) {
  if (type in CUSTOM_TYPE_COMPONENT_MAP) {
    let searchableStringFn = CUSTOM_TYPE_COMPONENT_MAP[type];
    return searchableStringFn(data, props);
  }
  return DisplayBaseComponent.getSearchableString(data, props);
}
