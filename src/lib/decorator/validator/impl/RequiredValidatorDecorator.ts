import { messages } from '../../../constants/messages';
import { getValidateDecoratorFn } from '../BaseValidatorDecorator';
import { IValidateMetadata } from './ValidatorDecorator';

export default function Required(message?: string) {
  let validateMetadata: IValidateMetadata = {
    message: message || messages.requiredInvalid,
    isValid: (value: any) => {
      if (value === undefined) {
        return false;
      }
      let jsonValue = JSON.parse(JSON.stringify(value));
      return Array.isArray(jsonValue)
        ? jsonValue.length > 0
        : typeof jsonValue === 'string'
        ? jsonValue.length > 0
        : typeof jsonValue === 'number'
        ? true
        : !!jsonValue;
    },
  };
  return getValidateDecoratorFn(validateMetadata);
}
