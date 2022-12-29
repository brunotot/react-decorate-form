import React, { useContext, useState, useEffect } from "react";
import { FormContext } from "./Form";

export type ErrorPropsMapperType = (message: string) => JSX.Element;

export type ErrorProps = {
	name: string;
	validator: string;
	render?: ErrorPropsMapperType;
};

const ERROR_STYLE: React.CSSProperties = {
	color: "#d9534f",
	fontSize: "80%",
	fontWeight: "bold",
};

const DefaultError: ErrorPropsMapperType = (message: string) => (
	<span style={ERROR_STYLE}>{message}</span>
);

export default function Error(props: ErrorProps) {
	const buildErrorComponent = props.render ?? DefaultError;
	const { name, validator } = props;
	const { errors } = useContext(FormContext);
	const [errorMessage, setErrorMessage] = useState<string>("");

	useEffect(() => {
		const errorsOnField = errors[name] ?? [];
		const validationErrorMessage =
			errorsOnField.find((error) => error.key === validator)?.message ?? "";
		setErrorMessage(validationErrorMessage);
	}, [errors]);

	return <>{errorMessage && buildErrorComponent(errorMessage)}</>;
}
