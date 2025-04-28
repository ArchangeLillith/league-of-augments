// builds.route.ts
import express from "express";
import db from "../../db";
import { ChampionName } from "../../utils/types";

const router = express.Router();

//POST api/builds/save
router.post("/save", async (req, res) => {
	console.log("Body:", req.body);
	const build_id: number = req.body.build_id;
	const user_id: number = req.body.user_id;
	const champ_name: ChampionName = req.body.champ_name as ChampionName;
	const name: string = req.body.name;
	const newAugs: number[] = req.body.newAugs;
	const newItems: number[] = req.body.newAugs;
	try {
		console.log(`REQ.body,`, req.body);
		const result = await db.builds.saveExistingBuild(build_id, name, newAugs);
		if (result.success === true) {
			let allBuilds = db.builds.returnBuilds(user_id, champ_name);
			res.json(allBuilds);
		} else {
			res.json(result);
		}
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
		const result = await db.builds.returnBuilds(user_id, champion_name);

		if (result.length > 0) {
			res.json(result);
			return;
		}

		//If we get here, we don't have a single build for this champ so we make one
		const upsertResult = await db.builds.insertNewBuild(
			user_id,
			champion_name,
			`New ${champion_name} Build`
		);

		if (!upsertResult.success) {
			console.error("Build upsert failed:", upsertResult.error);
			res.status(500).json({ error: upsertResult.error });
			return;
		}

		const newResult = await db.builds.returnBuilds(user_id, champion_name);
		res.json(newResult);
	} catch (error) {
		console.error("Unexpected error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

//POST /api/builds/new
router.post("/new", async (req, res) => {
	const user_id = Number(req.body.dto.user_id);
	const champion_name = req.body.dto.champion_name;
	try {
		const upsertResult = await db.builds.insertNewBuild(
			user_id,
			champion_name,
			`New ${champion_name} Build`
		);

		if (!upsertResult.success) {
			console.error("Build upsert failed:", upsertResult.error);
			res.status(500).json({ error: upsertResult.error });
			return;
		}

		const newResult = await db.builds.returnBuilds(user_id, champion_name);
		res.json(newResult);
	} catch (error) {
		console.error("Unexpected error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

//POST /api/builds/one
router.post("/one", async (req, res) => {
	console.log("In the builds /one router");
	const build_id = req.body.build_id;
	console
	try {
		const result = await db.builds.returnOneBuild(build_id);
		res.json(result);
		return;
	} catch (error) {
		console.error("Unexpected error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

export default router;
