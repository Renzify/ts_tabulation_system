import { Router } from "express";
import {
  getContestant,
  getContestantById,
  createContestant,
  updateContestant,
  deleteContestant,
} from "../controllers/contestantController.ts";

const router = Router();

router.get("/", getContestant);

router.get("/:id", getContestantById);

router.post("/", createContestant);

router.put("/:id", updateContestant);

router.delete("/:id", deleteContestant);

export default router;
