import React from "react";
import { useState } from "react";
import { Form } from "react-decorate-form";
import { Errors } from "react-decorate-form";
import FormControl from "./component/FormControl";
import UserForm, { UserFormFields } from "./model/UserForm";
import "./App.css";

function App() {
	const [formData, setFormData] = useState<UserFormFields>({
		age: 0,
		url: "",
		password: "",
		firstName: "",
		lastName: "",
		confirmPassword: "",
	});

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (objectData: UserForm) => {
		alert(JSON.stringify(objectData, null, 2));
	};

	return (
		<div className="card card__form border-info shadow">
			<Form handleSubmit={handleSubmit} model={UserForm} value={formData}>
				<div className="card-header fs-2">User form</div>
				<div className="card-body">
					<FormControl
						label="First name"
						name="firstName"
						required={true}
						placeholder="John"
						onChange={onChange}
					/>
					<FormControl
						label="Last name"
						required={true}
						name="lastName"
						onChange={onChange}
						placeholder="Doe"
					/>
					<FormControl
						label="Age"
						required={true}
						name="age"
						onChange={onChange}
						placeholder="Enter your age"
						type="number"
					/>
					<FormControl
						label="Password"
						name="password"
						required={true}
						onChange={onChange}
						placeholder="Enter a strong password"
						type="password"
					/>
					<FormControl
						label="Confirm password"
						name="confirmPassword"
						required={true}
						placeholder="Enter a strong password"
						onChange={onChange}
						type="password"
					/>
					<Errors name="passwordsMatch" />
					<FormControl
						label="Personal Website URL"
						name="url"
						placeholder="https://www.google.com"
						onChange={onChange}
					/>
					<button className="btn btn-primary mt-4" type="submit">
						Submit
					</button>
				</div>
			</Form>
		</div>
	);
}

export default App;
