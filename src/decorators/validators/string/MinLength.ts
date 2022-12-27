import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../constants/InferredType";
import {
	extractDefaultValidatorProps,
	ValueOrObjectValidatorProps,
} from "../../../utils/TypeUtils";

export default function MinLength(props: ValueOrObjectValidatorProps<number>) {
	const { value: min, message } = extractDefaultValidatorProps(
		props,
		"MinLength"
	);
	return ValidatorService.buildFieldValidatorDecorator<string>({
		expectedType: InferredType.STRING,
		isValid: (value) => ({
			key: "MinLength",
			message,
			valid: (value ?? "").length >= min,
		}),
	});
}
