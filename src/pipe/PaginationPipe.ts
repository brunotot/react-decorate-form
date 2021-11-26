import { Pipe, PipeTransform } from "@angular/core";
import { dateFormatted, MONTH_NAMES, timeFormatted } from "../utility/DateUtils";

// TODO: Kreirati funkciju u InputEntity.ts i svugdje implementirati
function getReadOnlyValue(obj: any) {
  if (obj === null || obj === undefined || obj === '' || obj === []) return '';
  if (typeof obj === "string") return obj;
  if (obj instanceof Date) return dateFormatted(obj) + ' ' + timeFormatted(obj) + ' ' + MONTH_NAMES[obj.getMonth()];
  if (typeof obj === "boolean") return String(obj);
  return typeof obj === "object" ? Object.values(obj).map(v => String(v)).join(" ") : String(obj);
}

@Pipe({ name: 'paginate' })
export class PaginationPipe implements PipeTransform {
  transform(
    array: any[], 
    searchFilter: string = '',
    entriesByPage: number = 0, 
    currentPageNumber: number = 0
  ) {
    let searchFilterLowercase = searchFilter.toLowerCase();
    let filteredArray = array.filter(item => {
      for (let formControlName of Object.keys(item)) {
        let value = item[formControlName];
        let readValueLowercase = getReadOnlyValue(value).toLowerCase();
        if (readValueLowercase.includes(searchFilterLowercase)) {
          return true;
        }
      }
      return false;
    })
    if (entriesByPage === 0 && currentPageNumber === 0) return filteredArray;
    let startIndex = (currentPageNumber - 1) * entriesByPage;
    let endIndex = startIndex + entriesByPage;
    let filteredAndPaginatedArray = filteredArray.slice(startIndex, endIndex);
    return filteredAndPaginatedArray;
  }
}