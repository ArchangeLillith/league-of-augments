import type { Request, Response, NextFunction } from "express";
import passport from "passport";

export const verifyToken = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	passport.authenticate(
		"jwt",
		{ session: false },
		(error: Error, user: any, info: any) => {
			if (error) {
				return next(error);
			}

			if (info && info.message === "No auth token") {
				req.currentUser = undefined;
			} else if (!user) {
				console.error(`info and message`, info, info.message);
				return res.status(401).json({ message: info.message });
			} else {
				req.currentUser = user;
			}
			next();
		}
	)(req, res, next);
};
