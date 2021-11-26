import { Component, ElementRef, HostListener, Input, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { Form } from "../../../form/Form";
import { IForm } from "../../../form/base/BaseForm";
import { InputType } from "../../../model/InputType";
import FormControlWrapper from "../../../model/FormControlWrapper";
import { isTextDisplay } from "../../../utility/InputEntityUtils";
import { BehaviorSubject } from "rxjs";
import { IDisplayConfigMap } from "../../../type/FormInputConfig";

const MAX_LENGTH = 20;
const MAX_STRING_LENGTH_TO_FIT_ONE_LINE_IN_PX = 15;
const MAX_TEXT_COLUMN_WIDTH_IN_PX = 150;
const PX_IN_EM = 0.6668;
const EM_IN_PX = 12;

const DEFAULT_ENTRIES_PER_PAGE = 10;
const DEFAULT_CURRENT_PAGE_NUMBER = 1;
const DEFAULT_SEARCH_FILTER = ''

const DEFAULT_PAGINATION_STATE: IPaginationState = {
  currentPageNumber: DEFAULT_CURRENT_PAGE_NUMBER,
  entriesPerPage: DEFAULT_ENTRIES_PER_PAGE,
  searchFilter: DEFAULT_SEARCH_FILTER
}

interface IPaginationState {
  currentPageNumber: number,
  entriesPerPage: number,
  searchFilter: string
}

interface IPaginationStateOptional {
  currentPageNumber?: number,
  entriesPerPage?: number,
  searchFilter?: string
}

@Component({
  selector: 'ngxp-datatable',
  templateUrl: './base-datatable.component.html',
  styleUrls: ['./base-datatable.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BaseDatatableComponent implements OnInit {
  @Input() data: IForm[] = [];
  @Input() formControlWrapper!: FormControlWrapper;
  @Input() handleCrudInMemory: boolean = true;

  @ViewChild("containerDiv") containerDiv!: ElementRef;
  @ViewChild("table") table!: ElementRef;
  @ViewChild("tableBodyRef") tableBodyRef!: ElementRef;
  @ViewChild("container") container!: ElementRef;

  numberOfCreatedEntries: number = 1;
  formControlNames: string[] = [];
  displayConfigsByFormControlName: IDisplayConfigMap = {}
  
  form!: Form;
  InputType = InputType;
  isText = isTextDisplay;
  clickedIndex: number = -1;

  @ViewChild('deleteModalRef') deleteModalRef!: ElementRef;
  deleteModalDisplay: string = 'none';

  modalTitle: string = '';
  @ViewChild('modalRef') modalRef!: ElementRef;
  modalDisplay: string = 'none';

  @ViewChild('modalCreateRef') modalCreateRef!: ElementRef;
  modalCreateDisplay: string = 'none';

  detailsModalTitle: string = '';
  @ViewChild('detailsModalRef') detailsModalRef!: ElementRef;
  detailsModalDisplay: string = 'none';
  selectedEntry!: IForm;

  removeFromEnd: number = 0;
  previousContainerDivWidths: {[key: string]: number} = {};
  previousTableWidths: {[key: string]: number} = {};
  containerDivWidth: number = 0;
  tableWidth: number = 0;

  entriesForm: Form = new FormControlWrapper().withSelectSingle({
      data: [
        {id: `${DEFAULT_ENTRIES_PER_PAGE}`, text: `${DEFAULT_ENTRIES_PER_PAGE}`},
        {id: '25', text: '25'},
        {id: '50', text: '50'},
        {id: '100', text: '100'}
      ],
      allowClear: false,
      enableSearch: false,
      formControlName: 'entriesPerPage'} as any
    )
    .withNumber({ formControlName: 'currentPageNumber' } as any)
    .withText({ formControlName: 'searchFilter' } as any)
    .toForm(DEFAULT_PAGINATION_STATE)

  paginationState: BehaviorSubject<IPaginationState> = new BehaviorSubject<IPaginationState>(DEFAULT_PAGINATION_STATE)

  doSave() {
    console.log("Saving " + this.data.length + " items...");
  }

  setPaginationState(newState: IPaginationStateOptional) {
    let stateNormalized = {...this.paginationState.value};
    if (newState.currentPageNumber !== undefined && stateNormalized.currentPageNumber !== newState.currentPageNumber) stateNormalized.currentPageNumber = newState.currentPageNumber;
    if (newState.entriesPerPage !== undefined && stateNormalized.entriesPerPage !== newState.entriesPerPage) stateNormalized.entriesPerPage = newState.entriesPerPage;
    if (newState.searchFilter !== undefined && stateNormalized.searchFilter !== newState.searchFilter) stateNormalized.searchFilter = newState.searchFilter;
    if (JSON.stringify(stateNormalized) !== JSON.stringify(this.paginationState.value)) {
      this.paginationState.next(stateNormalized)
    }
    this.entriesForm.patchValue(stateNormalized, {emitEvent: false, onlySelf: true})
  }

  filteredAndPaginatedArray: any[] = [];
  totalNumberOfFilteredElements!: number;
  totalNumberOfPages!: number;

  public trackByIndex(index: number) {
    return index;
  }
  
  constructor() {
  }

  triggerPaginationArrayChange() {
    let { searchFilter, currentPageNumber, entriesPerPage } = this.paginationState.getValue()
    let searchFilterLowercase = searchFilter.toLowerCase();
    let filteredArray = this.data.filter(item => {
      for (let formControlName of this.formControlNames) {
        let value = item[formControlName];
        let displayConfig = this.displayConfigsByFormControlName[formControlName];
        let inputEntity = displayConfig.inputEntity;
        let readValue = inputEntity.convertToDatatableValueReadOnly(value, displayConfig);
        let readValueLowercase = readValue.toLowerCase();
        if (readValueLowercase.includes(searchFilterLowercase)) return true;
      }
      return false;
    })
    this.totalNumberOfFilteredElements = filteredArray.length
    let totalNumberOfPagesCalc = Math.ceil(filteredArray.length / entriesPerPage);
    totalNumberOfPagesCalc = totalNumberOfPagesCalc < 1 ? 1 : (totalNumberOfPagesCalc > this.totalNumberOfPages ? this.totalNumberOfPages : totalNumberOfPagesCalc);
    this.totalNumberOfPages = totalNumberOfPagesCalc
    if (this.currentPageNumber > totalNumberOfPagesCalc) {
      currentPageNumber = this.totalNumberOfPages;
      this.setPaginationState({ currentPageNumber })
    }
    let startIndex = (currentPageNumber - 1) * entriesPerPage;
    let endIndex = startIndex + entriesPerPage;
    this.filteredAndPaginatedArray = filteredArray.slice(startIndex, endIndex);
  }

  ngOnInit(): void {
    this.formControlNames = this.formControlWrapper.displayConfigs.map(cfg => cfg.formControlName);
    this.formControlNames.forEach(formControlName => 
      this.displayConfigsByFormControlName[formControlName] = this.formControlWrapper
        .displayConfigs.find(d => d.formControlName === formControlName)!)
    this.paginationState.subscribe(() => this.triggerPaginationArrayChange())

    this.entriesForm.valueChanges.subscribe(formValue => {
      let searchFilter = String(formValue['searchFilter']);
      let entriesPerPage = Number(formValue['entriesPerPage'])
      let currentPageNumber = Number(formValue['currentPageNumber'])
      currentPageNumber = currentPageNumber < 1 ? 1 : (currentPageNumber > this.totalNumberOfPages ? this.totalNumberOfPages : currentPageNumber)
      let newValue: IPaginationState = { entriesPerPage, currentPageNumber, searchFilter }
      this.setPaginationState(newValue)
    })
  }

  update(id: any, value: any) {
    this.data = this.data.map(item => {
      if (item['id'] === id) {
        item = value;
      }
      return item;
    })
    this.triggerPaginationArrayChange()
  }

  onSubmitFn = (value: any) => {
    if (this.handleCrudInMemory) {
      let idToUpdate = value['id'];
      this.modalDisplay = 'none';
      this.update(idToUpdate, value)
    } else {
      // TODO
    }
  }

  create = (newId: any, value: any) => {
    value['id'] = newId;
    this.data.push(value);
    this.triggerPaginationArrayChange()
  }

  onSubmitCreateFn = (value: any) => {
    if (this.handleCrudInMemory) {
      let idToUpdate = `_${this.numberOfCreatedEntries}`;
      this.numberOfCreatedEntries++;
      this.modalCreateDisplay = 'none';
      this.create(idToUpdate, value)
    } else {
      // TODO
    }
  }

  get calculateShowingText() {
    let filteredLength = this.totalNumberOfFilteredElements;
    let startValue = ((this.currentPageNumber - 1) * this.entriesPerPage) + 1;
    let endValue = this.currentPageNumber * this.entriesPerPage;
    if (endValue > filteredLength) {
      endValue = filteredLength;
    }
    return filteredLength === 0 ? 'No data shown' : `Showing ${startValue} to ${endValue} of ${filteredLength} entries`
  }

  get currentPageNumber() {
    return this.paginationState.value.currentPageNumber;
  }

  get entriesPerPage() {
    return this.paginationState.value.entriesPerPage;
  }

  get searchFilter() {
    return this.paginationState.value.searchFilter
  }

  calculateColumnGap(offsetWidth: number): string {
    let totalInEm = this.calculateShowingTextWidthNumber + this.calculateNavBtnsWrapperWidthNumber;
    let totalInPx = totalInEm * EM_IN_PX;
    let subtraction = offsetWidth - totalInPx - 33;
    return `${subtraction}px`;
  }

  toBeginning() {
    this.setPaginationState({ currentPageNumber: 1 })
  }

  toPrevious() {
    this.setPaginationState({ currentPageNumber: this.currentPageNumber <= 1 ? 1 : this.currentPageNumber - 1 })
  }

  toNext() {
    this.setPaginationState({ currentPageNumber: this.currentPageNumber >= this.totalNumberOfPages ? this.totalNumberOfPages : this.currentPageNumber + 1 })
  }

  toLast() {
    this.setPaginationState({ currentPageNumber: this.totalNumberOfPages })
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

  getInputEntity(formControlName: string) {
    return this.displayConfigsByFormControlName[formControlName].inputEntity
  }

  getReadValue(formControlName: string, item: any) {
    return this.getInputEntity(formControlName).convertToDatatableValue(item, this.displayConfigsByFormControlName[formControlName]).trim();
  }

  getReadValueWithoutHtml(formControlName: string, item: any) {
    return this.getInputEntity(formControlName).convertToDatatableValueReadOnly(item, this.displayConfigsByFormControlName[formControlName]);
  }

  closeModal() {
    this.modalDisplay = 'none';
  }

  closeCreateModal() {
    this.modalCreateDisplay = 'none';
  }

  closeDetailsModal() {
    this.detailsModalDisplay = 'none';
  }

  closeDeleteModal() {
    this.deleteModalDisplay = 'none';
  }

  deleteEntry() {
    let idToDelete = this.selectedEntry['id'];
    if (this.handleCrudInMemory) {
      this.deleteModalDisplay = 'none';
      this.delete(idToDelete);
    } else {
      // TODO
    }
  }

  delete(id: any) {
    this.data = this.data.filter(item => item['id'] !== id);
    this.triggerPaginationArrayChange()
  }

  toggleDeleteModal(item?: any) {
    this.selectedEntry = item;
    this.deleteModalDisplay = this.deleteModalDisplay === 'block' ? 'none' : 'block';
  }

  toggleModal(item?: any) {
    this.modalTitle = item ? item['text'] : 'Create new';
    this.form = this.formControlWrapper.toForm(item);
    this.modalDisplay = this.modalDisplay === 'block' ? 'none' : 'block';
  }

  toggleCreateModal(item?: any) {
    this.form = this.formControlWrapper.toForm(item);
    this.modalCreateDisplay = this.modalCreateDisplay === 'block' ? 'none' : 'block';
  }

  toggleDetailsModal(item: any) {
    this.detailsModalTitle = item['text'];
    this.selectedEntry = item;
    this.detailsModalDisplay = this.detailsModalDisplay === 'block' ? 'none' : 'block';
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
    return this.displayConfigsByFormControlName[formControlName].inputType;
  }

  getControlKey(index: number): string {
    return this.formControlNames.length > index ? this.formControlNames[index] : '';
  }

  handleResponsiveness() {
    let newContainerDivWidth = this.containerDiv.nativeElement.offsetWidth;
    let newTableWidth = this.table.nativeElement.offsetWidth;
    let enlarging: boolean = this.containerDivWidth !== 0 && (newTableWidth > this.tableWidth || newContainerDivWidth > this.containerDivWidth);
    this.containerDivWidth = this.containerDiv.nativeElement.offsetWidth;
    this.tableWidth = this.table.nativeElement.offsetWidth;
    if (!enlarging && this.containerDivWidth >= this.tableWidth) return;

    if (enlarging) {
      let lastTableWidthValue = this.previousTableWidths[this.getControlKey(this.formControlNames.length - this.removeFromEnd)];
      let secondToLastTableWidthValue = this.previousTableWidths[this.getControlKey(this.formControlNames.length - this.removeFromEnd + 1)];
      let lastDifference = secondToLastTableWidthValue - lastTableWidthValue;
      lastDifference = lastDifference < 0 ? 0 : lastDifference;
      let lastContainerDivWidth = this.previousContainerDivWidths[this.getControlKey(this.formControlNames.length - this.removeFromEnd)];
      if (this.containerDivWidth >= lastContainerDivWidth + lastDifference) {
        this.removeFromEnd -= this.removeFromEnd === 0 ? 0 : 1;
        delete this.previousTableWidths[this.getControlKey(this.formControlNames.length - this.removeFromEnd - 1)]
        delete this.previousContainerDivWidths[this.getControlKey(this.formControlNames.length - this.removeFromEnd - 1)]
        return;
      }
    } else {
      this.removeFromEnd++;
      this.previousContainerDivWidths[this.getControlKey(this.formControlNames.length - this.removeFromEnd)] = this.containerDivWidth;
      this.previousTableWidths[this.getControlKey(this.formControlNames.length - this.removeFromEnd)] = this.tableWidth;
    }
    
    setTimeout(() => this.handleResponsiveness());
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
