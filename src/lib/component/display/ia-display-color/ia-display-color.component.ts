import { Component, OnInit } from '@angular/core';
import DisplayContentBaseComponent from '../DisplayContentBaseComponent';

@Component({
  selector: 'ia-display-color',
  templateUrl: './ia-display-color.component.html',
  styleUrls: ['./ia-display-color.component.scss'],
})
export class DisplayColorComponent
  extends DisplayContentBaseComponent
  implements OnInit
{
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
