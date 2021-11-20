import { Component, OnInit } from '@angular/core';
import VIEW_PROVIDERS, { buildProviders } from '../../../../model/Provider';
import ReactiveInput from '../../../../model/ReactiveInput';

@Component({
  selector: 'ngxp-email-impl',
  templateUrl: './email-impl.component.html',
  styleUrls: ['./email-impl.component.scss'],
  providers: buildProviders(EmailImplComponent),
  viewProviders: VIEW_PROVIDERS
})
export class EmailImplComponent extends ReactiveInput implements OnInit {
  override defaultClass: string = 'form-control width-auto';

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}