import React, { SetStateAction } from "react";
import SaveMessage from "../../components/SaveMessage";

interface RegisterHtmlProps {
	setUsername: React.Dispatch<SetStateAction<string>>;
	setPassword: React.Dispatch<SetStateAction<string>>;
	setConfirmPass: React.Dispatch<SetStateAction<string>>;
	error: string | null;
	register: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}

const RegisterHtml: React.FC<RegisterHtmlProps> = ({
	setUsername,
	setPassword,
	error,
	setConfirmPass,
	register,
}) => {
	return (
		<div className="register-html">
			<SaveMessage saveMessage={error} error={true} />
			<input
				placeholder="Username"
				type="text"
				className="login-input"
				onChange={(e) => {
					setUsername(e.currentTarget.value);
				}}
			></input>
			<input
				placeholder="Password"
				type="password"
				className="login-input"
				onChange={(e) => {
					setPassword(e.currentTarget.value);
				}}
			></input>
			<input
				placeholder="Confirm password"
				type="password"
				className="login-input"
				onChange={(e) => {
					setConfirmPass(e.currentTarget.value);
				}}
			></input>
			<button type="submit" className="login-submit-button" onClick={register}>
				RegisterHtml
			</button>
		</div>
	);
};

export default RegisterHtml;
