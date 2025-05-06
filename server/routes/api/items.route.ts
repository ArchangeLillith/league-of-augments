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

//GET api/items/tags
router.get("/tags", async (req, res) => {
	try {
		const result = await db.items.getItemTags();
		const parsedItems = result.map((item) => ({
			...item,
			tags: item.tags ? item.tags.split(",") : [],
		}));
		res.json(parsedItems);
	} catch (error) {
		console.error(error);
	}
});

export default router;
