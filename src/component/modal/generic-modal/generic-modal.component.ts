import { Output } from '@angular/core';
import { Component, ElementRef, HostListener, Input, OnInit, ViewChild, ViewEncapsulation, EventEmitter } from '@angular/core';

const DEFAULT_MODAL_CLASS = 'rib-modal';
const DEFAULT_MODAL_SHOW_CLASS = 'rib-show';

@Component({
  selector: 'rib-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.scss', './../../../../assets/core/scss/style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GenericModalComponent implements OnInit {
  @Input() isShowing: boolean = false;
  @Input() modalTitle: string = '';
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modalRef') modalRef!: ElementRef;

  get modalClass() {
    return DEFAULT_MODAL_CLASS.concat(this.isShowing ? ` ${DEFAULT_MODAL_SHOW_CLASS}` : '');
  }

  openModal() {
    this.isShowing = true;
  }

  closeModal() {
    this.isShowing = false;
    this.onClose.emit();
  }

  toggleShowModal() {
    this.isShowing = !this.isShowing
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick($event: any) {
    let classList = [...$event.target.classList];
    if (classList.includes(DEFAULT_MODAL_CLASS)) this.closeModal();
  }

  constructor() {
  }

  ngOnInit(): void {
  }
}