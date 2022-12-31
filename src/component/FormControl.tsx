import React from "react";
import { Errors } from "react-decorate-form";

export type FormControlProps = {
	required?: boolean;
	type?: string;
	placeholder?: string;
	name: string;
	label: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FormControl({
	type = "text",
	required = false,
	name,
	placeholder,
	label,
	onChange,
}: FormControlProps) {
	return (
		<div className="form-group row mb-2">
			<label
				htmlFor={name}
				data-required={required}
				className="col-form-label col-md-3"
			>
				{label}
				{!required && (
					<span className="small text-muted">&nbsp;(Optional)</span>
				)}
			</label>
			<div className="col-md-9">
				<input
					className="form-control mb-1"
					placeholder={placeholder}
					onChange={onChange}
					type={type}
					name={name}
					id={name}
				/>
				<Errors name={name} />
			</div>
		</div>
	);
}
