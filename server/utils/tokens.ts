import jwt from "jsonwebtoken";

import config from "../config/config";

export const createJWT = (id: number, username: string) => {
	if (!config.jwt.secret) {
		throw new Error("NO SECRET!!!!");
	}
	const token = jwt.sign({ id, username }, config.jwt.secret, {
		expiresIn: "365d",
	});

	return token;
};
