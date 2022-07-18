import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import DisplayContentBaseComponent from '../DisplayContentBaseComponent';

@Component({
  selector: 'ia-display',
  templateUrl: './display-base.component.html',
  styleUrls: ['./display-base.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DisplayBaseComponent
  extends DisplayContentBaseComponent
  implements OnInit
{
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
