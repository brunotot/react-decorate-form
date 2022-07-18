import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  ButtonAppearance,
  ButtonColor,
  ButtonType,
} from "../../types/button-types";

@Component({
  selector: "ia-button",
  styles: [
    /*css*/ `
      .button-content {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        column-gap: 0.125rem;
        justify-content: center;
      }
    `,
  ],
  template: /*html*/ `
    <ng-container [ngSwitch]="appearance">
      <button
        *ngSwitchCase="'mat-button'"
        mat-button
        [attr.style]="css"
        [color]="color"
        [type]="type"
        [disabled]="disabled"
        (click)="onClick($event)"
      >
        <div class="button-content">
          <mat-icon *ngIf="icon">{{ icon }}</mat-icon>
          {{ label }}
        </div>
      </button>

      <button
        *ngSwitchCase="'mat-raised-button'"
        mat-raised-button
        [attr.style]="css"
        [color]="color"
        [type]="type"
        [disabled]="disabled"
        (click)="onClick($event)"
      >
        <div class="button-content">
          <mat-icon *ngIf="icon">{{ icon }}</mat-icon>
          {{ label }}
        </div>
      </button>

      <button
        *ngSwitchCase="'mat-flat-button'"
        mat-flat-button
        [attr.style]="css"
        [color]="color"
        [type]="type"
        [disabled]="disabled"
        (click)="onClick($event)"
      >
        <div class="button-content">
          <mat-icon *ngIf="icon">{{ icon }}</mat-icon>
          {{ label }}
        </div>
      </button>

      <button
        *ngSwitchCase="'mat-stroked-button'"
        mat-stroked-button
        [attr.style]="css"
        [color]="color"
        [type]="type"
        [disabled]="disabled"
        (click)="onClick($event)"
      >
        <div class="button-content">
          <mat-icon *ngIf="icon">{{ icon }}</mat-icon>
          {{ label }}
        </div>
      </button>

      <button
        *ngSwitchCase="'mat-icon-button'"
        mat-icon-button
        [attr.style]="css"
        [color]="color"
        [type]="type"
        [disabled]="disabled"
        (click)="onClick($event)"
      >
        <mat-icon>{{ icon }}</mat-icon>
      </button>

      <button
        *ngSwitchCase="'mat-fab'"
        mat-fab
        [attr.style]="css"
        [color]="color"
        [type]="type"
        [disabled]="disabled"
        (click)="onClick($event)"
      >
        <mat-icon>{{ icon }}</mat-icon>
      </button>

      <button
        *ngSwitchCase="'mat-mini-fab'"
        mat-mini-fab
        [attr.style]="css"
        [color]="color"
        [type]="type"
        [disabled]="disabled"
        (click)="onClick($event)"
      >
        <mat-icon>{{ icon }}</mat-icon>
      </button>
    </ng-container>
  `,
})
export class ButtonComponent implements OnInit {
  @Input() color: ButtonColor = "basic";
  @Input() type: ButtonType = "button";
  @Input() appearance: ButtonAppearance = "mat-button";
  @Input() disabled: boolean = false;
  @Input() link: boolean = false;
  @Input() icon: string = "";
  @Input() label: string = "";
  @Input() css: string = "";

  @Output("onClick") onClickEmitter: EventEmitter<any> = new EventEmitter();

  constructor() {}

  onClick(event: any) {
    this.onClickEmitter.next(event);
  }

  ngOnInit(): void {}
}
