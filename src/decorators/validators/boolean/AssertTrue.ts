import ValidatorService from "../../../service/ValidatorService";
import ErrorMessage from "../../../constants/ErrorMessage";
import InferredType from "../../../constants/InferredType";

export default function AssertTrue(props?: string) {
	return ValidatorService.buildFieldValidatorDecorator<boolean>({
		expectedType: InferredType.BOOLEAN,
		isValid: (value) => ({
			key: "AssertTrue",
			message: props ?? ErrorMessage.AssertTrue(),
			valid: value,
		}),
	});
}
