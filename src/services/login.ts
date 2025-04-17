import { jwtDecode } from "jwt-decode";

import baseService from "./base";
import { UserLoginObject } from "../utils/types";

/**
 *Validates the JWT, decodes out the id and grabs the user from the database based on that ID
 * @param token - The JWT
 * @returns the user
 */
const loginUser = async (token: string): Promise<UserLoginObject> => {
	try {
		//calls to see if the token is valid. If not, a 401 gets sent. If the user exists, we get a 200 and are kicked back here
		const validated = await baseService.get("/auth/validate/me");
		if (validated?.message !== "success") {
			throw new Error(
				"token bad, something went wrong with frontend check of token"
			);
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		//decode the token to get the user id
		const decoded: any = jwtDecode(token);
		//set the user id
		const userId: number = decoded.id;
		const username: string = decoded.username;

		const settingsReturn = await baseService.get(
			`/api/users/settings/${userId}`
		);
		const userReturn = await baseService.get(`/api/users/${username}`);
		const settings: any = settingsReturn[0].settings;
		return {
			userData: {
				username,
				id: userId,
			},
			champsWon: userReturn[0].champs_won,
			champsFirstPlace: userReturn[0].champs_first_place,
			champsPlayed: userReturn[0].champs_played,
			champsWanted: userReturn[0].champs_wanted,
			settings,
		};
	} catch (error) {
		console.error(`ERROR in auth.ts in services:`, error);
		throw error;
	}
};

export default {
	loginUser,
};
