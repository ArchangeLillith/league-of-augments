import { jwtDecode } from "jwt-decode";
import baseService from "../services/base";
import storage from "../utils/storage";
import { user } from "../utils/types";

/**
 *Registers the user by posting against the database with the sanitized payload from the component
 * @param payload - The input from the user coming from the component
 * @returns A JWT or error
 */
const registerUserAndStoreToken = async (payload: {
	username: string;
	password: string;
}) => {
	const { token } = await baseService.post("/auth/register", payload);
	if (!token) return;
	storage.setToken(token);
	return token;
};

/**
 *Validates the JWT, decodes out the id and grabs the user from the database based on that ID
 * @param token - The JWT
 * @returns the user
 */
const getUserFromToken = async (token: string): Promise<user> => {
	try {
		const validated = await baseService.get("/auth/validate/me");
		if (validated?.message !== "success") {
			throw new Error(
				"token bad, something went wrong with frontend check of token"
			);
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const decoded: any = jwtDecode(token);
		const userId: string = decoded.id;
		const user: user = await baseService.get(`/api/authors/${userId}`);
		if (!user) throw new Error("user couldn't be fetched TT_TT");
		return user;
	} catch (error) {
		console.error(`ERROR in register.api.ts in features:`, error);
		throw error;
	}
};

export default {
	registerUserAndStoreToken,
	getUserFromToken,
};
