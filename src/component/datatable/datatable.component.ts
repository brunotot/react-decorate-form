import { Component, ElementRef, HostListener, Input, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { IForm } from "../../form/base/BaseForm";
import { Form } from "../../form/Form";
import FormControlWrapper from "../../model/FormControlWrapper";
import { InputType } from "../../model/InputType";
import { ToastService } from "../../service/toast.service";
import { DEFAULT_ACTION_PERMISSIONS, IActionPermissions, IActionPermissionsNonNull, ISave } from "../../type/DatatableConfig";
import { IColumnConfig, IDisplayConfigMap } from "../../type/FormInputConfig";
import { getCompareFn, IAjax, IPaginationState, isText, isTextDisplay, SortingType } from "../../utility/InputEntityUtils";
import { BaseFormComponent } from "../form/base-form/base-form.component";
import { LoaderComponent } from "../loader/loader.component";
import { GenericModalComponent } from "../modal/generic-modal/generic-modal.component";

function roughSizeOfObject(object: any) {
  var objectList = [];
  var stack = [object];
  var bytes = 0;
  while (stack.length) {
    var value = stack.pop();
    if (typeof value === 'boolean') {
      bytes += 4;
    } else if (typeof value === 'string') {
      bytes += value.length * 2;
    }
    else if (typeof value === 'number') {
      bytes += 8;
    } else if (typeof value === 'object' && objectList.indexOf( value ) === -1) {
      objectList.push( value );
      for(var i in value) {
        stack.push(value[i]);
      }
    }
  }
  return bytes;
}

const debounce = (func: Function, timeout = 300) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}
 

const ERROR_MESSAGE_MAX_LENGTH = 200;
const MAX_ACTIONS_CONTAINER_WIDTH = 453;
const MAX_STRING_LENGTH_TO_FIT_ONE_LINE_IN_PX = 15;
const MAX_TEXT_COLUMN_WIDTH_IN_PX = 150;
const PX_IN_EM = 0.6668;
const MAX_LENGTH = 20;

const DEFAULT_SORTING_FORM_CONTROL_NAME = '';
const DEFAULT_SORTING_TYPE = SortingType.ASC;
const DEFAULT_CREATE_MODAL_TITLE = 'Create new';
const DEFAULT_DELETE_MODAL_TITLE = 'Warning';
const DEFAULT_CURRENT_PAGE_NUMBER = 1;
const DEFAULT_ENTRIES_PER_PAGE = 10;
const DEFAULT_SEARCH_FILTER = ''

const DEFAULT_PAGINATION_STATE: IPaginationState = {
  currentPageNumber: DEFAULT_CURRENT_PAGE_NUMBER,
  entriesPerPage: DEFAULT_ENTRIES_PER_PAGE,
  searchFilter: DEFAULT_SEARCH_FILTER,
  sortingFormControlName: DEFAULT_SORTING_FORM_CONTROL_NAME,
  sortingType: DEFAULT_SORTING_TYPE
}

@Component({
  selector: 'rib-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss', './../../../assets/core/scss/style.scss'],
  encapsulation: ViewEncapsulation.None,
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatatableComponent implements OnInit {
  @Input('onSave') onSaveEmitter!: (saveData: ISave) => Promise<IForm[] | void>
  @Input('createModalTitle') createModalTitle: string = DEFAULT_CREATE_MODAL_TITLE;
  @Input('deleteModalTitle') deleteModalTitle: string = DEFAULT_DELETE_MODAL_TITLE;
  @Input('getDisplayName') _getDisplayName: (item: IForm) => string = () => '';
  @Input('formControlWrapper') formControlWrapper!: FormControlWrapper;
  @Input('data') _data: IForm[] = [];
  @Input('columns') _columns: IColumnConfig[] = [];
  @Input('ajax') ajax: IAjax = null as any;
  @Input('actionPermissions') _actionPermissions!: IActionPermissions;

  get hasAnyChangeAction(): boolean {
    return this.actionPermissions.create || this.actionPermissions.update || this.actionPermissions.delete
  }

  get hasAnyChangeActionExceptCreate(): boolean {
    return this.actionPermissions.read || this.actionPermissions.update || this.actionPermissions.delete
  }

  get actionPermissions(): IActionPermissionsNonNull {
    let normalizedActionPermissions = DEFAULT_ACTION_PERMISSIONS;
    if (!this._actionPermissions) return normalizedActionPermissions;
    if ('create' in this._actionPermissions) normalizedActionPermissions.create = !!this._actionPermissions.create
    if ('read' in this._actionPermissions) normalizedActionPermissions.read = !!this._actionPermissions.read
    if ('update' in this._actionPermissions) normalizedActionPermissions.update = !!this._actionPermissions.update
    if ('delete' in this._actionPermissions) normalizedActionPermissions.delete = !!this._actionPermissions.delete
    return normalizedActionPermissions;
  }

  @ViewChild("detailsModal") detailsModal!: GenericModalComponent;
  @ViewChild("createModal") createModal!: GenericModalComponent;
  @ViewChild("updateModal") updateModal!: GenericModalComponent;
  @ViewChild("deleteModal") deleteModal!: GenericModalComponent;
  @ViewChild("tableLoader") tableLoader!: LoaderComponent;
  @ViewChild("createForm") createForm!: BaseFormComponent;
  @ViewChild("updateForm") updateForm!: BaseFormComponent;
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
  totalNumberOfFilteredElements: number = 0;
  filteredAndPaginatedArray: any[] = [];
  actionsClassCalculated: string = '';
  navClassCalculated: string = '';
  formControlNames: string[] = [];
  btnSaveExpandClass: string = '';
  createdEntries: any[] = [];
  deletedEntries: any[] = [];
  updatedEntries: any[] = [];
  selectedEntry!: IForm;
  InputType = InputType;
  form?: Form;
  isText = isTextDisplay;

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

  get columns(): IColumnConfig[] {
    if (this._columns.length === 0) {
      return this.formControlNames.map(formControlName => {
        let displayConfig = this.displayConfigsByFormControlName[formControlName];
        return { formControlName, label: displayConfig.label ? displayConfig.label : formControlName }
      })
    }
    return this._columns
      .filter(column => column.formControlName ? !!this.displayConfigsByFormControlName[column.formControlName] : false)
      .map(column => {
        if (!column.label) {
          let displayConfig = this.displayConfigsByFormControlName[column.formControlName];
          column.label = displayConfig.label ? displayConfig.label : column.formControlName
        }
        return column;
      })
  }

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
    return filteredLength > 0 
      ? `Showing ${startValue} to ${endValue} of ${filteredLength} entries`
      : 'No data shown' 
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

  get sortingType() {
    return this.paginationState.sortingType;
  }

  get sortingFormControlName() {
    return this.paginationState.sortingFormControlName
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
    let val = Number(this.navRight?.nativeElement.offsetWidth) 
    if (isNaN(val)) return 0
    return val 
  }

  get navRightSideWidth() { 
    return this.navMiddleWidth + this.navRightWidth 
  }

  getBtnSaveExpandClass() {
    return this.navContainerWidth < 440 ? ' btn-save-expand' : ''
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
      this.btnSaveExpandClass = this.getBtnSaveExpandClass()
    }
  }

  onCloseDestroyForm() {
    delete this['form'];
  }
  
  constructor(private toast: ToastService, private sanitized: DomSanitizer) {
  }

  debouncePagination = debounce((value: IPaginationState, entriesPerPageChange: number) => {
    this.paginationState = value
    this.triggerPaginationArrayChange()
    if (entriesPerPageChange) setTimeout(() => this.entriesForm.patchValue(value))
  }, 600)

  ngOnInit(): void {
    this.formControlNames = this.formControlWrapper.displayConfigs.map(cfg => cfg.formControlName);
    this.formControlNames.forEach(formControlName => 
      this.displayConfigsByFormControlName[formControlName] = this.formControlWrapper
        .displayConfigs.find(d => d.formControlName === formControlName)!)

    this.entriesForm.valueChanges.subscribe(() => {
      let value: IPaginationState = {
        entriesPerPage: this.entriesPerPage,
        searchFilter: this.searchFilter,
        currentPageNumber: this.currentPageNumber,
        sortingType: this.sortingType,
        sortingFormControlName: this.sortingFormControlName
      }
      let entriesPerPageChange: boolean = this.paginationState.entriesPerPage !== this.entriesPerPage;
      let searchFilterChange: boolean = this.paginationState.searchFilter !== this.searchFilter;
      let currentPageNumberChange: boolean = this.paginationState.currentPageNumber !== this.currentPageNumber;
      if (entriesPerPageChange || searchFilterChange || currentPageNumberChange) {
        if (entriesPerPageChange || searchFilterChange) value.currentPageNumber = 1;
        if (searchFilterChange) {
          this.debouncePagination(value, entriesPerPageChange)
          return;
        }
        this.paginationState = value
        this.triggerPaginationArrayChange()
        if (entriesPerPageChange) setTimeout(() => this.entriesForm.patchValue(value))
      }
    })
  }

  debounceResponsiveness = debounce(() => {
    this.handleResponsiveness()
  }, 1000)

  @HostListener('window:resize')
  onResize() {
    this.debounceResponsiveness();
  }

  ngAfterViewInit() {
    setTimeout(() => this.triggerPaginationArrayChange());
  }

  oldContainerWidth: number = 0;
  oldTableWidth: number = 0;
  currContainerWidth: number = 0;
  currTableWidth: number = 0;
  _removeFromEnd: number = 0;

  get removeFromEnd() {
    return this._removeFromEnd;
  }

  set removeFromEnd(removeFromEnd: number) {
    let max = this.formControlNames.length - 1;
    if (removeFromEnd < 0) this._removeFromEnd = 0
    else if (removeFromEnd > max) this._removeFromEnd = max
    else this._removeFromEnd = removeFromEnd
  }

  handleResponsiveness() {
    this.oldContainerWidth = this.currContainerWidth;
    this.oldTableWidth = this.currTableWidth;
    this.currContainerWidth = this.containerDiv.nativeElement.offsetWidth;
    this.currTableWidth = this.table.nativeElement.offsetWidth;
    if (this.oldContainerWidth === this.currContainerWidth && this.oldTableWidth === this.currTableWidth) 
      return
      
    this.tableLoader.start()
    this.removeFromEnd--;
    let isInitialInRange: boolean = true;
    const handleResponsivenessInternal = () => {
      setTimeout(() => {
        this.currContainerWidth = this.containerDiv.nativeElement.offsetWidth;
        this.currTableWidth = this.table.nativeElement.offsetWidth;
        if (this.currTableWidth > this.currContainerWidth) {
          this.removeFromEnd++
          isInitialInRange = false;
          handleResponsivenessInternal()
        } else if (isInitialInRange && this.removeFromEnd - 1 >= 0) {
          this.removeFromEnd--;
          handleResponsivenessInternal();
        } else {
          this.tableLoader.stop()
        }
      })
    }
    handleResponsivenessInternal()
  }

  createEntry(value: IForm) {
    if (this.ajax) {
      this.tableLoader.start()
      this.ajax.onCreate(value)
        .then(() => {
          this.createModal.closeModal()
          this.triggerPaginationArrayChange()
          this.toast.showSuccess(`Update successful`, `Successfully created "${this._getDisplayName(value)}" entry.`)      
          this.selectedEntry = null as any;
        }, error => {
          let errorMessage = this.getErrorMessage(error);
          this.tableLoader.stop();
          this.toast.showError(`Create for "${this._getDisplayName(value)}" failed`, errorMessage);
        })
      return;
    }

    this.createdEntries.push(value);
    this.createModal.closeModal();
    this.toast.showSuccess('Create successful', `Successfully created entry "${this._getDisplayName(value)}"`)
    this.triggerPaginationArrayChange()
  }

  getErrorMessage(error: any) {
    let errorMessage = '';
    if (error) {
      if (typeof error === 'string') errorMessage = error;
      else if ('message' in error) errorMessage = error.message;
      else if ('error' in error && 'message' in error.error) errorMessage = error.error.message
      else errorMessage = JSON.stringify(error, null, 2);
    }
    if (errorMessage.length > ERROR_MESSAGE_MAX_LENGTH) {
      errorMessage = errorMessage.slice(0, ERROR_MESSAGE_MAX_LENGTH) + '...';
    }
    return errorMessage;
  }

  deleteEntry() {
    if (this.ajax) {
      this.tableLoader.start()
      this.ajax.onDelete(this.selectedEntry)
        .then(() => {
          this.deleteModal.closeModal()
          this.triggerPaginationArrayChange()
          this.toast.showSuccess('Delete successful', `Successfully deleted "${this.displayName}" entry.`)      
          this.selectedEntry = null as any;
        }, error => {
          let errorMessage = this.getErrorMessage(error);
          this.tableLoader.stop();
          this.toast.showError('Delete failed', errorMessage);
        })
      return;
    }

    let index = this._data.findIndex(o => o === this.selectedEntry)
    if (index === -1) {
      index = this.createdEntries.findIndex(c => c === this.selectedEntry)
      if (index === -1) {
        index = this.updatedEntries.findIndex(c => c === this.selectedEntry)
        if (index === -1) {
          this.deleteModal.closeModal()
          this.toast.showError('Deletion failure', `Entry "${this.displayName}" cannot be deleted because it doesn't exist.`)
          return
        }
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
    this.toast.showSuccess('Delete successful', `Successfully deleted "${this.displayName}" entry.`)
  }

  updateEntry(value: IForm) {
    if (this.ajax) {
      this.tableLoader.start()
      this.ajax.onUpdate(value)
        .then(newValue => {
          this.updateModal.closeModal()
          this.filteredAndPaginatedArray = this.filteredAndPaginatedArray.map(item => {
            if (item === this.selectedEntry) {
              item = newValue ? newValue : value;
            }
            return item;
          })
          this.tableLoader.stop()
          this.toast.showSuccess(`Update successful`, `Successfully update "${this.displayName}" entry.`)      
          this.selectedEntry = null as any;
        }, error => {
          let errorMessage = this.getErrorMessage(error);
          this.tableLoader.stop();
          this.toast.showError(`Update for "${this.displayName}" failed`, errorMessage);
        })
      return;
    }

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
    this.toast.showSuccess('Update successful', `Successfully updated entry "${this._getDisplayName(value)}"`);
  }

  onUpdateSubmitFn = (value: IForm) => {
    this.updateEntry(value)
  }

  onCreateSubmitFn = (value: IForm) => {
    this.createEntry(value)
  }

  getTitle(formControlName: string, value: any) {
    let displayConfig = this.displayConfigsByFormControlName[formControlName];
    if (isText(this.getInputType(formControlName))) return value[formControlName];
    return displayConfig.inputEntity.convertToDatatableValueReadOnly(value[formControlName], displayConfig)
  }

  isInitialDataLoaded: boolean = false;

  triggerPaginationArrayChange() {
    if (this.ajax) {
      this.tableLoader.start();
      this.ajax.loadData(this.paginationState, this.displayConfigsByFormControlName)
        .then(ajaxResponse => {
          let { count, data } = ajaxResponse;
          this.totalNumberOfFilteredElements = count
          this.filteredAndPaginatedArray = data
          if (!this.isInitialDataLoaded) {
            this.handleResponsiveness()
            this.isInitialDataLoaded = true;
            return
          }
          this.tableLoader.stop()
        })
      return;
    }

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
    if (!this.isInitialDataLoaded) {
      this.handleResponsiveness()
      this.isInitialDataLoaded = true;
    }
  }

  clearEntries() {
    this.createdEntries = []
    this.deletedEntries = []
    this.updatedEntries = []
  }

  rollbackChanges() {
    this._data = this._data.concat(this.createdEntries, this.updatedEntries, this.deletedEntries);
    this.clearEntries()
  }

  joinEntries() {
    this._data = this._data.concat(this.createdEntries, this.updatedEntries);
    this.clearEntries()
  }

  doSave() {
    this.tableLoader.start()
    this.onSaveEmitter({
      created: this.createdEntries,
      deleted: this.deletedEntries,
      updated: this.updatedEntries
    }).then(newEntries => {
      if (newEntries && Array.isArray(newEntries) && newEntries.length > 0) {
        this._data = this._data.concat(newEntries);
        this.clearEntries()
      } else {
        this.joinEntries()
      }
      this.tableLoader.stop()
      this.toast.showSuccess('Changes saved successfully!')
    }, error => {
      this.tableLoader.stop()
      let errorMessage = this.getErrorMessage(error);
      this.toast.showError('Save failed', errorMessage)
    })
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
    let html = this.displayConfigsByFormControlName[formControlName]
      .inputEntity
      .convertToDatatableValue(item, this.displayConfigsByFormControlName[formControlName])
      .trim();
    return this.sanitized.bypassSecurityTrustHtml(html)
  }

  openUpdateModal() {
    this.form = this.formControlWrapper.toForm(this.selectedEntry);
    this.updateForm.deepReset()
    this.updateModal.openModal()
  }

  printMemoryStats() {
    let thisKeys = Object.keys(this).filter(key => typeof (this as any)[key] !== 'function');
    let thisKeysLength = thisKeys.length;
    let config: any = {};
    thisKeys.forEach((key, index) => {
      console.log(`${index+1}/${thisKeysLength}`)
      config[key] = roughSizeOfObject((this as any)[key])
    })
    console.table(config)
  }

  openCreateModal() {
    this.form = this.formControlWrapper.toForm();
    //this.printMemoryStats()
    this.createForm.deepReset()
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

  trackByIndex(index: number) { 
    return index 
  }

  onSortClick(formControlName: string) {
    if (this.sortingFormControlName === formControlName) {
      if (this.sortingType === SortingType.ASC) {
        this.paginationState.sortingType = SortingType.DESC;
      } else {
        this.paginationState.sortingType = SortingType.ASC;
        this.paginationState.sortingFormControlName = '';
      }
    } else {
      this.paginationState.sortingType = SortingType.ASC;
      this.paginationState.sortingFormControlName = formControlName;
    }
    this.triggerPaginationArrayChange()
  }
}
