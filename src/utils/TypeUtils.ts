import ErrorMessage from "../constants/ErrorMessage";

export type ValueOrObjectValidatorProps<T> =
	| T
	| {
			value: T;
			message?: string;
	  };

export type DefaultValidatorProps<T> = {
	value: T;
	message: string;
};

export function extractDefaultValidatorProps<T>(
	props: ValueOrObjectValidatorProps<T>,
	errorMessageKey: keyof typeof ErrorMessage
): DefaultValidatorProps<T> {
	const errorMessageFn = ErrorMessage[errorMessageKey] as any;
	const isComplexObject =
		typeof props === "object" && props != null && "value" in props;
	const value: T = isComplexObject ? (props as any).value : props;
	const message: string = isComplexObject
		? (props as any).message
		: errorMessageFn(value);
	return {
		value,
		message,
	};
}
