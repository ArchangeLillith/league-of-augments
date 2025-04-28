interface SaveMessageProps {
	saveMessage: string | null;
}

const SaveMessage = (props: SaveMessageProps) => {
	return (
		<div
			className={`save-message
              ${
								props.saveMessage
									? "save-message--visible"
									: "save-message--hidden"
							}
              ${
								props.saveMessage?.includes("error")
									? "save-message--error"
									: "save-message--success"
							}`}
		>
			{props.saveMessage}
		</div>
	);
};

export default SaveMessage;
