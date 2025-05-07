import { SetStateAction } from "react";
import SaveMessage from "../../components/SaveMessage";

interface LoginHtmlProps {
	setUsername: React.Dispatch<SetStateAction<string>>;
	setPassword: React.Dispatch<SetStateAction<string>>;
	error: string | null;
	login: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}

const LoginHtml: React.FC<LoginHtmlProps> = ({
	setUsername,
	setPassword,
	error,
	login,
}) => {
	return (
		<div className="login-html">
			<SaveMessage saveMessage={error} error={true} />
			<input
				placeholder="Username"
				className="login-input"
				type="text"
				onChange={(e) => {
					setUsername(e.currentTarget.value);
				}}
			></input>
			<input
				placeholder="Password"
				className="login-input"
				type="password"
				onChange={(e) => {
					setPassword(e.currentTarget.value);
				}}
			></input>
			<button className="gold-button" type="submit" onClick={login}>
				Log in
			</button>
		</div>
	);
};

export default LoginHtml;
