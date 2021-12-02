import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import VIEW_PROVIDERS, { buildProviders } from '../../../../model/Provider';
import ReactiveInput from '../../../../model/ReactiveInput';

@Component({
  selector: 'rib-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss', './../../../../../assets/core/scss/style.scss'],
  providers: buildProviders(PhoneComponent),
  viewProviders: VIEW_PROVIDERS,
  encapsulation: ViewEncapsulation.None
})
export class PhoneComponent extends ReactiveInput implements OnInit {
  //override defaultClass: string = 'input-group flex-nowrap';
  override defaultClass: string = 'form-control width-auto';

  onKeyPress(e: KeyboardEvent) {
    let keyUppercase = e.key.toUpperCase();
    if (keyUppercase === 'TAB') {
      return;
    }
    if (['BACKSPACE', 'ESCAPE', 'RETURN'].indexOf(keyUppercase) !== -1 ||
        (keyUppercase === 'A' && e.ctrlKey === true) ||
        (keyUppercase === 'C' && e.ctrlKey === true) ||
        (keyUppercase === 'V' && e.ctrlKey === true) ||
        (keyUppercase === 'X' && e.ctrlKey === true) ||
        (keyUppercase === '+' && this.currentFormValue === '')) {
      return;
    }
    if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].indexOf(e.key) === -1) {
      e.preventDefault();
    }
  }

  onPaste(e: ClipboardEvent) {
    const pasteData = e.clipboardData?.getData('text/plain') || '';
    let matchRegExpArray;
    let matches = 0;
    let regex = /\+?\d+/g;
    while ((matchRegExpArray = regex.exec(pasteData)) !== null) {
      if (matchRegExpArray.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      matches += matchRegExpArray.length;
    }
    if (matches !== pasteData.length) {
      e.preventDefault();
    }
}

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}