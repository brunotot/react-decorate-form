import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../constants/InferredType";
import {
	extractDefaultValidatorProps,
	ValueOrObjectValidatorProps,
} from "../../../utils/TypeUtils";

export default function MaxLength(props: ValueOrObjectValidatorProps<number>) {
	const { value: max, message } = extractDefaultValidatorProps(
		props,
		"MaxLength"
	);
	return ValidatorService.buildFieldValidatorDecorator<string>({
		expectedType: InferredType.STRING,
		isValid: (value) => ({
			key: "MaxLength",
			message,
			valid: (value ?? "").length <= max,
		}),
	});
}
