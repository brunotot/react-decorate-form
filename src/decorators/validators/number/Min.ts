import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../constants/InferredType";
import {
	extractDefaultValidatorProps,
	ValueOrObjectValidatorProps,
} from "../../../utils/TypeUtils";

export default function Min(props: ValueOrObjectValidatorProps<number>) {
	const { value: min, message } = extractDefaultValidatorProps(props, "Min");
	return ValidatorService.buildFieldValidatorDecorator<number>({
		expectedType: InferredType.NUMBER,
		isValid: (value) => ({
			key: "Min",
			message,
			valid: value >= min,
		}),
	});
}
