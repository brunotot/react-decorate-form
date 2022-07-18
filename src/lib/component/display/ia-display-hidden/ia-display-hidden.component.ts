import { Component, OnInit } from '@angular/core';
import DisplayContentBaseComponent from '../DisplayContentBaseComponent';

@Component({
  selector: 'ia-display-hidden',
  templateUrl: './ia-display-hidden.component.html',
  styleUrls: ['./ia-display-hidden.component.scss'],
})
export class DisplayHiddenComponent
  extends DisplayContentBaseComponent
  implements OnInit
{
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
