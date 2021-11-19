export function getInitialRangeValue(
  min: number, 
  max: number, 
  formValue: any
) {
  if (min >= max) throw new Error(`Min[${min}] is larger than max[${max}]`);
  return isNaN(formValue)
    ? Math.round((max + min) / 2)
    : Number(formValue)
}