import { Directive, ElementRef, HostListener } from '@angular/core';
import { Style } from '../model/Style';

@Directive({ selector: '.title-mobile' })
export class TitleDirective {
  constructor(private el: ElementRef) { 
  }

  buildMobileTitle(title: string) {
    return $(`<span class='${Style.CLASS_TITLE_BOX}'>${title}</span>`)
  }

  showTitle(title: string) {
    let $elem = $(this.el.nativeElement);
    $elem.css("overflow", "visible");
    $elem.append(this.buildMobileTitle(title));
  }

  removeTitle() {
    let $elem = $(this.el.nativeElement)
    $elem.find(`.${Style.CLASS_TITLE_BOX}`).remove();
    $elem.css("overflow", "auto")
  }

  @HostListener('touchstart') 
  onClick() {
    let title: string = this.el.nativeElement.title || '';
    if (!title) return;
    this.showTitle(title);
  }
  
  @HostListener('touchend') 
  onBlur() {
    this.removeTitle();
  }
}