import { Component, OnInit, ViewChild, Optional } from "@angular/core";
import { FormGroupDirective } from "@angular/forms";
import { VIEW_PROVIDERS, buildProviders } from "../../../setup/provider-setup";
import InputConfigComponent from "../InputConfigComponent";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";
import { InputType } from "../../../types/input-types";

@Component({
  selector: "ia-input-chips",
  templateUrl: "./input-chips.component.html",
  styleUrls: ["./input-chips.component.scss"],
  providers: buildProviders(InputChipsComponent),
  viewProviders: VIEW_PROVIDERS,
})
export class InputChipsComponent
  extends InputConfigComponent
  implements OnInit
{
  override get errors(): string[] {
    let value = this.getErrorsDisplay();
    if (this.chipList) {
      this.chipList.errorState = value.length > 0;
    }
    return value;
  }

  override get inputType(): InputType {
    return InputType.CHIPS;
  }

  @ViewChild("chipList") chipList: any;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  values: string[] = [];

  constructor(@Optional() formGroupDirective: FormGroupDirective) {
    super(formGroupDirective);
  }

  ngOnInit(): void {
    let initialValue = Array.isArray(this.value) ? this.value : [];
    this.values = initialValue;
    this.writeValue(this.values);
  }

  ngAfterViewInit(): void {
    this.validate();
  }

  validate() {
    this.chipList.errorState = this.hasErrors;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();
    if (value) {
      this.values.push(value);
      this.writeValue(this.values);
      this.onDefaultInput();
    }
    event.chipInput!.clear();
    this.validate();
  }

  remove(value: string): void {
    const index = this.values.indexOf(value);
    if (index >= 0) {
      this.values.splice(index, 1);
      this.writeValue(this.values);
    }
    this.validate();
    this.onDefaultInput();
  }
}
