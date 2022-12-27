import ValidatorService from "../../../service/ValidatorService";
import ErrorMessage from "../../../constants/ErrorMessage";
import InferredType from "../../../constants/InferredType";

export default function AssertFalse(props?: string) {
	return ValidatorService.buildFieldValidatorDecorator<boolean>({
		expectedType: InferredType.BOOLEAN,
		isValid: (value) => ({
			key: "AssertFalse",
			message: props ?? ErrorMessage.AssertFalse(),
			valid: !value,
		}),
	});
}
