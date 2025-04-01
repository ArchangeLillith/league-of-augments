import type { Request, Response, NextFunction } from "express";
import passport from "passport";

export const handleLogin = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	passport.authenticate(
		"local",
		{ session: false },
		async (error: Error, user: any, info: any) => {
			if (error) {
				return next(error);
			}

			if (info) {
				return res.status(401).json({ message: info.message });
			}
			console.log("User from handleLogin middleware:", user);
			req.currentUser = user;
			next();
		}
	)(req, res, next);
};
