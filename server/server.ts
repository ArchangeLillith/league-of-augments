import cors from "cors";
import express from "express";
import apiRouter from "./routes/api/api.index";
import authRouter from "./routes/auth/auth.index";

import { configurePassport } from "./middlewares/passport.mw";

const app = express();
const PORT = process.env.PORT || 3001;
app.use(
	cors({
		origin:
			process.env.NODE_ENV === "production"
				? ["http://localhost:5173"]
				: ["http://localhost:5173"],
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

// Configure Passport middleware
configurePassport(app);

// Enable JSON request parsing
app.use(express.json({ limit: "1mb" }));

app.use("/api", apiRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
