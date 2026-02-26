import { Router } from "express";
import {
  getJudge,
  getJudgeById,
  createJudge,
  updateJudge,
  deleteJudge,
} from "../controllers/judgeController.ts";

const router = Router();

router.get("/", getJudge);

router.get("/:id", getJudgeById);

router.post("/", createJudge);

router.put("/:id", updateJudge);

router.delete("/:id", deleteJudge);

export default router;
