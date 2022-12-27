import { createContext, useEffect, useMemo, useState } from "react";
import DecoratorService from "../service/DecoratorService";
import {
	ClassType,
	EvaluateValidationTypes,
	ValidationEvaluationType,
} from "../service/ValidatorService";
import React from "react";

/* If state type is Class */
export type Model<T> = Pick<
	T,
	{ [K in keyof T]: T[K] extends Function ? never : K }[keyof T]
>;

export type HTMLFormProps = React.DetailedHTMLProps<
	React.FormHTMLAttributes<HTMLFormElement>,
	HTMLFormElement
>;

export type FormProps<T> = HTMLFormProps & {
	handleSubmit: (data: T) => any;
	model: ClassType<T>;
	value: any;
};

export const FormContext = createContext<FormContextType<any>>(null as any);

export type ErrorsType = {
	[key: string]: ValidationEvaluationType[];
};

export type FormContextType<T> = {
	state: T;
	errors: ErrorsType;
	decoratorService: DecoratorService;
};

function isValid(errors: ErrorsType): boolean {
	return Object.values(errors).every((validationEvaluations) =>
		validationEvaluations.every((evaluation) => evaluation.valid)
	);
}

export default function Form<T>(props: FormProps<T>) {
	const { model: modelClass, value, handleSubmit, ...args } = props;

	const [errors, setErrors] = useState<ErrorsType>({});
	const decoratorService = useMemo(() => new DecoratorService(modelClass), []);
	const validators = decoratorService.getAllValidators();

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (isValid(errors)) {
			handleSubmit(decoratorService.buildTarget(value));
		}
	};

	function getErrors<T>(validations: EvaluateValidationTypes): ErrorsType {
		const targetObject = decoratorService.buildTarget<T>(value);
		let errors: ErrorsType = {};
		Object.entries(validations).forEach(([key, validators]) => {
			errors[key] = validators
				.map((validator) => validator((targetObject as any)[key]))
				.filter((evaluation) => !evaluation.valid);
		});
		return errors;
	}

	useEffect(() => {
		const allErrors = getErrors(validators);
		setErrors(allErrors);
	}, [value]);

	const context = {
		state: value,
		decoratorService,
		errors,
	};

	return (
		<FormContext.Provider value={context}>
			<form {...args} onSubmit={onSubmit}>
				{props.children}
			</form>
		</FormContext.Provider>
	);
}
