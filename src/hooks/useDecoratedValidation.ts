import { useEffect, useMemo, useState } from "react";
import {
	Class,
	ErrorData,
	ValidationHandler,
} from "typescript-decorator-validation";

export type OnChangeHandlerType = (
	event: React.ChangeEvent<HTMLInputElement>
) => void;

export type DecoratedValidationType<K, T> = {
	value: K;
	setValue: React.Dispatch<React.SetStateAction<K>>;
	isValid: boolean;
	onChange: OnChangeHandlerType;
	detailedErrors: ErrorData<T>;
	errors: ErrorData<T>;
};

export type OnSubmitHandler<K> = (model: K) => void;

export default function useDecoratedValidation<K, T>(
	initialValue: K,
	model: Class<T>
): DecoratedValidationType<K, T> {
	const [value, setValue] = useState<K>(initialValue);
	const validationHandler = useMemo(
		() => new ValidationHandler<T>(model as any),
		[]
	);
	const [detailedErrors, setDetailedErrors] = useState<ErrorData<T>>({});

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue({
			...value,
			[event.target.name]: event.target.value,
		});
	};

	useEffect(
		() => setDetailedErrors(validationHandler.getErrors(value as Object)),
		[value]
	);

	const isValid = !validationHandler.hasErrors(value as Object);

	return {
		isValid,
		value,
		setValue,
		onChange,
		errors: detailedErrors,
		detailedErrors,
	};
}
