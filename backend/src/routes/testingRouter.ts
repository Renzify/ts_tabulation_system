import express from "express";
import { getFullEvent } from "../controllers/testingController.ts";

const router = express.Router();
router.get("/:id/full", getFullEvent);
export default router;
