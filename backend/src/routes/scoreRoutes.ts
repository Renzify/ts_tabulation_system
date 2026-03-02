import { Router } from "express";
import {
  getScore,
  getScoreById,
  createScore,
  updateScore,
  deleteScore,
} from "../controllers/scoreController.ts";

const router = Router();

router.get("/", getScore);

router.get("/:id", getScoreById);

router.post("/", createScore);

router.put("/:id", updateScore);

router.delete("/:id", deleteScore);

export default router;
