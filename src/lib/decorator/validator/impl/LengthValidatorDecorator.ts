import { messages } from '../../../constants/messages';
import { getValidateDecoratorFn } from '../BaseValidatorDecorator';
import { IValidateMetadata } from './ValidatorDecorator';

export interface ILengthValidateMetadata {
  message?: string;
  minLength: number;
  maxLength: number;
}

export default function Length(
  lengthValidateMetadata: ILengthValidateMetadata
) {
  let { minLength, maxLength } = lengthValidateMetadata;
  let message: string = !!lengthValidateMetadata.message
    ? lengthValidateMetadata.message
    : messages.buildLengthValidationMessage(minLength, maxLength);

  let validateMetadata: IValidateMetadata = {
    message: message,
    isValid: (value: string) => {
      let valString = String(value);
      let valStringLength = valString.length;
      return valStringLength >= minLength && valStringLength <= maxLength;
    },
  };

  return getValidateDecoratorFn(validateMetadata);
}
