import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import DisplayContentBaseComponent from '../DisplayContentBaseComponent';

@Component({
  selector: 'ia-display-chips',
  templateUrl: './ia-display-chips.component.html',
  styleUrls: ['./ia-display-chips.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DisplayChipsComponent
  extends DisplayContentBaseComponent
  implements OnInit
{
  get dataFormatted() {
    return Array.isArray(super.data) ? super.data : [];
  }

  constructor() {
    super();
  }

  ngOnInit(): void {}
}
