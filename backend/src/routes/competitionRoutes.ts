import { Router } from "express";
import {
  createCompetition,
  deleteCompetition,
  getCompetition,
  getCompetitionById,
  updateCompetition,
} from "../controllers/competitionController.ts";

const router = Router();

router.get("/", getCompetition);

router.get("/:id", getCompetition);

router.post("/", createCompetition);

router.put("/:id", updateCompetition);

router.delete("/:id", updateCompetition);

export default router;
