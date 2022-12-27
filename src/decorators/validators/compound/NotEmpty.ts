import ValidatorService from "../../../service/ValidatorService";
import ErrorMessage from "../../../constants/ErrorMessage";
import InferredType from "../../../constants/InferredType";

export default function NotEmpty(props?: string) {
	return ValidatorService.buildFieldValidatorDecorator<string | object | any[]>(
		{
			expectedType: [
				InferredType.STRING,
				InferredType.GENERIC_OBJECT,
				InferredType.ARRAY,
			],
			isValid: (value) => ({
				key: "NotEmpty",
				message: props ?? ErrorMessage.NotEmpty(),
				valid:
					typeof value === "object"
						? Object.keys(value).length > 0
						: value.length > 0,
			}),
		}
	);
}

/*
TODO: 

@DecimalMax: Validates that a number is less than or equal to a maximum value, with the option to specify the number of decimal places.
@DecimalMin: Validates that a number is greater than or equal to a minimum value, with the option to specify the number of decimal places.
@Digits: Validates that a number has a certain number of digits and a certain number of decimal places.
@Future: Validates that a date is in the future.
@Max: Validates that a number is less than or equal to a maximum value.
@Min: Validates that a number is greater than or equal to a minimum value.
@NotBlank: Validates that a string is not blank (e.g., " " is considered blank).
@NotEmpty: Validates that a string, array, or collection is not empty.
@NotNull: Validates that an object is not null.
@Null: Validates that an object is null.
@Past: Validates that a date is in the past.
@Size: Validates that a string, array, or collection is of a certain size.

*/
