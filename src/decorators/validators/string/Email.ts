import ErrorMessage from "../../../constants/ErrorMessage";
import Pattern from "./Pattern";

export default function Email(props?: string) {
	return Pattern({
		key: "Email",
		regex:
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
		message: props ?? ErrorMessage.Email(),
	});
}
