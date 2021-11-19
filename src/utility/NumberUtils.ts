export function getDefaultNumberValue(): null {
  return null;
}

export function getInitialNumberValue(value: any): number | null {
  if (isNaN(value)) getDefaultNumberValue()
  return Number(value)
}