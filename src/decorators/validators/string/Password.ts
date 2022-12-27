import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../constants/InferredType";
import ErrorMessage from "../../../constants/ErrorMessage";

type PasswordProps = {
	uppercase?: boolean;
	lowercase?: boolean;
	numbers?: boolean;
	specials?: boolean;
	length?: number;
	message?: string;
};

export type PasswordRequiredProps = {
	uppercase: boolean;
	lowercase: boolean;
	numbers: boolean;
	specials: boolean;
	length: number;
};

const DEFAULT_PROPS: PasswordRequiredProps = {
	uppercase: false,
	lowercase: true,
	numbers: false,
	specials: false,
	length: 8,
};

type PasswordRegexesType = {
	uppercase: RegExp;
	lowercase: RegExp;
	numbers: RegExp;
	specials: RegExp;
};

const PASSWORD_REGEXES: PasswordRegexesType = {
	uppercase: /[A-Z]/,
	lowercase: /[a-z]/,
	numbers: /\d/,
	specials: /[^a-zA-Z0-9]/,
};

function isPasswordChunkInvalid(
	str: string,
	passwordRegexName: keyof PasswordRegexesType
): boolean {
	const matchers = str.match(PASSWORD_REGEXES[passwordRegexName]);
	return matchers === null || matchers.length === 0;
}

const PASSWORD_VALIDATOR_KEY = "Password";

export default function Password(
	props: PasswordProps = {
		...DEFAULT_PROPS,
		message: undefined,
	}
) {
	const uppercase = props.uppercase ?? DEFAULT_PROPS.uppercase;
	const lowercase = props.lowercase ?? DEFAULT_PROPS.lowercase;
	const numbers = props.numbers ?? DEFAULT_PROPS.numbers;
	const specials = props.specials ?? DEFAULT_PROPS.specials;
	const length = props.length ?? DEFAULT_PROPS.length;
	const definedMessage: string | undefined = props.message;

	function buildConstraintViolation(message: string) {
		return {
			key: PASSWORD_VALIDATOR_KEY,
			message: !!definedMessage ? definedMessage : message,
			valid: false,
		};
	}

	return ValidatorService.buildFieldValidatorDecorator<string>({
		expectedType: InferredType.STRING,
		isValid: (str) => {
			if (str.length < length) {
				return buildConstraintViolation(
					ErrorMessage.PasswordLengthViolation(length)
				);
			}
			if (uppercase && isPasswordChunkInvalid(str, "uppercase"))
				return buildConstraintViolation(
					ErrorMessage.PasswordUppercaseViolation()
				);
			if (lowercase && isPasswordChunkInvalid(str, "lowercase"))
				return buildConstraintViolation(
					ErrorMessage.PasswordLowercaseViolation()
				);
			if (numbers && isPasswordChunkInvalid(str, "numbers"))
				return buildConstraintViolation(
					ErrorMessage.PasswordNumbersViolation()
				);
			if (specials && isPasswordChunkInvalid(str, "specials"))
				return buildConstraintViolation(
					ErrorMessage.PasswordSpecialsViolation()
				);

			return {
				key: PASSWORD_VALIDATOR_KEY,
				valid: true,
				message: "",
			};
		},
	});
}
