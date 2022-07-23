import { DatePipe } from "@angular/common";
import { variables } from "../constants/variables";
import { isValuePresent } from "./object-utils";

function formatDate(date: any, localeId?: string): string {
  let localeIdNormalized: string = variables.localeId;
  if (isValuePresent(localeId)) {
    localeIdNormalized = localeId as string;
  }
  if (!isValuePresent(date)) {
    return "";
  }
  return new DatePipe(localeIdNormalized).transform(date) as string;
}

export { formatDate };
