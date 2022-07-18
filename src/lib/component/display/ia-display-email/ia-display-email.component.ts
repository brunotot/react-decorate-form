import { Component, OnInit } from '@angular/core';
import DisplayContentBaseComponent from '../DisplayContentBaseComponent';

@Component({
  selector: 'ia-display-email',
  templateUrl: './ia-display-email.component.html',
  styleUrls: ['./ia-display-email.component.scss'],
})
export class DisplayEmailComponent
  extends DisplayContentBaseComponent
  implements OnInit
{
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
