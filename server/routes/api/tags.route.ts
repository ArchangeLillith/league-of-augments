// builds.route.ts
import express from "express";
import db from "../../db";

const router = express.Router();

//GET api/items/
router.get("/", async (req, res) => {
	try {
		const result = await db.tags.getTags();
		res.json(result);
	} catch (error) {
		console.error(error);
	}
});

export default router;
