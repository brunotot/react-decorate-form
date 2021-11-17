import { forwardRef } from "@angular/core";
import { ControlContainer, FormGroupDirective, NG_VALUE_ACCESSOR } from "@angular/forms";

const VIEW_PROVIDERS = [{ provide: ControlContainer, useExisting: FormGroupDirective }];
export default VIEW_PROVIDERS;

export function buildProviders(component: any) {
  return [
    { 
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => component),
    }
  ];
}