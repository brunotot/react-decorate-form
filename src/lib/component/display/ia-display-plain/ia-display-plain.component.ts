import { Component, OnInit } from '@angular/core';
import DisplayContentBaseComponent from '../DisplayContentBaseComponent';

@Component({
  selector: 'ia-display-plain',
  templateUrl: './ia-display-plain.component.html',
  styleUrls: ['./ia-display-plain.component.scss'],
})
export class DisplayPlainComponent
  extends DisplayContentBaseComponent
  implements OnInit
{
  public static override getSearchableString(data: string): string {
    return data;
  }

  constructor() {
    super();
  }

  ngOnInit(): void {}
}
