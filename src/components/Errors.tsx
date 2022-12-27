import { useContext } from "react";
import { FormContext } from "./Form";
import Error, { ErrorPropsMapperType } from "./Error";
import React from "react";

export type ErrorsProps = {
	name: string;
	render?: ErrorPropsMapperType;
};

const ERROR_CONTAINER_STYLE: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: "0.125rem",
};

export default function Errors(props: ErrorsProps) {
	const { name, render } = props;
	const { errors } = useContext(FormContext);
	const list = errors[name] ?? [];
	const hasErrors = list.length > 0;

	if (!hasErrors) {
		return <></>;
	}

	return (
		<div style={ERROR_CONTAINER_STYLE}>
			{list.map((validator) => (
				<Error
					name={name}
					validator={validator.key}
					key={validator.key}
					render={render}
				/>
			))}
		</div>
	);
}
