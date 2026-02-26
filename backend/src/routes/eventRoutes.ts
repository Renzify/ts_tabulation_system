import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvent,
  getEventById,
  updateEvent,
} from "../controllers/eventController.ts";

const router = Router();

router.get("/", getAllEvent);

router.get("/:id", getEventById);

router.post("/", createEvent);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

export default router;
