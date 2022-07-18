function buildLengthValidationMessage(
  minLength: number,
  maxLength: number
): string {
  return `Entry must contain between ${minLength} and ${maxLength} characters`;
}

function buildMaxLengthValidationMessage(maxLength: number): string {
  return `Entry can contain up to ${maxLength} characters`;
}

function buildMinLengthValidationMessage(minLength: number): string {
  return `Entry must contain at least ${minLength} characters`;
}

const messages = {
  invalidDateFormat: 'Invalid date format',
  deleteSuccess: 'Successfully deleted entry',
  updateSuccess: 'Successfully updated entry',
  createSuccess: 'Successfully created an entry',
  closeSnack: 'x',
  emailInvalid:
    "Entry field must be in a format of an email 'john.doe@mail.com'",
  urlInvalid:
    "Entry field must be in a format of a URL 'https://www.john-doe.com'",
  requiredInvalid: 'Entry field is mandatory',
  patternInvalid: "Entry field doesn't comply to necessary pattern",
  buildLengthValidationMessage,
  buildMaxLengthValidationMessage,
  buildMinLengthValidationMessage,
};

export { messages };
