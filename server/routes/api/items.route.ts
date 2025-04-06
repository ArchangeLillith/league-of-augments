// builds.route.ts
import express from "express";
import db from "../../db";

const router = express.Router();

//GET api/items/
router.get("/", async (req, res) => {
	try {
		const result = await db.items.getItems();
		res.json(result);
	} catch (error) {
		console.error(error);
	}
});

//POST /api/builds/
router.post("/", async (req, res) => {
	console.log("req.body:", req.body);
	const user_id = Number(req.body.dto.user_id);
	const champion_name = req.body.dto.champion_name;
	try {
		const result = await db.builds.returnBuild(user_id, champion_name);
		console.log("builds route initial await", result);

		if (result.length > 0) {
			res.json(result);
			return;
		}

		//If we get here, we don't have a single build for this champ so we make one
		const upsertResult = await db.builds.upsertFullBuild(
			user_id,
			champion_name,
			"TEST",
			[],
			[]
		);

		if (!upsertResult.success) {
			console.error("Build upsert failed:", upsertResult.error);
			res.status(500).json({ error: upsertResult.error });
			return;
		}

		const newResult = await db.builds.returnBuild(user_id, champion_name);
		res.json(newResult);
	} catch (error) {
		console.error("Unexpected error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

export default router;
