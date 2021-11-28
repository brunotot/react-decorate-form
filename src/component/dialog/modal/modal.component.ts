import { Component, ElementRef, HostListener, Input, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";

const DEFAULT_MODAL_CLASS = 'modal';

@Component({
  selector: 'ngxp-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {
  @Input() isShowing: boolean = false;
  @Input() modalTitle: string = '';
  @ViewChild('modalRef') modalRef!: ElementRef;

  get modalClass() {
    return DEFAULT_MODAL_CLASS.concat(this.isShowing ? ' show' : '');
  }

  openModal() {
    this.isShowing = true;
  }

  closeModal() {
    this.isShowing = false;
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
