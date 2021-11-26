import { Select2OptionData } from "../../type/FormInputConfig";
import { HTML_NO_DATA } from "../../utility/StringUtils";
import { IDisplayConfig } from "../FormControlWrapper";
import { InputType } from "../InputType";
import InputEntity from "./base/InputEntity";

class SelectEntity extends InputEntity<string | string[]> {
  constructor() {
    super(InputType.SELECT)
  }

  override convertToDatatableValueReadOnly(value: any, displayConfig: IDisplayConfig) {
    let ids: string[] = value ? (Array.isArray(value) ? value : [value]) : [];
    let valueReadOnly: string = '';
    for (let id of ids) {
      let data: Select2OptionData[] = displayConfig.select2Config?.data || [];
      let selectedOption = data.find(option => option.id === id);
      if (selectedOption) {
        valueReadOnly += selectedOption.text + ' ';
      }
    }
    return valueReadOnly
  }

  override convertToDatatableValue(value: any, displayConfig: IDisplayConfig) {
    let ids: string[] = value ? (Array.isArray(value) ? value : [value]) : [];
    let html = '<div class="d-flex" style="gap: 4px">';
    for (let id of ids) {
      let data: Select2OptionData[] = displayConfig.select2Config?.data || [];
      let selectedOption = data.find(option => option.id === id);
      if (selectedOption) {
        html += `<span class="badge bg-primary">${selectedOption.text}</span>`
      }
    }
    if (html === '<div class="d-flex" style="gap: 4px">') html = '';
    else html += '</div>'
    return html === '' ? HTML_NO_DATA : html;
  }

  override getDefaultFormValue(displayConfig: IDisplayConfig) {
    return !!displayConfig.select2Config?.multiple ? [] : "";
  }

  override convertToDisplayValue(value: string | string[], displayConfig: IDisplayConfig): string {
    if (!value) return this.getDefaultFormValue(displayConfig) as any
    return value as any;
  }

  override convertToFormValue(value: string | string[] | null, displayConfig: IDisplayConfig): string | string[] {
    if (!value) return this.getDefaultFormValue(displayConfig)
    return value;
  }
}

export default new SelectEntity();