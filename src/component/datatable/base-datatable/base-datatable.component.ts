import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild, ViewEncapsulation } from "@angular/core";
import { Form } from "../../../form/Form";
import { IForm } from "../../../form/base/BaseForm";
import { InputType } from "../../../model/InputType";
import FormControlWrapper from "../../../model/FormControlWrapper";
import { getCompareFn, isTextDisplay, SortingType } from "../../../utility/InputEntityUtils";
import { IDisplayConfigMap } from "../../../type/FormInputConfig";
import { ModalComponent } from "../../dialog/modal/modal.component";
import { ISave } from "../../../type/DatatableConfig";

const MAX_ACTIONS_CONTAINER_WIDTH = 453;
const MAX_STRING_LENGTH_TO_FIT_ONE_LINE_IN_PX = 15;
const MAX_TEXT_COLUMN_WIDTH_IN_PX = 150;
const PX_IN_EM = 0.6668;
const MAX_LENGTH = 20;
const EM_IN_PX = 12;

const DEFAULT_CREATE_MODAL_TITLE = 'Create new';
const DEFAULT_DELETE_MODAL_TITLE = 'Warning';
const DEFAULT_CURRENT_PAGE_NUMBER = 1;
const DEFAULT_ENTRIES_PER_PAGE = 10;
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

@Component({
  selector: 'ngxp-datatable',
  templateUrl: './base-datatable.component.html',
  styleUrls: ['./base-datatable.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BaseDatatableComponent implements OnInit {
  @Output('onSave') onSaveEmitter: EventEmitter<ISave> = new EventEmitter<ISave>();
  @Input('createModalTitle') createModalTitle: string = DEFAULT_CREATE_MODAL_TITLE;
  @Input('deleteModalTitle') deleteModalTitle: string = DEFAULT_DELETE_MODAL_TITLE;
  @Input('getDisplayName') _getDisplayName: (item: IForm) => string = () => '';
  @Input('formControlWrapper') formControlWrapper!: FormControlWrapper;
  @Input('data') _data: IForm[] = [];

  @ViewChild("detailsModal") detailsModal!: ModalComponent;
  @ViewChild("createModal") createModal!: ModalComponent;
  @ViewChild("updateModal") updateModal!: ModalComponent;
  @ViewChild("deleteModal") deleteModal!: ModalComponent;
  @ViewChild("containerDiv") containerDiv!: ElementRef;
  @ViewChild("tableBodyRef") tableBodyRef!: ElementRef;
  @ViewChild('navContainer') navContainer!: ElementRef;
  @ViewChild('navMiddle') navMiddle!: ElementRef;
  @ViewChild('navRight') navRight!: ElementRef;
  @ViewChild('navLeft') navLeft!: ElementRef;
  @ViewChild("table") table!: ElementRef;
  @ViewChild('actionsContainer') actionsContainer!: ElementRef;
  @ViewChild('actionsLeft') actionsLeft!: ElementRef;
  @ViewChild('actionsRight') actionsRight!: ElementRef;

  paginationState: IPaginationState = DEFAULT_PAGINATION_STATE
  previousContainerDivWidths: {[key: string]: number} = {};
  displayConfigsByFormControlName: IDisplayConfigMap = {}
  previousTableWidths: {[key: string]: number} = {};
  totalNumberOfFilteredElements!: number;
  filteredAndPaginatedArray: any[] = [];
  actionsClassCalculated: string = '';
  navClassCalculated: string = '';
  formControlNames: string[] = [];
  containerDivWidth: number = 0;
  createdEntries: any[] = [];
  deletedEntries: any[] = [];
  updatedEntries: any[] = [];
  removeFromEnd: number = 0;
  tableWidth: number = 0;
  selectedEntry!: IForm;
  InputType = InputType;
  form!: Form;
  isText = isTextDisplay;
  sortingFormControlName: string = '';
  sortingType: SortingType = SortingType.ASC

  entriesForm: Form = new FormControlWrapper()
    .withSelectSingle({
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


  get data() { 
    return this._data.concat(this.createdEntries, this.updatedEntries) 
  }

  set data(data) { 
    this._data = data 
  }

  get calculateShowingText() {
    let filteredLength = this.totalNumberOfFilteredElements
    let startValue = ((this.currentPageNumber - 1) * this.entriesPerPage) + 1
    let endValue = this.currentPageNumber * this.entriesPerPage
    if (endValue > filteredLength) endValue = filteredLength
    return filteredLength === 0 
      ? 'No data shown' 
      : `Showing ${startValue} to ${endValue} of ${filteredLength} entries`
  }

  get currentPageNumber() {
    let value = this.entriesForm.get('currentPageNumber')?.value
    let valueNumber = isNaN(value) ? 1 : Number(value)
    let valueNormalized = valueNumber < 1 ? 1 : valueNumber;
    return valueNormalized > this.maxNumberOfPages ? this.maxNumberOfPages : valueNormalized
  }

  get changesMade(): boolean {
    return this.createdEntries.length > 0 || this.deletedEntries.length > 0 || this.updatedEntries.length > 0 
  }

  get calculateNavBtnsWrapperWidthNumber() { 
    return (String(this.maxNumberOfPages).length*PX_IN_EM) + 23.9664 
  }

  get maxNumberOfPages() { 
    return Math.ceil(this.totalNumberOfFilteredElements / this.entriesPerPage) 
  }
  
  get displayName() { 
    return this.selectedEntry ? this._getDisplayName(this.selectedEntry) : '' 
  }
  
  get calculateNavBtnsWrapperWidth() { 
    return `${this.calculateNavBtnsWrapperWidthNumber}em` 
  }
  
  get calculateShowingTextWidthNumber() { 
    return this.calculateShowingText.length * PX_IN_EM 
  }
  
  get searchFilter() { 
    return (this.entriesForm.get('searchFilter')?.value || '').trim() 
  }
  
  get navContainerWidth() { 
    return Number(this.navContainer?.nativeElement.offsetWidth) 
  }
  
  get calculateShowingTextWidth() { 
    return `${this.calculateShowingTextWidthNumber}em` 
  }
  
  get entriesPerPage() { 
    return Number(this.entriesForm.get('entriesPerPage')?.value) 
  }
  
  get navLeftSideWidth() { 
    return Number(this.navLeft?.nativeElement.offsetWidth) 
  }

  get navMiddleWidth() { 
    return Number(this.navMiddle?.nativeElement.offsetWidth) 
  }

  get navRightWidth() { 
    return Number(this.navRight?.nativeElement.offsetWidth) 
  }

  get navRightSideWidth() { 
    return this.navMiddleWidth + this.navRightWidth 
  }

  getNavClassCalculated() { 
    return this.navContainerWidth - this.navLeftSideWidth - this.navRightSideWidth < 0 
      ? 'row-btns-container-column' 
      : 'row-btns-container-row'
  }

  getActionsClassCalculated() {
    let actionsContainerWidth = Number(this.actionsContainer?.nativeElement.offsetWidth);
    return actionsContainerWidth > MAX_ACTIONS_CONTAINER_WIDTH 
      ? 'actions-wrapper-row' 
      : 'actions-wrapper-column'
  }

  ngDoCheck(): void {
    if (this.actionsContainer?.nativeElement) {
      this.actionsClassCalculated = this.getActionsClassCalculated()
    }
    if (this.navContainer?.nativeElement) {
      this.navClassCalculated = this.getNavClassCalculated();
    }
  }
  
  constructor() {
  }

  ngOnInit(): void {
    this.formControlNames = this.formControlWrapper.displayConfigs.map(cfg => cfg.formControlName);
    this.formControlNames.forEach(formControlName => 
      this.displayConfigsByFormControlName[formControlName] = this.formControlWrapper
        .displayConfigs.find(d => d.formControlName === formControlName)!)

    this.entriesForm.valueChanges.subscribe(() => {
      let value = {
        entriesPerPage: this.entriesPerPage,
        searchFilter: this.searchFilter,
        currentPageNumber: this.currentPageNumber
      }
      let entriesPerPageChange: boolean = this.paginationState.entriesPerPage !== this.entriesPerPage;
      let searchFilterChange: boolean = this.paginationState.searchFilter !== this.searchFilter;
      let currentPageNumberChange: boolean = this.paginationState.currentPageNumber !== this.currentPageNumber;
      if (entriesPerPageChange || searchFilterChange || currentPageNumberChange) {
        this.paginationState = value
        this.triggerPaginationArrayChange()
        if (entriesPerPageChange) setTimeout(() => this.entriesForm.patchValue(value))
      }
    })

    this.triggerPaginationArrayChange()
  }

  @HostListener('window:resize')
  onResize() {
    this.handleResponsiveness();
  }

  ngAfterViewInit() {
    setTimeout(() => this.handleResponsiveness());
  }

  handleResponsiveness() {
    let newContainerDivWidth = this.containerDiv.nativeElement.offsetWidth;
    let newTableWidth = this.table.nativeElement.offsetWidth;
    let enlarging: boolean = this.containerDivWidth !== 0 && (newTableWidth > this.tableWidth || newContainerDivWidth > this.containerDivWidth);
    this.containerDivWidth = this.containerDiv.nativeElement.offsetWidth;
    this.tableWidth = this.table.nativeElement.offsetWidth;
    if (!enlarging && this.containerDivWidth >= this.tableWidth) return;

    if (enlarging) {
      let lastTableWidthValue = this.previousTableWidths[this.formControlNames[this.formControlNames.length - this.removeFromEnd]];
      let secondToLastTableWidthValue = this.previousTableWidths[this.formControlNames[this.formControlNames.length - this.removeFromEnd + 1]];
      let lastDifference = secondToLastTableWidthValue - lastTableWidthValue;
      lastDifference = lastDifference < 0 ? 0 : lastDifference;
      let lastContainerDivWidth = this.previousContainerDivWidths[this.formControlNames[this.formControlNames.length - this.removeFromEnd]];
      if (this.containerDivWidth >= lastContainerDivWidth + lastDifference) {
        this.removeFromEnd -= this.removeFromEnd === 0 ? 0 : 1;
        delete this.previousTableWidths[this.formControlNames[this.formControlNames.length - this.removeFromEnd - 1]]
        delete this.previousContainerDivWidths[this.formControlNames[this.formControlNames.length - this.removeFromEnd - 1]]
        return;
      }
    } else {
      this.removeFromEnd++;
      this.previousContainerDivWidths[this.formControlNames[this.formControlNames.length - this.removeFromEnd]] = this.containerDivWidth;
      this.previousTableWidths[this.formControlNames[this.formControlNames.length - this.removeFromEnd]] = this.tableWidth;
    }
    
    setTimeout(() => this.handleResponsiveness());
  }

  createEntry(value: IForm) {
    this.createdEntries.push(value);
    this.createModal.closeModal();
    this.triggerPaginationArrayChange()
  }

  deleteEntry() {
    let index = this._data.findIndex(o => o === this.selectedEntry)
    if (index === -1) {
      index = this.createdEntries.findIndex(c => c === this.selectedEntry)
      if (index === -1) {
        index = this.updatedEntries.findIndex(c => c === this.selectedEntry)
        if (index === -1) throw new Error(`Item ${this.selectedEntry} cannot be deleted because it doesn't exist.`)
        this.updatedEntries.splice(index, 1);
      } else {
        this.createdEntries.splice(index, 1);
      }
    } else {
      this._data.splice(index, 1);
    }
    this.deletedEntries.push(this.selectedEntry)
    this.deleteModal.closeModal()
    this.triggerPaginationArrayChange()
  }

  updateEntry(value: IForm) {
    let index = this._data.findIndex(o => o === this.selectedEntry)
    if (index === -1) {
      index = this.createdEntries.findIndex(o => o === this.selectedEntry);
      if (index === -1) {
        index = this.updatedEntries.findIndex(o => o === this.selectedEntry);
        if (index === -1) throw new Error(`Item ${this.selectedEntry} cannot be updated because it doesn't exist.`)
        this.updatedEntries = this.updatedEntries.map(item => {
          if (item === this.selectedEntry) {
            item = value
          }
          return item
        })
      } else {
        this.createdEntries = this.createdEntries.filter(o => o !== this.selectedEntry);
        this.updatedEntries.push(value);
      }
    } else {
      this._data = this._data.filter(o => o !== this.selectedEntry);
      this.updatedEntries.push(value);
    }
    this.updateModal.closeModal();
    this.triggerPaginationArrayChange()
  }

  onUpdateSubmitFn = (value: IForm) => {
    this.updateEntry(value)
  }

  onCreateSubmitFn = (value: IForm) => {
    this.createEntry(value)
  }

  triggerPaginationArrayChange() {
    let { searchFilter, currentPageNumber, entriesPerPage } = this.paginationState
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
    if (this.sortingFormControlName) {
      let displayConfig = this.displayConfigsByFormControlName[this.sortingFormControlName];
      let { inputEntity } = displayConfig;
      filteredArray.sort((a, b) => {
        let valueA = a[this.sortingFormControlName];
        let valueB = b[this.sortingFormControlName];
        let compareFn = getCompareFn(inputEntity, displayConfig, this.sortingType)
        return compareFn(valueA, valueB)
      })
    }
    this.totalNumberOfFilteredElements = filteredArray.length
    let startIndex = (currentPageNumber - 1) * entriesPerPage;
    let endIndex = startIndex + entriesPerPage;
    this.filteredAndPaginatedArray = filteredArray.slice(startIndex, endIndex);
  }

  doSave() {
    this.onSaveEmitter.emit({
      created: this.createdEntries,
      deleted: this.deletedEntries,
      updated: this.updatedEntries
    })
    this.data = this.data.concat(this.createdEntries, this.updatedEntries);
    this.createdEntries = []
    this.deletedEntries = []
    this.updatedEntries = []
    alert('Changes saved')
  }

  toBeginning() {
    this.entriesForm.patchValue({ currentPageNumber: 1 })
  }

  toPrevious() {
    this.entriesForm.patchValue({ currentPageNumber: this.currentPageNumber <= 1 ? 1 : this.currentPageNumber - 1 })
  }

  toNext() {
    this.entriesForm.patchValue({ currentPageNumber: this.currentPageNumber >= this.maxNumberOfPages ? this.maxNumberOfPages : this.currentPageNumber + 1 })
  }

  toLast() {
    this.entriesForm.patchValue({ currentPageNumber: this.maxNumberOfPages })
  }

  getReadValue(formControlName: string, item: any) {
    return this.displayConfigsByFormControlName[formControlName]
      .inputEntity
      .convertToDatatableValue(item, this.displayConfigsByFormControlName[formControlName])
      .trim();
  }

  openUpdateModal() {
    this.form = this.formControlWrapper.toForm(this.selectedEntry);
    this.updateModal.openModal()
  }

  openCreateModal() {
    this.form = this.formControlWrapper.toForm();
    this.createModal.openModal()
  }

  openDetailsModal() {
    this.detailsModal.openModal()
  }

  onClickMore(item: any) {
    this.selectedEntry = item === this.selectedEntry ? null : item;
  }

  getInputType(formControlName: string): InputType {
    return this.displayConfigsByFormControlName[formControlName].inputType;
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
      ? stringMaxLength * PX_IN_EM 
      : MAX_STRING_LENGTH_TO_FIT_ONE_LINE_IN_PX * PX_IN_EM
    return stringMaxLength >= MAX_LENGTH ? `${MAX_TEXT_COLUMN_WIDTH_IN_PX}px` : `${emValue}em`;
  }

  calculateTextColumnWidthBase(formControlName: string) {
    if (!this.isText(this.getInputType(formControlName))) return 'auto';
    return this.calculateTextColumnWidth(this.getLargestStringLength(formControlName));
  }

  calculateColumnGap(offsetWidth: number): string {
    let totalInEm = this.calculateShowingTextWidthNumber + this.calculateNavBtnsWrapperWidthNumber;
    let totalInPx = totalInEm * EM_IN_PX;
    let subtraction = offsetWidth - totalInPx - 33;
    return `${subtraction}px`;
  }

  trackByIndex(index: number) { 
    return index 
  }

  onSortClick(formControlName: string) {
    if (this.sortingFormControlName === formControlName) {
      if (this.sortingType === 'asc') {
        this.sortingType = SortingType.DESC;
      } else {
        this.sortingType = SortingType.ASC;
        this.sortingFormControlName = '';
      }
    } else {
      this.sortingFormControlName = formControlName;
    }
    this.triggerPaginationArrayChange()
  }
}
