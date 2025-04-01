import { AuthState } from "../utils/types";

export const unauthenticatedAuthState = {
	authenticated: false,
	userData: null,
	champsWon: [],
	champsFirstPlace: [],
	champsPlayed: [],
	champsWanted: [],
	settings: {},
};

/**
 * Typing for the auth state
 */
export interface AuthContextType {
	authState: AuthState;
	setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
	loginToAuthState: (token: string) => void;
	logoutFromAuthState: () => void;
}

export interface AuthProviderProps {
	children: React.ReactNode;
}
