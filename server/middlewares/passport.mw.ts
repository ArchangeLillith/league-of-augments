import bcrypt from "bcrypt";
import type { Express } from "express";
import passport from "passport";
import PassportJWT from "passport-jwt";
import PassportLocal from "passport-local";

import config from "../config/config";
import db from "../db/index";

export function configurePassport(app: Express) {
	if (!config.jwt.secret) {
		throw new Error("JWT secret is not defined in the configuration");
	}

	// Local strategy
	passport.use(
		new PassportLocal.Strategy(
			{
				session: false,
			},
			async (username: string, password: string, done: any) => {
				try {
					const [userData] = await db.users.oneByUsername(username);
					if (userData && (await bcrypt.compare(password, userData.password))) {
						return done(null, userData);
					}
					return done(null, false, { message: "Invalid credentials" });
				} catch (error) {
					console.error(`Error in local strategy:`, error);
					return done(error);
				}
			}
		)
	);

	// JWT strategy
	passport.use(
		new PassportJWT.Strategy(
			{
				jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
				secretOrKey: config.jwt.secret,
			},
			(payload: any, done: any) => {
				done(null, payload);
			}
		)
	);

	app.use(passport.initialize());
}
