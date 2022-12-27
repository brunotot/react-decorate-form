import ValidatorService from "../../../service/ValidatorService";
import ErrorMessage from "../../../constants/ErrorMessage";
import InferredType from "../../../constants/InferredType";

export type SizeProps = {
	min?: number;
	max?: number;
	message?: string;
};

export default function Size(props: SizeProps) {
	const { min = 0, max = Infinity } = props;
	const message = props.message ?? ErrorMessage.Size(min, max);
	return ValidatorService.buildFieldValidatorDecorator<any[]>({
		expectedType: InferredType.ARRAY,
		isValid: (value) => ({
			key: "Size",
			message,
			valid: value.length >= min && value.length <= max,
		}),
	});
}
