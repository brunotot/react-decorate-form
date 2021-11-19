export function getDefaultDateValue(): null {
  return null;
}

function getInitialDateValueInternal(value: string | Date): Date | null {
  if (!value) return getDefaultDateValue();
  let date: Date = value as Date;
  if (typeof value === "string") {
    date = new Date(value);
    if (!date) throw new Error("Date input has invalid format: " + value)
  }
  return date;
}

export function getInitialMonthValue(value: string | Date): Date | null {
  return getInitialDateValueInternal(value);
}

export function getInitialDateValue(value: string | Date): Date | null {
  return getInitialDateValueInternal(value);
}

export function getInitialDateTimeValue(value: string | Date): Date | null {
  return getInitialDateValueInternal(value);
}