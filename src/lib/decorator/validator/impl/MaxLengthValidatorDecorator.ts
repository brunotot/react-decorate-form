import { messages } from '../../../constants/messages';
import { getValidateDecoratorFn } from '../BaseValidatorDecorator';
import { IValidateMetadata } from './ValidatorDecorator';

export interface IMaxLengthValidateMetadata {
  message?: string;
  maxLength: number;
}

export default function MaxLength(
  maxLengthValidateMetadata: IMaxLengthValidateMetadata | number
) {
  let message: string =
    typeof maxLengthValidateMetadata === 'number'
      ? messages.buildMaxLengthValidationMessage(maxLengthValidateMetadata)
      : maxLengthValidateMetadata.message ||
        messages.buildMaxLengthValidationMessage(
          maxLengthValidateMetadata.maxLength
        );

  let maxLength: number =
    typeof maxLengthValidateMetadata === 'number'
      ? maxLengthValidateMetadata
      : maxLengthValidateMetadata.maxLength;

  let validateMetadata: IValidateMetadata = {
    message: message,
    isValid: (value: string) => String(value).length <= maxLength,
  };

  return getValidateDecoratorFn(validateMetadata);
}
