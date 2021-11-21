import { InputType } from "../InputType";
import InputEntity from "./base/InputEntity";

class URLEntity extends InputEntity<URL> {
  constructor() {
    super(InputType.URL)
  }

  override convertToDisplayValue(value: URL | string | null): string {
    if (value instanceof URL) return (value as URL).toString()
    return !!value ? value as string : '';
  }

  override convertToFormValue(value: URL | string | null): URL | null {
    if (value instanceof URL) return value as URL;
    if (!value || typeof value !== 'string') return this.getDefaultFormValue();
    try {
      return new URL(value)
    } catch (e) {
      return null;
    }
  }
}

export default new URLEntity();