import ValidatorService from "../../../service/ValidatorService";
import ErrorMessage from "../../../constants/ErrorMessage";
import InferredType from "../../../constants/InferredType";

const DEFAULT_KEY = "Pattern";

export default function Pattern(
	props:
		| RegExp
		| {
				regex: RegExp;
				message?: string;
				key?: string;
		  }
) {
	const isPropsRegex = props instanceof RegExp;
	const key = isPropsRegex
		? DEFAULT_KEY
		: !!(props as any).key
		? (props as any).key
		: DEFAULT_KEY;
	const regexSanitized = isPropsRegex ? props : (props as any).regex;
	const regexString = regexSanitized.toString();
	const errorMessage =
		isPropsRegex || !(props as any).message
			? ErrorMessage.Pattern(regexString)
			: (props as any).message!;
	return ValidatorService.buildFieldValidatorDecorator<string>({
		expectedType: InferredType.STRING,
		isValid: (value) => ({
			key,
			message: errorMessage,
			valid: (value ?? "").length === 0 || regexSanitized.test(value ?? ""),
		}),
	});
}
