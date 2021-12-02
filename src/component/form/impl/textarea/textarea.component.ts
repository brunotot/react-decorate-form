import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import VIEW_PROVIDERS, { buildProviders } from '../../../../model/Provider';
import ReactiveInput from '../../../../model/ReactiveInput';

@Component({
  selector: 'rib-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss', './../../../../../assets/core/scss/style.scss'],
  providers: buildProviders(TextareaComponent),
  viewProviders: VIEW_PROVIDERS,
  encapsulation: ViewEncapsulation.None
})
export class TextareaComponent extends ReactiveInput implements OnInit {
  override defaultClass: string = 'form-control width-auto';
  
  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
