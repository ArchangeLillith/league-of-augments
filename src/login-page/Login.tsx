import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import loginService from "./login.api";
import registerService from "../services/register";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const { loginToAuthState } = useContext(AuthContext);
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPass, setConfirmPass] = useState<string>("");
	const [state, setState] = useState<"login" | "register">("login");
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState("");

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
			setErrorMessage("Passwords don't match!");
			setTimeout(() => {
				setErrorMessage("");
			}, 2500);
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
			console.error("Error logging in:", error);
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
			console.error("Error logging in:", error);
		}
	};

	const loginHtml = (
		<div className="login-html">
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
			<button className="login-submit-button" type="submit" onClick={login}>
				Log in
			</button>
		</div>
	);
	const registerHtml = (
		<div className="register-html">
			<div
				className={`
			save-message
			${
				errorMessage
					? "save-message--visible save-message--error"
					: "save-message--hidden"
			}
		`}
			>
				{errorMessage}
			</div>
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
