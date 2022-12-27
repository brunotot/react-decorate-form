import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../constants/InferredType";
import {
	extractDefaultValidatorProps,
	ValueOrObjectValidatorProps,
} from "../../../utils/TypeUtils";

export default function ExactLength(
	props: ValueOrObjectValidatorProps<number>
) {
	const { value: exact, message } = extractDefaultValidatorProps(
		props,
		"ExactLength"
	);
	return ValidatorService.buildFieldValidatorDecorator<string>({
		expectedType: InferredType.STRING,
		isValid: (value) => ({
			key: "ExactLength",
			message,
			valid: (value ?? "").length === exact,
		}),
	});
}
