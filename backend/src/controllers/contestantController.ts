import { Request, Response } from "express";
import * as queries from "../db/queries.ts";

// select Contestant
export async function getContestant(req: Request, res: Response) {
  try {
    const Contestants = await queries.getContestant();
    res.status(200).json(Contestants);
  } catch (error) {
    console.error("selectContestant controller error:", error);
    res.status(500).json({ message: "Failed to get Contestants" });
  }
}

// select Contestant by id
export async function getContestantById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const Contestant = await queries.getContestantById(id);

    if (!Contestant) {
      res.status(404).json({ message: "Contestant not found" });
      return;
    }

    res.status(200).json(Contestant);
  } catch (error) {
    console.error("selectContestantById controller error:", error);
    res.status(500).json({ message: "Failed to get Contestant" });
  }
}

// create Contestant
export async function createContestant(req: Request, res: Response) {
  try {
    const { contestantName, contestantDesc } = req.body;

    const createdContestant = await queries.createContestant({
      contestantName,
      contestantDesc,
    });

    res.status(201).json(createdContestant);
  } catch (error) {
    console.error("createContestant controller error:", error);
    res.status(500).json({ message: "Failed to create Contestant" });
  }
}

// update Contestant
export async function updateContestant(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { contestantName, contestantDesc } = req.body;

    const existingContestant = await queries.getContestantById(id);

    if (!existingContestant) {
      res.status(404).json({ message: "Contestant not found" });
      return;
    }

    if (existingContestant.id !== id) {
      res
        .status(404)
        .json({ message: "You can only update your own Contestant" });
      return;
    }

    const updatedContestant = await queries.updateContestant(id, {
      contestantName,
      contestantDesc,
    });

    res.status(200).json(updatedContestant);
  } catch (error) {
    console.error("updateContestant controller error:", error);
    res.status(500).json({ message: "Failed to update Contestant" });
  }
}

// delete Contestant
export async function deleteContestant(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const existingContestant = await queries.getContestantById(id);

    if (!existingContestant) {
      res.status(404).json({ message: "Contestant not found" });
      return;
    }

    if (existingContestant.id !== id) {
      res
        .status(404)
        .json({ message: "You can only update your own Contestant" });
      return;
    }

    res.status(200).json({ message: "Successfully deleted Contestant" });
  } catch (error) {
    console.error("deleteContestant controller error:", error);
    res.status(500).json({ message: "Failed to delete Contestant" });
  }
}
