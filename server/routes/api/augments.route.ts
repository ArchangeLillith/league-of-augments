// server/routes/augments.route.ts
import express from "express";
import db from "../../db";

const router = express.Router();

//GET /api/augments/
router.get("/", async (req, res) => {
	try {
		const result = await db.augments.getAllAugs();
		res.json(result);
	} catch (error) {
		console.error(error);
	}
});

//GET /api/augments/includeTags
router.get("/includeTags", async (req, res) => {
	try {
		const result = await db.augments.getAllAugsWithTags();
		res.json(result);
	} catch (error) {
		console.error(error);
	}
});

export default router;
