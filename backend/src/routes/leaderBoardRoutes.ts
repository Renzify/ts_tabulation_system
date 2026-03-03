import { Router } from "express";
import { getLeaderboard } from "../controllers/leaderBoardController.ts";

const router = Router();

router.get("/:choiceId", getLeaderboard);

export default router;
