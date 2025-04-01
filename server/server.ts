import express from "express";
import apiRouter from "./routes/api/api.index";
import authRouter from "./routes/auth/auth.index";
import config from "./config/config";

import { configurePassport } from "./middlewares/passport.mw";
import path from "path";

const app = express();
const PORT = process.env.PORT || config.app.port;
const isProd = process.env.NODE_ENV === "production";

// 🔐 Passport and JSON parsing
configurePassport(app);
app.use(express.json({ limit: "1mb" }));

// 👇 API routes
app.use("/api", apiRouter);
app.use("/auth", authRouter);

// 🔥 Serve frontend only in production
if (isProd) {
	app.use(express.static(path.join(__dirname, "../dist")));

	// Catch-all to serve index.html for React Router
	app.get("*", (_, res) => {
		res.sendFile(path.join(__dirname, "../dist/index.html"));
	});
}

app.listen(PORT, () => {
	console.log(
		`Server running on port ${PORT} in ${
			isProd ? "production" : "development"
		} mode`
	);
});
