import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../constants/InferredType";
import ErrorMessage from "../../../constants/ErrorMessage";

export type RangeLengthProps = {
	min: number;
	max: number;
	message?: string;
};

export default function RangeLength(props: RangeLengthProps) {
	const { min, max } = props;
	const message = props.message ?? ErrorMessage.RangeLength(min, max);
	return ValidatorService.buildFieldValidatorDecorator<string>({
		expectedType: InferredType.STRING,
		isValid: (value) => ({
			key: "RangeLength",
			message,
			valid: (value ?? "").length >= min && (value ?? "").length <= max,
		}),
	});
}
