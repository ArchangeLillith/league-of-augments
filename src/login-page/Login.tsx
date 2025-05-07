import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import loginService from "./login.api";
import registerService from "../services/register";
import { useNavigate } from "react-router-dom";
import { showSaveMessage } from "../utils/saveMessage";
import LoginHtml from "./components/LoginHtml";
import RegisterHtml from "./components/RegisterHtml";

const Login = () => {
	const { loginToAuthState } = useContext(AuthContext);
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPass, setConfirmPass] = useState<string>("");
	const [error, setError] = useState<string | null>(null);
	const [state, setState] = useState<"login" | "register">("login");
	const navigate = useNavigate();

	/**
	 * Handler that toggles state from login to register and back
	 * @param e - buttone that toggles the state
	 */
	const toggleState = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (state === "login") {
			setState("register");
		} else {
			setState("login");
		}
	};

	/**
	 * Attempts to register the user using the data in state
	 * @param e - The button that's click got us here
	 * @returns nothing if we don't get a token as a release
	 */
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


	/**
	 * Attemps to log in the user against the DB
	 * @param e - the button that triggered this function
	 * @returns nothing if we don't get a token as a release
	 */
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

	return (
		<div className="login-page">
			<div className="login-section-border">
				<div className="login-section">
					<form className="login-form">
						<h2 className="login-title"> Welcome to League of Augments~</h2>
						{state === "login" ? (
							<LoginHtml
								setPassword={setPassword}
								setUsername={setUsername}
								login={login}
								error={error}
							/>
						) : (
							<RegisterHtml
								setPassword={setPassword}
								setUsername={setUsername}
								setConfirmPass={setConfirmPass}
								register={register}
								error={error}
							/>
						)}
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
