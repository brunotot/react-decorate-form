const TEMPLATE_DATATABLE_FILTER_NORMAL: string = /*html*/ `
  <ia-input-search
    [props]="filterSearchProps"
    (onChange)="onFilterSearchChange($event)"
  ></ia-input-search>

  <section
    [formGroup]="formGroup"
    class="filter-content-container ia-scrollbar ia-scrollbar-vertical"
  >
    <p *ngFor="let formControlName of formControlNamesBatch" [ngStyle]="getDisplayStyle(formControlName)">
      <ng-container *ngFor="let count of [getNonFilteredCount(formControlName)]">
        <mat-checkbox [formControlName]="formControlName">
          <div style="display: -webkit-box">
            <span style="white-space: normal; display: -webkit-box">{{
              formControlName
            }}</span>
            <filter-data-count
              [count]="count"
              [filteredCount]="getFilteredCount(formControlName)"
            ></filter-data-count>
          </div>
        </mat-checkbox>
      </ng-container>
    </p>
    <ia-button 
      *ngIf="formControlNames.length > formControlNamesBatch.length"
      appearance="mat-stroked-button"
      icon="add"
      label="Load more" 
      (onClick)="increaseBatch()"
    >
    </ia-button>
  </section>`;

const TEMPLATE_DATATABLE_FILTER_CHECKBOX: string = /*html*/ `
  <section
    [formGroup]="formGroup"
    class="filter-content-container ia-scrollbar ia-scrollbar-vertical"
  >
    <p *ngFor="let formControlName of formControlNamesBatch" [ngStyle]="getDisplayStyle(formControlName)">
      <ng-container *ngFor="let count of [getNonFilteredCount(formControlName)]">
        <mat-checkbox [formControlName]="formControlName">
          <div style="display: -webkit-box">
            <span style="white-space: normal; display: -webkit-box">
              <ia-display-checkbox
                [data]="formControlName === 'true'"
              ></ia-display-checkbox>
            </span>
            <filter-data-count
              [count]="count"
              [filteredCount]="getFilteredCount(formControlName)"
            ></filter-data-count>
          </div>
        </mat-checkbox>
      </ng-container>
    </p>
  </section>`;

const TEMPLATE_DATATABLE_FILTER_COLOR: string = /*html*/ `
  <ia-input-search
    [props]="filterSearchProps"
    (onChange)="onFilterSearchChange($event)"
  ></ia-input-search>

  <section
    [formGroup]="formGroup"
    class="filter-content-container ia-scrollbar ia-scrollbar-vertical"
  >
    <p *ngFor="let formControlName of formControlNamesBatch" [ngStyle]="getDisplayStyle(formControlName)">
      <ng-container *ngFor="let count of [getNonFilteredCount(formControlName)]">
        <mat-checkbox [formControlName]="formControlName">
          <div style="display: -webkit-box">
            <span style="white-space: normal; display: -webkit-box">
              <ia-display-color [data]="formControlName"></ia-display-color>
            </span>
            <filter-data-count
              [count]="count"
              [filteredCount]="getFilteredCount(formControlName)"
            ></filter-data-count>
          </div>
        </mat-checkbox>
      </ng-container>
    </p>
    <ia-button 
      *ngIf="formControlNames.length > formControlNamesBatch.length"
      appearance="mat-stroked-button"
      icon="add"
      label="Load more" 
      (onClick)="increaseBatch()"
    >
    </ia-button>
  </section>`;

const TEMPLATE_DATATABLE_FILTER_CONTENT: string = /*html*/ `
  <ng-container [ngSwitch]="inputType">
    <ia-filter-checkbox
      *ngSwitchCase="InputType.CHECKBOX"
      [inputProperty]="inputProperty"
      [datatableHandler]="datatableHandler"
      [resetSubject]="resetSubject"
    >
    </ia-filter-checkbox>

    <ia-filter-select
      *ngSwitchCase="InputType.SELECT"
      [inputProperty]="inputProperty"
      [datatableHandler]="datatableHandler"
      [resetSubject]="resetSubject"
    >
    </ia-filter-select>

    <ia-filter-date
      *ngSwitchCase="InputType.DATE"
      [inputProperty]="inputProperty"
      [datatableHandler]="datatableHandler"
      [resetSubject]="resetSubject"
    >
    </ia-filter-date>

    <ia-filter-chips
      *ngSwitchCase="InputType.CHIPS"
      [inputProperty]="inputProperty"
      [datatableHandler]="datatableHandler"
      [resetSubject]="resetSubject"
    >
    </ia-filter-chips>

    <ia-filter-color
      *ngSwitchCase="InputType.COLOR"
      [inputProperty]="inputProperty"
      [datatableHandler]="datatableHandler"
      [resetSubject]="resetSubject"
    >
    </ia-filter-color>

    <ia-filter-default
      *ngSwitchDefault
      [inputProperty]="inputProperty"
      [datatableHandler]="datatableHandler"
      [resetSubject]="resetSubject"
    >
    </ia-filter-default>
  </ng-container>`;

export {
  TEMPLATE_DATATABLE_FILTER_CHECKBOX,
  TEMPLATE_DATATABLE_FILTER_NORMAL,
  TEMPLATE_DATATABLE_FILTER_COLOR,
  TEMPLATE_DATATABLE_FILTER_CONTENT,
};
