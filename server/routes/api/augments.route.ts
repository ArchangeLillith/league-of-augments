// server/routes/augments.route.ts
import express from "express";
import db from "../../db";

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const result = await db.augments.getAllAugs();
		res.json(result);
	} catch (error) {
		console.error(error);
	}
});
router.get("/includeTags", async (req, res) => {
	try {
		const result = await db.augments.getAllAugsWithTags();
		res.json(result);
	} catch (error) {
		console.error(error);
	}
});


export default router;
