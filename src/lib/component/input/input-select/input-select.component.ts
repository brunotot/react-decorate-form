import { Component, OnInit, Optional } from "@angular/core";
import { FormGroupDirective } from "@angular/forms";
import { InputType } from "../../../types/input-types";
import { VIEW_PROVIDERS, buildProviders } from "../../../setup/provider-setup";
import InputConfigComponent from "../InputConfigComponent";
import { SelectOption } from "../../../types/select-types";

@Component({
  selector: "ia-input-select",
  templateUrl: "./input-select.component.html",
  styleUrls: ["./input-select.component.scss"],
  providers: buildProviders(InputSelectComponent),
  viewProviders: VIEW_PROVIDERS,
})
export class InputSelectComponent
  extends InputConfigComponent
  implements OnInit
{
  override get inputType(): InputType {
    return InputType.SELECT;
  }

  get items(): SelectOption[] {
    return (this.props.items as SelectOption[]).sort((a, b) => {
      if (a.text < b.text) {
        return -1;
      }
      if (a.text > b.text) {
        return 1;
      }
      return 0;
    });
  }

  isMultiple!: boolean;

  constructor(@Optional() formGroupDirective: FormGroupDirective) {
    super(formGroupDirective);
  }

  compareObjects(id: any, o2: any): boolean {
    if (o2 != null && typeof o2 === "object" && "id" in o2) {
      return String(id) === String(o2.id);
    }
    return String(id) === String(o2);
  }

  ngOnInit(): void {}
}
