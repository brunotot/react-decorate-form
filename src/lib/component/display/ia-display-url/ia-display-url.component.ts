import { Component, OnInit } from '@angular/core';
import DisplayContentBaseComponent from '../DisplayContentBaseComponent';

@Component({
  selector: 'ia-display-url',
  templateUrl: './ia-display-url.component.html',
  styleUrls: ['./ia-display-url.component.scss'],
})
export class DisplayUrlComponent
  extends DisplayContentBaseComponent
  implements OnInit
{
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
