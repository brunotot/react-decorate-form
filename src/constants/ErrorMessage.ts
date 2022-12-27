const ErrorMessage = {
	IncompatibleTypes: (
		className: string,
		property: string,
		expectedType: string[],
		actualType: string
	) =>
		`\n\nField "${property}" from class "${className}" does not comply used validator decorator.` +
		`\nThis decorator expects any of [${expectedType.join(
			", "
		)}] types but has received [${actualType}].\n`,
	MinLength: (min: number) => `Field must contain at least ${min} characters`,
	MaxLength: (max: number) =>
		`Field cannot contain more than ${max} characters`,
	NotEmpty: () => "Field is mandatory",
	AssertFalse: () => "Value must be falsy",
	AssertTrue: () => "Value must be truthy",
	Pattern: (regex: string) =>
		`Value doesn't conform regular expression "${regex}"`,
	Email: () => "Value is not a valid email",
	PasswordUppercaseViolation: () =>
		`Password must contain at least 1 uppercase letter`,
	PasswordLowercaseViolation: () =>
		`Password must contain at least 1 lowercase letter`,
	PasswordNumbersViolation: () => `Password must contain at least 1 number`,
	PasswordSpecialsViolation: () =>
		`Password must contain at least 1 special character`,
	PasswordLengthViolation: (length: number) =>
		`Password must be at least ${length} characters long`,
	URL: () => `The URL you entered is not a valid one`,
	Min: (value: number) => `Minimum allowed value is ${value}`,
	Max: (value: number) => `Maximum allowed value is ${value}`,
	Range: (min: number, max: number) =>
		`Value must be greater than or equal to ${min} and less than or equal to ${max}`,
	Digits: (maxInteger: number, maxFraction: number) =>
		`Integer part of the number can have a maximum of ${maxInteger} digits and fraction part a maximum of ${maxFraction}`,
	InvalidDigitsParams: (maxInteger: number, maxFraction: number) =>
		`maxInteger [${maxInteger}] and maxFraction [${maxFraction}] must be whole numbers`,
	ExactLength: (exact: number) =>
		`Value must contain exactly ${exact} characters`,
	RangeLength: (min: number, max: number) =>
		`Value must contain between ${min} and ${max} characters`,
	NotNull: () => `Value must be present`,
	Size: (min: number, max: number) =>
		`Array must contain between ${min} and ${max} elements`,
};

export default ErrorMessage;
