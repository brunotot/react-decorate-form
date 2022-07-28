import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import DisplayContentBaseComponent from "../DisplayContentBaseComponent";
import { SelectOption } from "../../../types/select-types";

@Component({
  selector: "ia-display-select",
  templateUrl: "./ia-display-select.component.html",
  styleUrls: ["./ia-display-select.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DisplaySelectComponent
  extends DisplayContentBaseComponent
  implements OnInit
{
  constructor() {
    super();
  }

  extraCount: number = 0;
  dataFormatted: SelectOption[] = [];
  dataFormattedText: string = "";

  public static override getSearchableString(data: any, props: any): string {
    return DisplaySelectComponent.getSelectedOptions(props.items, data)
      .map((selectOption) => selectOption.text)
      .join(" ");
  }

  private static getSelectedOptions(
    propsList: any[],
    selectionList: any[]
  ): SelectOption[] {
    let currentValue = selectionList;
    let currentValueArray = Array.isArray(currentValue)
      ? currentValue
      : currentValue === 0 || !!currentValue
      ? [currentValue]
      : [];
    currentValueArray = currentValueArray.map((currentValue) => {
      if (
        currentValue != null &&
        typeof currentValue === "object" &&
        "id" in currentValue
      ) {
        return currentValue.id;
      }
      return currentValue;
    });
    return propsList.filter((selectOption: SelectOption) =>
      currentValueArray.includes(selectOption.id)
    );
  }

  ngOnInit(): void {
    let selectedData = DisplaySelectComponent.getSelectedOptions(
      this.props.items,
      this.data
    );
    let count = selectedData.length - 2;
    this.extraCount = count < 0 ? 0 : count;
    this.dataFormatted = selectedData;
  }
}
