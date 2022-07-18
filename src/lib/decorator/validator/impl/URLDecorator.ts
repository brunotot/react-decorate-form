import { messages } from '../../../constants/messages';
import Pattern, { IPatternValidateMetadata } from './PatternValidatorDecorator';

export default function URL(message?: string) {
  let validateMetadata: IPatternValidateMetadata = {
    message: message || messages.urlInvalid,
    regex:
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
  };
  return Pattern(validateMetadata);
}
