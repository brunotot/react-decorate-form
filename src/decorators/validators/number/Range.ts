import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../constants/InferredType";
import ErrorMessage from "../../../constants/ErrorMessage";

export type RangeProps = {
	min: number;
	max: number;
	message?: string;
};

export default function Range(props: RangeProps) {
	const { min, max } = props;
	const message = props.message ?? ErrorMessage.Range(min, max);
	return ValidatorService.buildFieldValidatorDecorator<number>({
		expectedType: InferredType.NUMBER,
		isValid: (value) => ({
			key: "Range",
			message,
			valid: value >= min && value <= max,
		}),
	});
}
