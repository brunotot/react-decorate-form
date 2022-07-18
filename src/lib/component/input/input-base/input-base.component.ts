import { Component, OnInit, Optional, ViewEncapsulation } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { InputType } from '../../../types/input-types';
import { VIEW_PROVIDERS, buildProviders } from '../../../setup/provider-setup';
import InputConfigComponent from '../InputConfigComponent';
import { getEmoji, getName } from 'language-flag-colors';
import FormHandler, { IInputProperty } from '../../../handler/FormHandler';

@Component({
  selector: 'ia-input',
  templateUrl: './input-base.component.html',
  styleUrls: ['./input-base.component.scss'],
  providers: buildProviders(InputBaseComponent),
  viewProviders: VIEW_PROVIDERS,
  encapsulation: ViewEncapsulation.None,
})
export class InputBaseComponent extends InputConfigComponent implements OnInit {
  InputType = InputType;

  constructor(@Optional() formGroupDirective: FormGroupDirective) {
    super(formGroupDirective);
  }

  ngOnInit(): void {}
}

interface ILanguageConfig {
  code: string;
  name: string;
  label: string;
  icon: string;
  inputProperties: IInputProperty[];
}

@Component({
  selector: 'ia-input-multilanguage',
  template: /*html*/ `
    <div
      [ngClass]="
        'multilanguage-container '.concat(
          'mat-form-field-appearance-',
          props.appearance
        )
      "
      style="margin-bottom: 1.75em;"
    >
      <label
        *ngIf="props.label"
        class="multilanguage-label mat-card mat-form-field-label"
        >{{ props.label }}</label
      >
      <mat-tab-group
        mat-stretch-tabs
        [ngClass]="'mat-form-field-'.concat(props.appearance)"
        style="
          display: inherit;
          position: inherit;
          top: inherit;
          left: inherit;
          right: inherit;
          bottom: inherit;
          pointer-events: inherit;
        "
      >
        <ng-container *ngFor="let languageConfig of languageConfigs">
          <mat-tab [label]="languageConfig.label">
            <div
              style="color: initial"
              *ngFor="let inputProperty of languageConfig.inputProperties"
            >
              <ia-input
                [name]="
                  propertyName +
                  '.' +
                  languageConfig.code +
                  '.' +
                  inputProperty.propertyName
                "
                [validators]="inputProperty.validatorFns"
                [type]="inputProperty.inputType"
                [props]="inputProperty.props"
              >
              </ia-input>
            </div>
          </mat-tab>
        </ng-container>
      </mat-tab-group>
    </div>
  `,
  styles: [
    /*css*/ `
      .multilanguage-container {
        position: relative;
      }
    `,

    /*css*/ `
      .multilanguage-container > .multilanguage-label {
        box-shadow: none !important;
        position: absolute;
        top: -0.35rem;
        padding: 0.125rem 0.25rem;
        border-radius: 100vmax;
        left: 0.5rem;
        transform: scale(0.8);
        display: inherit !important;
        width: auto !important;
        z-index: 1;
      }
    `,

    /*css*/ `
      .multilanguage-container .mat-tab-group {
        border: 1px solid currentColor;
        border-radius: 5px;
      }
    `,

    /*css*/ `
      .multilanguage-container .mat-tab-group .mat-tab-body-content {
        padding: 1.5rem 1.5rem 0 1.5rem;
      }
    `,
  ],
  providers: buildProviders(InputMultilanguageComponent),
  viewProviders: VIEW_PROVIDERS,
  encapsulation: ViewEncapsulation.None,
})
export class InputMultilanguageComponent
  extends InputConfigComponent
  implements OnInit
{
  languageConfigs: ILanguageConfig[] = [];

  override get inputType(): InputType {
    return InputType.MULTILANGUAGE;
  }

  constructor(@Optional() formGroupDirective: FormGroupDirective) {
    super(formGroupDirective);
  }

  applyDefaultProps(langCode: string, oldProps: any) {
    return {
      ...oldProps,
      label: `${getEmoji(langCode)} ${oldProps.label}`,
    };
  }

  ngOnInit(): void {
    let languages: string[] = this.props.languages;
    this.languageConfigs = languages.map((code) => {
      let icon = getEmoji(code) as string;
      let name = (getName(code) as string) || code;
      let formClass = this.props.formClass;
      let currentFormObject = this.value[code];
      /*let formObject = !!currentFormObject
        ? currentFormObject
        : new formClass();*/
      let formObject = new formClass();
      let formHandler = new FormHandler(formObject);
      let inputProperties = formHandler.inputProperties.map((inputProperty) => {
        let { props } = inputProperty;
        inputProperty.props = {
          ...props,
          label: `${icon} ${props.label}`,
        };
        return inputProperty;
      });
      return {
        code,
        icon,
        name,
        label: `${icon} ${name}`,
        inputProperties,
      };
    });
  }
}
