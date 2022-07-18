import { Component, OnInit } from '@angular/core';
import { formatDate } from '../../../utils/date-utils';
import DisplayContentBaseComponent from '../DisplayContentBaseComponent';

@Component({
  selector: 'ia-display-date',
  templateUrl: './ia-display-date.component.html',
  styleUrls: ['./ia-display-date.component.scss'],
})
export class DisplayDateComponent
  extends DisplayContentBaseComponent
  implements OnInit
{
  constructor() {
    super();
  }

  public static override getSearchableString(data: any): string {
    return formatDate(data as Date);
  }

  get dataFormatted(): string {
    let dataAsDate: Date = this.data as Date;
    return formatDate(dataAsDate);
  }

  ngOnInit(): void {}
}
