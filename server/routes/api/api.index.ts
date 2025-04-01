import { Router } from "express";

import userRouter from "./users.route";
import augmentsRouter from "./augments.route";
import buildsRouter from "./builds.route";

const router = Router();

router.use("/users", userRouter);
router.use("/augments", augmentsRouter);
router.use("/builds", buildsRouter);

export default router;
