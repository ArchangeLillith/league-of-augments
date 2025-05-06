import { Router } from "express";

import userRouter from "./users.route";
import augmentsRouter from "./augments.route";
import buildsRouter from "./builds.route";
import itemsRouter from "./items.route";
import tagsRouter from "./tags.route";

const router = Router();

router.use("/users", userRouter);
router.use("/augments", augmentsRouter);
router.use("/builds", buildsRouter);
router.use("/items", itemsRouter);
router.use("/tags", tagsRouter);

export default router;
