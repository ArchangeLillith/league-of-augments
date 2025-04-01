import React, { createContext, useState, useEffect } from "react";

import loginService from "../services/login";
import storage from "../utils/storage";
import { AuthState, UserLoginObject } from "../utils/types";
import {
	AuthContextType,
	AuthProviderProps,
	unauthenticatedAuthState,
} from "./Auth.utils";

/**
 * Auth state object that's going to get used by other components, initialized here
 */
export const AuthContext = createContext<AuthContextType>({
	authState: {
		authenticated: false,
		userData: null,
		champsWon: [],
		champsFirstPlace: [],
		champsPlayed: [],
		champsWanted: [],
		settings: {},
	},
	setAuthState: () => {},
	loginToAuthState: async () => {},
	logoutFromAuthState: () => {},
});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [authState, setAuthState] = useState<AuthState>(
		unauthenticatedAuthState
	);

	/**
	 * The function that handles the auth state to reflect a log in
	 * @param token - a JWT
	 */
	const loginToAuthState = async (token: string) => {
		try {
			//get settings
			const {
				userData,
				champsWon,
				champsFirstPlace,
				champsPlayed,
				champsWanted,
				settings,
			}: UserLoginObject = await loginService.loginUser(token);
			setAuthState({
				authenticated: true,
				userData,
				champsWon,
				champsFirstPlace,
				champsPlayed,
				champsWanted,
				settings,
			});
		} catch (error) {
			console.error(`Error`, error);
			setAuthState((prev) => {
				if (!prev.authenticated) return prev;
				return unauthenticatedAuthState;
			});
			alert(error);
		}
	};

	/**
	 * The function that resets a user in auth state when they log out
	 */
	const logoutFromAuthState = () => {
		setAuthState(unauthenticatedAuthState);
		storage.removeToken();
	};


	//
	/**
	 * If there's a valid token in storage, check if the user is logged in - this runs on load
	 * Refactor we could even make this an option, if the user wants it to auto log them in or not!
	 */
	useEffect(() => {
		const checkUser = async () => {
			const token = storage.getToken();

			// Check if no token exists and the user is already logged out
			if (!token) {
				if (!authState.authenticated) {
					setAuthState(unauthenticatedAuthState);
				}
				return;
			}

			try {
				loginToAuthState(token);
			} catch (error) {
				console.error(`error`, error);
			}
		};
		checkUser();
	}, [authState.authenticated]);

	return (
		<AuthContext.Provider
			value={{
				authState,
				setAuthState,
				loginToAuthState,
				logoutFromAuthState,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
