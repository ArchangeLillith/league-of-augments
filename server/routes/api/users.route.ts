// server/routes/augments.route.ts
import express from "express";
import db from "../../db";

const router = express.Router();

//POST /api/users/
router.get("/settings/:user_id", async (req, res) => {
	const user_id = Number(req.params.user_id);
	try {
		const result = await db.users.userSettings(user_id);
		res.json(result);
	} catch (error) {
		console.error(error);
	}
});

//GET /api/users/
router.get("/:username", async (req, res) => {
	const username = req.params.username;
	try {
		const result = await db.users.oneByUsername(username);
		res.json(result);
	} catch (error) {
		console.error(error);
	}
});
//GET /api/users/
router.post("/save", async (req, res) => {
	console.log("body", req.body);
	const user_id = req.body.user_id;
	const champs_won = req.body.champs_won;
	const champs_first_place = req.body.champs_first_place;
	const champs_played = req.body.champs_played;
	const champs_wanted = req.body.champs_wanted;
	try {
		const result = await db.users.updateUser(
			user_id,
			champs_won,
			champs_first_place,
			champs_played,
			champs_wanted
		);
		console.log(result);
		res.json(result);
	} catch (error) {
		console.error(error);
	}
});

export default router;
