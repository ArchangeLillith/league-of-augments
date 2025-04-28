interface SaveMessageProps {
	saveMessage: string | null;
	error: boolean;
}

const SaveMessage = (props: SaveMessageProps, error = false) => {
	return (
		<div
			className={`save-message
              ${
								props.saveMessage
									? "save-message--visible"
									: "save-message--hidden"
							}
              ${
								props.saveMessage?.includes("error") || error
									? "save-message--error"
									: "save-message--success"
							}
            `}
		>
			{props.saveMessage}
		</div>
	);
};

export default SaveMessage;
