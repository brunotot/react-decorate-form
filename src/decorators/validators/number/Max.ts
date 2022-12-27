import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../constants/InferredType";
import {
	extractDefaultValidatorProps,
	ValueOrObjectValidatorProps,
} from "../../../utils/TypeUtils";

export default function Max(props: ValueOrObjectValidatorProps<number>) {
	const { value: min, message } = extractDefaultValidatorProps(props, "Max");
	return ValidatorService.buildFieldValidatorDecorator<number>({
		expectedType: InferredType.NUMBER,
		isValid: (value) => ({
			key: "Max",
			message,
			valid: value <= min,
		}),
	});
}
