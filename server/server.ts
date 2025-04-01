import express from "express";
import apiRouter from "./routes/api/api.index";
import authRouter from "./routes/auth/auth.index";

import { configurePassport } from "./middlewares/passport.mw";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "../dist")));

configurePassport(app);

app.use(express.json({ limit: "1mb" }));

app.use("/api", apiRouter);
app.use("/auth", authRouter);

// 👇 Fallback for React Router SPA
app.get("*", (_, res) => {
	res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
