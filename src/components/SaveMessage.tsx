import { SaveMessageProps } from "../utils/interfaces";

const SaveMessage = (props: SaveMessageProps) => {
	let dynamicName = "";
	if (props.saveMessage?.includes("Error")) {
		dynamicName = "save-message--error";
	} else {
		dynamicName = "save-message--success";
	}

	return (
		<div
			className={`save-message
              ${
								props.saveMessage
									? "save-message--visible"
									: "save-message--hidden"
							}
              ${dynamicName}`}
		>
			{props.saveMessage}
		</div>
	);
};

export default SaveMessage;
