import { messages } from '../../../constants/messages';
import { getValidateDecoratorFn } from '../BaseValidatorDecorator';
import { IValidateMetadata } from './ValidatorDecorator';

export interface IPatternValidateMetadata {
  message?: string;
  regex: string | RegExp;
}

export default function Pattern(
  patternValidateMetadata: IPatternValidateMetadata
) {
  let { message, regex } = patternValidateMetadata;
  let validateMetadata: IValidateMetadata = {
    message: message || messages.patternInvalid,
    isValid: (value: string) => !value || new RegExp(regex).test(value),
  };
  return getValidateDecoratorFn(validateMetadata);
}
