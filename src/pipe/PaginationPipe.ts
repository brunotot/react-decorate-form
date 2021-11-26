import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'paginate' })
export class PaginationPipe implements PipeTransform {
  transform(
    array: any[], 
    searchFilter: string = '',
    getReadOnlyValue: (formControlName: string, item: any) => string,
    entriesByPage: number = 0, 
    currentPageNumber: number = 0
  ) {
    let searchFilterLowercase = searchFilter.toLowerCase();
    let filteredArray = array.filter(item => {
      for (let formControlName of Object.keys(item)) {
        let value = item[formControlName];
        let readValueLowercase = getReadOnlyValue(formControlName, value).toLowerCase();
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