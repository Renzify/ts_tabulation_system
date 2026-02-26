import { Request, Response } from "express";
import * as queries from "../db/queries.ts";

// select Judge
export async function getJudge(req: Request, res: Response) {
  try {
    const Judges = await queries.getJudge();
    res.status(200).json(Judges);
  } catch (error) {
    console.error("selectJudge controller error:", error);
    res.status(500).json({ message: "Failed to get Judges" });
  }
}

// select Judge by id
export async function getJudgeById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const Judge = await queries.getJudgeById(id);

    if (!Judge) {
      res.status(404).json({ message: "Judge not found" });
      return;
    }

    res.status(200).json(Judge);
  } catch (error) {
    console.error("selectJudgeById controller error:", error);
    res.status(500).json({ message: "Failed to get Judge" });
  }
}

// create Judge
export async function createJudge(req: Request, res: Response) {
  try {
    const { judgeName, judgeDesc } = req.body;

    const createdJudge = await queries.createJudge({
      judgeName,
      judgeDesc,
    });

    res.status(201).json(createdJudge);
  } catch (error) {
    console.error("createJudge controller error:", error);
    res.status(500).json({ message: "Failed to create Judge" });
  }
}

// update Judge
export async function updateJudge(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { judgeName, judgeDesc } = req.body;

    const existingJudge = await queries.getJudgeById(id);

    if (!existingJudge) {
      res.status(404).json({ message: "Judge not found" });
      return;
    }

    if (existingJudge.id !== id) {
      res.status(404).json({ message: "You can only update your own Judge" });
      return;
    }

    const updatedJudge = await queries.updateJudge(id, {
      judgeName,
      judgeDesc,
    });

    res.status(200).json(updatedJudge);
  } catch (error) {
    console.error("updateJudge controller error:", error);
    res.status(500).json({ message: "Failed to update Judge" });
  }
}

// delete Judge
export async function deleteJudge(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const existingJudge = await queries.getJudgeById(id);

    if (!existingJudge) {
      res.status(404).json({ message: "Judge not found" });
      return;
    }

    if (existingJudge.id !== id) {
      res.status(404).json({ message: "You can only update your own Judge" });
      return;
    }

    res.status(200).json({ message: "Successfully deleted Judge" });
  } catch (error) {
    console.error("deleteJudge controller error:", error);
    res.status(500).json({ message: "Failed to delete Judge" });
  }
}
