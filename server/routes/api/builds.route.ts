// builds.route.ts
import express from "express";
import db from "../../db";
import { ChampionName } from "../../utils/types";

const router = express.Router();

//POST api/builds/save
router.post("/save", async (req, res) => {
	console.log("Body:", req.body);
	const user_id: number = req.body.user_id;
	const champ_name: ChampionName = req.body.champ_name as ChampionName;
	const name: string = req.body.name;
	const newAugs: number[] = req.body.newAugs;
	const newItems: number[] = req.body.newAugs;
	console.log(`We're now here`);
	try {
		console.log(`In the save route`);
		const result = await db.builds.upsertFullBuild(
			user_id,
			champ_name,
			name,
			newAugs,
			newItems
		);
		res.json(result);
	} catch (error) {
		console.log(`We've errored here`);
		console.error(error);
	}
});

//POST /api/builds/
router.post("/", async (req, res) => {
	const user_id = Number(req.body.dto.user_id);
	const champion_name = req.body.dto.champion_name;
	try {
		const result = await db.builds.returnBuild(user_id, champion_name);
		console.log(
			"/api/builds/, getting the builds for the user, builds are:",
			result
		);

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
