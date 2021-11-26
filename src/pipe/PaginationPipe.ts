import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'paginate' })
export class PaginationPipe implements PipeTransform {
  transform(array: any[], searchFilter: string = '', entriesByPage: number = 0, currentPageNumber: number = 0) {
    let searchFilterLowercase = searchFilter.toLowerCase();
    let filteredArray = array.filter(item => JSON.stringify(item).toLowerCase().includes(searchFilterLowercase))
    if (entriesByPage === 0 && currentPageNumber === 0) return filteredArray;
    let startIndex = (currentPageNumber - 1) * entriesByPage;
    let endIndex = startIndex + entriesByPage;
    let filteredAndPaginatedArray = filteredArray.slice(startIndex, endIndex);
    return filteredAndPaginatedArray;
  }
}