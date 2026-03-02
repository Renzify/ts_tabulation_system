import { Router } from "express";
import {
  getCriteria,
  getCriteriaById,
  createCriteria,
  updateCriteria,
  deleteCriteria,
} from "../controllers/criteriaController.ts";

const router = Router();

router.get("/", getCriteria);

router.get("/:id", getCriteriaById);

router.post("/", createCriteria);

router.put("/:id", updateCriteria);

router.delete("/:id", deleteCriteria);

export default router;
