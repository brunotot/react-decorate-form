import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../constants/InferredType";
import ErrorMessage from "../../../constants/ErrorMessage";

export type DigitsProps = {
	maxInteger?: number;
	maxFraction?: number;
	message?: string;
};

function validateDigits(
	number: number,
	maxInteger: number,
	maxFraction: number
): boolean {
	if (
		(maxInteger !== Infinity && maxInteger % 1 !== 0) ||
		(maxFraction !== Infinity && maxFraction % 1 !== 0)
	) {
		throw new Error(ErrorMessage.InvalidDigitsParams(maxInteger, maxFraction));
	}

	const parts = number.toString().split(".");
	const integerPart = parts[0];
	const fractionPart = parts[1] || "";

	return integerPart.length <= maxInteger && fractionPart.length <= maxFraction;
}

export default function Digits(props: DigitsProps) {
	const { maxInteger = Infinity, maxFraction = Infinity } = props;
	const message = props.message ?? ErrorMessage.Digits(maxInteger, maxFraction);
	return ValidatorService.buildFieldValidatorDecorator<number>({
		expectedType: InferredType.NUMBER,
		isValid: (value) => ({
			key: "Digits",
			message,
			valid: validateDigits(value, maxInteger, maxFraction),
		}),
	});
}
