import { Component, OnInit } from '@angular/core';
import DisplayBaseComponent from '../DisplayContentBaseComponent';

@Component({
  selector: 'ia-display-checkbox',
  templateUrl: './ia-display-checkbox.component.html',
  styleUrls: ['./ia-display-checkbox.component.scss'],
})
export class DisplayCheckboxComponent
  extends DisplayBaseComponent
  implements OnInit
{
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
