import { Router } from "express";
import {
  getChoice,
  getChoiceById,
  createChoice,
  updateChoice,
  deleteChoice,
} from "../controllers/choiceController.ts";

const router = Router();

router.get("/", getChoice);

router.get("/:id", getChoiceById);

router.post("/", createChoice);

router.put("/:id", updateChoice);

router.delete("/:id", deleteChoice);

export default router;
