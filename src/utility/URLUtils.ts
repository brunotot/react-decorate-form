export function getDefaultURLValue(): null {
  return null;
}

export function getInitialURLValue(value: any) {
  if (!value) return getDefaultURLValue()
  if (typeof value !== 'string') throw new Error(`Couldn't build URL. Input is type of ${typeof value}[${value}]`);
  return new URL(value)
}