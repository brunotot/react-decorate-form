import { Component, ElementRef, HostListener, Input, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { Form } from "../../../form/Form";
import { IForm } from "../../../form/base/BaseForm";
import { InputType } from "../../../model/InputType";
import FormControlWrapper, { IDisplayConfig } from "../../../model/FormControlWrapper";
import { isTextDisplay } from "../../../utility/InputEntityUtils";
import { PaginationPipe } from "../../../pipe/PaginationPipe";

const MAX_LENGTH = 20;
const MAX_STRING_LENGTH_TO_FIT_ONE_LINE_IN_PX = 15;
const MAX_TEXT_COLUMN_WIDTH_IN_PX = 150;
const PX_IN_EM = 0.6668;
const EM_IN_PX = 12;
const DEFAULT_ENTRIES_VALUE = 10;

@Component({
  selector: 'ngxp-datatable',
  templateUrl: './base-datatable.component.html',
  styleUrls: ['./base-datatable.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BaseDatatableComponent implements OnInit {
  @Input() data: IForm[] = [];
  @Input() formControlWrapper!: FormControlWrapper;
  @ViewChild("containerDiv") containerDiv!: ElementRef;
  @ViewChild("table") table!: ElementRef;
  @ViewChild("tableBodyRef") tableBodyRef!: ElementRef;
  @ViewChild("container") container!: ElementRef;
  
  form!: Form;
  InputType = InputType;
  isText = isTextDisplay;
  modalTitle: string = '';
  clickedIndex: number = -1;
  @ViewChild('modalRef') modalRef!: ElementRef;
  modalDisplay: string = 'none';
  removeFromEnd: number = 0;
  previousContainerDivWidths: {[key: string]: number} = {};
  previousTableWidths: {[key: string]: number} = {};
  containerDivWidth: number = 0;
  tableWidth: number = 0;
  entriesForm: Form = new FormControlWrapper().withSelectSingle({
      data: [
        {id: `${DEFAULT_ENTRIES_VALUE}`, text: `${DEFAULT_ENTRIES_VALUE}`},
        {id: '25', text: '25'},
        {id: '50', text: '50'},
        {id: '100', text: '100'}
      ],
      allowClear: false,
      formControlName: 'entries'} as any
    )
    .withNumber({ formControlName: 'pageNumber' } as any)
    .toForm({ entries: `${DEFAULT_ENTRIES_VALUE}`, pageNumber: 1 })

  entriesValue: number = DEFAULT_ENTRIES_VALUE;
  pageNumber: number = 1;
  searchFilter: string = '';

  constructor(private paginatePipe: PaginationPipe) {
  }

  ngOnInit(): void {
    this.entriesForm.valueChanges.subscribe(val => {
      if (val['entries']) this.entriesValue = Number(val['entries']);
      let pageNumberAsString = val['pageNumber'];
      if (pageNumberAsString === '') {
        this.setPageNumber(1)
        return;
      }
      let pageNum = Number(pageNumberAsString);
      if (pageNum > 0 && pageNum <= this.totalNumberOfPages) {
        this.pageNumber = pageNum;
      } else {
        this.entriesForm.patchValue({
          pageNumber: this.pageNumber
        })
      }
    })
  }

  onSubmitFn(value: any) {
    console.log(value);
  }

  get calculateShowingText() {
    let filteredLength = this.totalNumberOfFilteredElements;
    let paginatedLength = this.totalNumberOfFilteredAndPaginatedElements;
    return filteredLength === 0 ? 'No data shown' : `Showing 1 to ${paginatedLength} of ${filteredLength} entries`
  }

  calculateColumnGap(offsetWidth: number): string {
    let totalInEm = this.calculateShowingTextWidthNumber + this.calculateNavBtnsWrapperWidthNumber;
    let totalInPx = totalInEm * EM_IN_PX;
    let subtraction = offsetWidth - totalInPx - 33;
    return `${subtraction}px`;
  }

  setPageNumber(num: number) {
    this.pageNumber = num;
    this.entriesForm.patchValue({
      pageNumber: this.pageNumber
    })
  }

  toBeginning() {
    this.setPageNumber(1);
  }

  toPrevious() {
    this.setPageNumber(this.pageNumber <= 1 ? 1 : this.pageNumber - 1);
  }

  toNext() {
    this.setPageNumber(this.pageNumber >= this.totalNumberOfPages ? this.totalNumberOfPages : this.pageNumber + 1);
  }

  toLast() {
    this.setPageNumber(this.totalNumberOfPages);
  }

  get calculateNavBtnsWrapperWidthNumber() {
    return (String(this.totalNumberOfPages).length*PX_IN_EM) + 23.9664;
  }

  get calculateNavBtnsWrapperWidth() {
    return `${this.calculateNavBtnsWrapperWidthNumber}em`
  }

  get calculateShowingTextWidthNumber() {
    return this.calculateShowingText.length * PX_IN_EM;
  }

  get calculateShowingTextWidth() {
    return `${this.calculateShowingTextWidthNumber}em`;
  }

  get totalNumberOfPages() {
    let filteredElementsWithoutPagination = this.paginatePipe.transform(this.data, this.searchFilter);
    let val = Math.ceil(filteredElementsWithoutPagination.length / this.entriesValue);
    return val < 1 ? 1 : val;
  }

  get totalNumberOfFilteredElements() {
    return this.paginatePipe.transform(this.data, this.searchFilter).length;
  }

  get totalNumberOfFilteredAndPaginatedElements() {
    return this.filteredAndPaginatedArray.length;
  }

  get filteredAndPaginatedArray() {
    return this.paginatePipe.transform(this.data, this.searchFilter, this.entriesValue, this.pageNumber);
  }

  getInputEntity(formControlName: string) {
    return this.formControlWrapper
      .displayConfigs
      .find(displayConfig => displayConfig.formControlName === formControlName)!
      .inputEntity
  }

  getReadValue(formControlName: string, item: any) {
    return this.getInputEntity(formControlName).convertToDatatableValue(item, this.getDisplayConfig(formControlName));
  }

  closeModal() {
    this.modalDisplay = 'none';
  }

  toggleModal(item?: any) {
    this.modalTitle = item ? item['text'] : 'Create new';
    this.form = this.formControlWrapper.toForm(item);
    this.modalDisplay = this.modalDisplay === 'block' ? 'none' : 'block';
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick($event: any) {
    let classList = [...$event.target.classList];
    if (classList.includes('action') || classList.includes('btn-more') || classList.includes('more-btns-wrapper')) return;
    this.onClickMore(-1);
  }

  onClickMore(i: number) {
    this.clickedIndex = i === this.clickedIndex ? -1 : i;
  }

  getInputType(formControlName: string): InputType {
    return this.getDisplayConfig(formControlName).inputType;
  }

  getDisplayConfig(formControlName: string): IDisplayConfig {
    return this.formControlWrapper.displayConfigs.find(d => d.formControlName === formControlName)!;
  }

  getControlKey(index: number): string {
    return this.controls.length > index ? this.controls[index]['key'] : '';
  }

  handleResponsiveness() {
    let newContainerDivWidth = this.containerDiv.nativeElement.offsetWidth;
    let newTableWidth = this.table.nativeElement.offsetWidth;
    let enlarging: boolean = this.containerDivWidth !== 0 && (newTableWidth > this.tableWidth || newContainerDivWidth > this.containerDivWidth);
    this.containerDivWidth = this.containerDiv.nativeElement.offsetWidth;
    this.tableWidth = this.table.nativeElement.offsetWidth;
    if (!enlarging && this.containerDivWidth >= this.tableWidth) return;

    if (enlarging) {
      let lastTableWidthValue = this.previousTableWidths[this.getControlKey(this.controls.length - this.removeFromEnd)];
      let secondToLastTableWidthValue = this.previousTableWidths[this.getControlKey(this.controls.length - this.removeFromEnd + 1)];
      let lastDifference = secondToLastTableWidthValue - lastTableWidthValue;
      lastDifference = lastDifference < 0 ? 0 : lastDifference;
      let lastContainerDivWidth = this.previousContainerDivWidths[this.getControlKey(this.controls.length - this.removeFromEnd)];
      if (this.containerDivWidth >= lastContainerDivWidth + lastDifference) {
        this.removeFromEnd -= this.removeFromEnd === 0 ? 0 : 1;
        delete this.previousTableWidths[this.getControlKey(this.controls.length - this.removeFromEnd - 1)]
        delete this.previousContainerDivWidths[this.getControlKey(this.controls.length - this.removeFromEnd - 1)]
        return;
      }
    } else {
      this.removeFromEnd++;
      this.previousContainerDivWidths[this.getControlKey(this.controls.length - this.removeFromEnd)] = this.containerDivWidth;
      this.previousTableWidths[this.getControlKey(this.controls.length - this.removeFromEnd)] = this.tableWidth;
    }
    
    setTimeout(() => this.handleResponsiveness());
  }

  get controls(): {[key: string]: any}[] {
    return Object.entries(this.formControlWrapper.initialControls).map(([key, value]) => ({ key, value }))
  }

  isEverythingVisible(): boolean {
    this.containerDivWidth = this.containerDiv.nativeElement.offsetWidth;
    this.tableWidth = this.table.nativeElement.offsetWidth;
    return this.containerDivWidth >= this.tableWidth;
  }

  getLargestStringLength(formControlName: string) {
    let maxLength = formControlName.length;
    for (let item of this.data) {
      let value = item[formControlName]?.toString() || '';
      let { length } = value;
      if (length > maxLength) {
        maxLength = length;
      }
    }
    return maxLength;
  }

  calculateTextColumnWidth(stringMaxLength: number): string {
    let emValue = stringMaxLength <= MAX_STRING_LENGTH_TO_FIT_ONE_LINE_IN_PX 
      ? stringMaxLength*PX_IN_EM 
      : MAX_STRING_LENGTH_TO_FIT_ONE_LINE_IN_PX*PX_IN_EM
    return stringMaxLength >= MAX_LENGTH ? `${MAX_TEXT_COLUMN_WIDTH_IN_PX}px` : `${emValue}em`;
  }

  calculateTextColumnWidthBase(formControlName: string) {
    if (!this.isText(this.getInputType(formControlName))) return 'auto';
    return this.calculateTextColumnWidth(this.getLargestStringLength(formControlName));
  }

  @HostListener('window:resize')
  onResize() {
    this.handleResponsiveness();
  }

  ngAfterViewInit() {
    setTimeout(() => this.handleResponsiveness());
  }
}
