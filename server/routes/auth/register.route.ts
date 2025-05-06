/* eslint-disable no-useless-escape */
import bcrypt from "bcrypt";
import { Router } from "express";

import db from "../../db";
import { createJWT } from "../../utils/tokens";

const router = Router();

//POST /auth/register
router.post("/", async (req, res, next) => {
	try {
		const { password, username } = req.body;
		if (!username || !isValidUsername(username)) {
			const error = new Error("invalid username");
			throw error;
		}
		const [userFound] = await db.users.oneByUsername(username);
		if (userFound) {
			const error = new Error("username already registered");
			throw error;
		}

		const salt = await bcrypt.genSalt(12);
		const hash = await bcrypt.hash(password, salt);

		const user_id = await db.users.insertUser(username, hash);

		//Create settings for new user
		//Refactor: When we add user settings, this need to be uncommented
		// await db.users.updateSettings(user_id, {});
		const token = createJWT(user_id, username);

		res.json({ token });
	} catch (error) {
		next(error);
	}
});

function isValidUsername(username: string) {
	return username.match(/^(?!.*\.\.)(?!.*\.$)[a-zA-Z0-9_.]{2,32}$/);
}

const DefaultSettings = {};

export default router;
