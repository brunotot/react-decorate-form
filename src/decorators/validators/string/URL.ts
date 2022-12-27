import ErrorMessage from "../../../constants/ErrorMessage";
import Pattern from "./Pattern";

export default function URL(props?: string) {
	return Pattern({
		key: "URL",
		regex:
			/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
		message: props ?? ErrorMessage.URL(),
	});
}
