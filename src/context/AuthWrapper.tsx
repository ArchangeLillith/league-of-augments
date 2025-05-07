import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "./AuthProvider";
import { WrapperProps } from "../utils/interfaces";

const AuthWrapper: React.FC<WrapperProps> = ({ children }) => {
	const { authState } = useContext(AuthContext);

	/**
	 * Throws the user to the login page with a message as to where they came from if thery're not logged in and trying to access the page this wraps as they shouldn't be allowed into the page without being logged in
	 */
	if (!authState.authenticated) {
		return <Navigate to="/" />;
	}

	return <>{children}</>;
};

export default AuthWrapper;
