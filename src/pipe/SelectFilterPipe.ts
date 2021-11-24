import { Pipe, PipeTransform } from "@angular/core";
import { Select2OptionData } from "../type/FormInputConfig";

@Pipe({ name: 'selectFilter', pure: false })
export class SelectFilterPipe implements PipeTransform {
  transform(options: Select2OptionData[], searchFilter: string = '') {
    return options.filter(option => option.text.toLowerCase().includes(searchFilter.toLowerCase()))
  }
}