import { Component, OnInit } from '@angular/core';
import VIEW_PROVIDERS, { buildProviders } from '../../../../model/Provider';
import ReactiveInput from '../../../../model/ReactiveInput';

@Component({
  selector: 'ngxp-textarea-impl',
  templateUrl: './textarea-impl.component.html',
  styleUrls: ['./textarea-impl.component.scss'],
  providers: buildProviders(TextareaImplComponent),
  viewProviders: VIEW_PROVIDERS
})
export class TextareaImplComponent extends ReactiveInput implements OnInit {
  override defaultClass: string = 'form-control width-auto';
  
  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
