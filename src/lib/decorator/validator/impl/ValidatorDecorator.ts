import { getValidateDecoratorFn } from '../BaseValidatorDecorator';

export interface IValidateMetadata {
  message: string;
  isValid: (value: any, _this?: any) => boolean;
}

export default function Validator(validateMetadata: IValidateMetadata) {
  return getValidateDecoratorFn(validateMetadata);
}
