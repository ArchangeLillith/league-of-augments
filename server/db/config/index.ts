import dotenv from "dotenv";

dotenv.config();

export default {
	app: {
		port: process.env.PORT,
	},
	db: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
	},
	jwt: {
		secret: process.env.JWT_SECRET,
		expires: process.env.JWT_EXPIRES,
	},
	roles: {
		admin: process.env.ROLE_ADMIN,
		user: process.env.ROLE_USER,
	},
};
