import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import ReactiveInput from '../../../model/ReactiveInput';
import VIEW_PROVIDERS, { buildProviders } from '../../../model/Provider';
import { ValidationStatus } from '../../../model/ValidationStatus';
import { IVariableGroupValidator } from '../../../utility/InputEntityUtils';

@Component({
  selector: 'rib-no-browser-support',
  templateUrl: './no-browser-support.component.html',
  styleUrls: ['./no-browser-support.component.scss', './../../../../assets/core/scss/style.scss'],
  providers: buildProviders(NoBrowserSupportComponent),
  viewProviders: VIEW_PROVIDERS,
  encapsulation: ViewEncapsulation.None
})
export class NoBrowserSupportComponent extends ReactiveInput implements OnInit {  
  getGroupVariableClass(globalValidationStatus: ValidationStatus, index: number) {
    let { value } = this.displayConfig.inputEntity.variableGroupValidators[index];
    let { pattern } = this.regexInputs[index];
    if (globalValidationStatus === this.ValidationStatus.IDLE) return '';
    let isValid = value.match(pattern);
    return isValid
      ? 'input-validation-valid'
      : 'input-validation-invalid'
  }

  handleVariableGroupValidity() {
    let config: any = this.form.controls[this.displayConfig.formControlName]?.errors || {};
    for (let variableGroupValidator of this.displayConfig.inputEntity.variableGroupValidators) {
      let { value, index } = variableGroupValidator;
      let { pattern, key } = this.regexInputs[index];
      let isValid = !!value.match(pattern);
      this.displayConfig.inputEntity.variableGroupValidators[index].isValid = isValid;
      if (isValid) {
        delete config[key];
      } else {
        config[key] = true;
      }
    }
    setTimeout(() => this.form.controls[this.displayConfig.formControlName]?.setErrors(config));
  }

  onVariableGroupInput(variableGroupValidator: IVariableGroupValidator) {
    let { value, index } = variableGroupValidator;
    let { pattern, key } = this.regexInputs[index];
    let isValid = !!value.match(pattern);
    this.displayConfig.inputEntity.variableGroupValidators[index].isValid = isValid;
    let val = this.displayConfig.inputEntity.formatInputsToUsedEntity(this.displayConfig.inputEntity.variableGroupValidators);
    this.writeValue(val);
    this.handleVariableGroupValidity();
  }

  constructor() { 
    super() 
  }

  trackByRegexInput(index: number): number {
    return index;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.handleVariableGroupValidity();
  }
}
