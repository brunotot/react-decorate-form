import { messages } from '../../../constants/messages';
import Pattern, { IPatternValidateMetadata } from './PatternValidatorDecorator';

export default function Email(message?: string) {
  let validateMetadata: IPatternValidateMetadata = {
    message: message || messages.emailInvalid,
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  };
  return Pattern(validateMetadata);
}
