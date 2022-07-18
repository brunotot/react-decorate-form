import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ia-errors',
  template: /*html*/ `
    <div class="ia-errors-container" *ngIf="display">
      <mat-error *ngFor="let error of errors"> {{ error }} </mat-error>
    </div>
  `,
  styles: [
    /*css*/ `
      .ia-errors-container {
        font-size: 75%;
        margin-top: 0.25em;
        padding: 0 1em;
      }
    `,
  ],
})
export class ErrorsComponent implements OnInit {
  @Input() errors: string[] = [];
  @Input() display: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
