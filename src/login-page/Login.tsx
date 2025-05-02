import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import loginService from "./login.api";
import registerService from "../services/register";
import { useNavigate } from "react-router-dom";
import SaveMessage from "../componenets/SaveMessage";
import { showSaveMessage } from "../utils/saveMessage";

const Login = () => {
	const { loginToAuthState } = useContext(AuthContext);
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPass, setConfirmPass] = useState<string>("");
	const [error, setError] = useState<string | null>(null);
	const [state, setState] = useState<"login" | "register">("login");
	const navigate = useNavigate();

	const toggleState = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (state === "login") {
			setState("register");
		} else {
			setState("login");
		}
	};

	const register = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (password !== confirmPass) {
			showSaveMessage("Error: Passwords don't match!", null, setError);
			return;
		}

		try {
			const token = await registerService.registerUserAndStoreToken({
				username,
				password,
			});
			if (!token) return;
			loginToAuthState(token);
			navigate("/home");
		} catch (error) {
			showSaveMessage("Error: Incorrect username or password!", null, setError);
		}
	};
	const login = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		try {
			const token = await loginService.authenticateUserAndStoreToken({
				username,
				password,
			});
			if (!token) return;
			loginToAuthState(token);
			navigate("/home");
		} catch (error) {
			showSaveMessage("Error: Incorrect username or password!", null, setError);
		}
	};

	const loginHtml = (
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
	const registerHtml = (
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
				Register
			</button>
		</div>
	);

	return (
		<div className="login-page">
			<div className="login-section-border">
				<div className="login-section">
					<form className="login-form">
						<h2 className="login-title"> Welcome to League of Augments~</h2>
						{state === "login" ? loginHtml : registerHtml}
					</form>
					<button onClick={toggleState} className="login-toggle-button">
						{state === "login" ? "Register  →" : "Login  →"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
