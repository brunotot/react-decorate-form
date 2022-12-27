import ValidatorService from "../../../service/ValidatorService";
import ErrorMessage from "../../../constants/ErrorMessage";

export default function NotNull(props?: string) {
	return ValidatorService.buildFieldValidatorDecorator<any>({
		isValid: (value) => ({
			key: "NotNull",
			message: props ?? ErrorMessage.NotNull(),
			valid: value != null,
		}),
	});
}
