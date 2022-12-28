import ValidatorService, {
	FieldValidatorBuilderProps,
} from "../../../service/ValidatorService";

export type RuleProps<T> = FieldValidatorBuilderProps<T>;

export default function Rule<T>(props: RuleProps<T>) {
	return ValidatorService.buildFieldValidatorDecorator<T>(props);
}
