import { FormArray, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { InputType } from '../types/input-types';
import 'reflect-metadata';
import { METADATA_VALIDATION_KEY_PREFIX } from '../decorator/validator/BaseValidatorDecorator';

export const METADATA_KEY_PREFIX = 'input:formhandler:';

export function getMetadataKeyName(inputType: InputType) {
  return `${METADATA_KEY_PREFIX}${inputType}`;
}

export function getOwnPropertyNames(object: any): string[] {
  return Object.getOwnPropertyNames(object.__proto__).filter(
    (propertyName) => propertyName !== 'constructor'
  );
}

export interface IFormControls {
  [key: string]: FormControl | FormArray | FormGroup;
}

export interface IInputProperty {
  inputType: InputType;
  props: any;
  propertyName?: string;
  validatorFns?: ValidatorFn[];
}

export default class FormHandler {
  model: any;
  form!: FormGroup;
  inputProperties!: IInputProperty[];
  propertyNames!: string[];

  constructor(model: any, empty?: boolean) {
    this.model = typeof model === 'object' ? model : {};
    if (typeof empty === 'boolean' && empty) {
      let keys = getOwnPropertyNames(this.model);
      for (let key of keys) {
        this.model.__proto__[key] = undefined;
      }
    }
    this.init();
  }

  getInputPropertyByFieldName(fieldName: string): IInputProperty {
    return this.inputProperties.find(
      (inputProperty) => inputProperty.propertyName === fieldName
    ) as IInputProperty;
  }

  getModelValue(): any {
    let currentFormValue = this.form.value;
    this.propertyNames.forEach((propertyName) => {
      if (propertyName in currentFormValue) {
        this.model[propertyName] = currentFormValue[propertyName];
      }
    });
    return this.model;
  }

  errors(propertyName: string): string[] {
    let errorsAny: any = this.form.get(propertyName)?.errors || {};
    return Object.values(errorsAny);
  }

  private init() {
    this.initPropertyNames();
    this.initInputProperties();
    this.initForm();
  }

  private initInputProperties() {
    let inputProperties: IInputProperty[] = [];
    for (var propertyName of this.propertyNames) {
      const metadataKey = this.getMetadataKey(propertyName);
      if (metadataKey) {
        const inputType: InputType = this.getInputType(metadataKey);
        const metadataValue: any = this.getMetadataValue(
          metadataKey,
          propertyName
        );
        inputProperties.push({
          inputType: inputType,
          propertyName: propertyName,
          props: metadataValue,
          validatorFns: this.getValidatorFns(propertyName),
        });
      }
    }
    this.inputProperties = inputProperties;
  }

  private initPropertyNames() {
    this.propertyNames = getOwnPropertyNames(this.model);
  }

  private initForm() {
    let controls: IFormControls = this.getControls();
    this.form = new FormGroup(controls);
    this.form.valueChanges.subscribe(() => {
      let keys = Object.keys(this.form.controls);
      for (let key of keys) {
        this.form.controls[key].updateValueAndValidity({
          emitEvent: false,
        });
      }
    });
  }

  private getControls(): IFormControls {
    let controls: IFormControls = {};
    for (let inputProperty of this.inputProperties) {
      let propertyName: string = inputProperty.propertyName as string;
      let currentValue = this.model[propertyName];
      if (InputType.DATE === inputProperty.inputType) {
        controls[propertyName] = new FormControl(
          new Date(currentValue),
          inputProperty.validatorFns
        );
      } else if (InputType.MULTILANGUAGE === inputProperty.inputType) {
        let config: any = {};
        currentValue = currentValue || {};
        let languages = inputProperty.props.languages;
        let formClass = inputProperty.props.formClass;
        for (let key of languages) {
          let currentKeyValue = currentValue[key] || new formClass();
          let mlFormHandler = new FormHandler(currentKeyValue);
          let formHandlerConfig: any = {};
          formHandlerConfig = mlFormHandler.getControls();
          config[key] = new FormGroup(formHandlerConfig);
        }
        controls[propertyName] = new FormGroup(
          config,
          inputProperty.validatorFns
        );
      } else {
        controls[propertyName] = new FormControl(
          currentValue,
          inputProperty.validatorFns
        );
      }
    }
    return controls;
  }

  private getMetadataKey(propertyName: string): string {
    const metadataKeys: string[] = Reflect.getMetadataKeys(
      this.model,
      propertyName
    );
    const inputMetadataKeys: string[] = metadataKeys.filter((key: string) =>
      key.startsWith(METADATA_KEY_PREFIX)
    );
    return inputMetadataKeys[0];
  }

  private getValidatorFns(propertyName: string): ValidatorFn[] {
    let validatorFns: ValidatorFn[] = [];
    Reflect.getMetadataKeys(this.model, propertyName)
      .filter((key: string) => key.startsWith(METADATA_VALIDATION_KEY_PREFIX))
      .forEach((key: string) => {
        let validatorFn: ValidatorFn = this.getMetadataValue(key, propertyName);
        validatorFns.push(validatorFn);
      });
    return validatorFns;
  }

  private getInputType(metadataKey: string): InputType {
    const inputMetadataKeySanitized: string = metadataKey.substring(
      METADATA_KEY_PREFIX.length
    );
    return Number(inputMetadataKeySanitized) as InputType;
  }

  private getMetadataValue(metadataKey: string, propertyName: string): any {
    return Reflect.getMetadata(metadataKey, this.model, propertyName);
  }
}
