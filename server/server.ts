import express from "express";
import apiRouter from "./routes/api/api.index";
import authRouter from "./routes/auth/auth.index";
import config from "./config/config";

import { configurePassport } from "./middlewares/passport.mw";
import path from "path";

const app = express();

app.use(express.static(path.join(__dirname, "../dist")));

configurePassport(app);

app.use(express.json({ limit: "1mb" }));

app.use("/api", apiRouter);
app.use("/auth", authRouter);

app.get("*", (_, res) => {
	res.sendFile(path.join(__dirname, "../dist/index.html"));
});



// Start the server and bind to the correct port
const PORT = process.env.PORT || config.app.port;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}~`);
});
