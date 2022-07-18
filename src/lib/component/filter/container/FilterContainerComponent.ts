import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import DatatableHandler from '../../../handler/DatatableHandler';
import { IInputProperty } from '../../../handler/FormHandler';
import { IInputPropertiesMap } from '../../../types/datatable-types';

@Component({
  selector: 'ia-filter',
  templateUrl: './FilterContainerComponent.html',
  styleUrls: ['./FilterContainerComponent.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FilterContainerComponent implements OnInit {
  resetSubject: Subject<void> = new Subject();
  @Input() datatableHandler: DatatableHandler;
  @Input() inputPropertiesMap: IInputPropertiesMap;
  inputProperties: IInputProperty[] = [];

  constructor() {}

  onReset() {
    // TODO: Takoder performanse su uzasne :)
    // TODO: Postaviti filtere na prikladnu poziciju (uzet u obzir mobile responsive)
    this.resetSubject.next();
  }

  ngOnInit(): void {
    this.inputProperties = Object.values(this.inputPropertiesMap);
  }
}
