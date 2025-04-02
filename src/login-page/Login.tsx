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
		<>
			<input
				placeholder="Username"
				type="text"
				onChange={(e) => {
					setUsername(e.currentTarget.value);
				}}
			></input>
			<input
				placeholder="Password"
				type="password"
				onChange={(e) => {
					setPassword(e.currentTarget.value);
				}}
			></input>
			<button type="submit" onClick={login}>
				Log in
			</button>
		</>
	);
	const registerHtml = (
		<>
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
				onChange={(e) => {
					setUsername(e.currentTarget.value);
				}}
			></input>
			<input
				placeholder="Password"
				type="password"
				onChange={(e) => {
					setPassword(e.currentTarget.value);
				}}
			></input>
			<input
				placeholder="Confirm password"
				type="password"
				onChange={(e) => {
					setConfirmPass(e.currentTarget.value);
				}}
			></input>
			<button type="submit" onClick={register}>
				Register
			</button>
		</>
	);

	return (
		<div className="login-page">
			<form>{state === "login" ? loginHtml : registerHtml}</form>
			<button onClick={toggleState}>
				{state === "login" ? "Register" : "Login"}
			</button>
		</div>
	);
};

export default Login;
