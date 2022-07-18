import { messages } from '../../../constants/messages';
import { getValidateDecoratorFn } from '../BaseValidatorDecorator';
import { IValidateMetadata } from './ValidatorDecorator';

export interface IMinLengthValidateMetadata {
  message?: string;
  minLength: number;
}

export default function MinLength(
  minLengthValidateMetadata: IMinLengthValidateMetadata | number
) {
  let message: string =
    typeof minLengthValidateMetadata === 'number'
      ? messages.buildMinLengthValidationMessage(minLengthValidateMetadata)
      : minLengthValidateMetadata.message ||
        messages.buildMinLengthValidationMessage(
          minLengthValidateMetadata.minLength
        );

  let minLength: number =
    typeof minLengthValidateMetadata === 'number'
      ? minLengthValidateMetadata
      : minLengthValidateMetadata.minLength;

  let validateMetadata: IValidateMetadata = {
    message: message,
    isValid: (value: string) => String(value).length >= minLength,
  };

  return getValidateDecoratorFn(validateMetadata);
}
