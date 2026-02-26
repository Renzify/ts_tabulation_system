import { Request, Response } from "express";
import * as queries from "../db/queries.ts";

// select competition
export async function getCompetition(req: Request, res: Response) {
  try {
    const competitions = await queries.getCompetition();
    res.status(200).json(competitions);
  } catch (error) {
    console.error("getCompetition controller error:", error);
    res.status(500).json({ message: "Failed to get all competitions" });
  }
}

// select competition by id
export async function getCompetitionById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const competition = await queries.getCompetitionById(id);

    if (!competition) {
      res.status(404).json({ message: "Competition not found" }); // if event does not exist
      return;
    }

    res.status(200).json(competition);
  } catch (error) {
    console.error("getCompetitionById controller error:", error);
    res.status(500).json({ message: "Failed to get competition by id" });
  }
}

// create competition
export async function createCompetition(req: Request, res: Response) {
  try {
    const { competitionName, competitionDesc } = req.body;

    const createdCompetition = await queries.createCompetition({
      competitionName,
      competitionDesc,
    });

    res.status(201).json(createdCompetition);
  } catch (error) {
    console.error("createCompetition controller error:", error);
    res.status(500).json({ message: "Failed to create competition" });
  }
}

// update competition
export async function updateCompetition(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { competitionName, competitionDesc } = req.body;

    const existingCompetition = await getCompetitionById(id);

    if (!existingCompetition) {
      res.status(404).json({ message: "Competition not found" }); // if competition not existing
      return;
    }

    if (existingCompetition.id !== id) {
      res
        .status(403)
        .json({ message: "You can only update your own competition " });
      return;
    }

    const updatedCompetition = await queries.updateCompetition(id, {
      competitionName,
      competitionDesc,
    });

    res.status(200).json(updateCompetition);
  } catch (error) {}
}

// delete competition
export async function deleteCompetition(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const existingCompetition = await getCompetitionById(id);

    if (!existingCompetition) {
      res.status(404).json({ message: "competition not found" }); // if competition not existing
    }

    if (existingCompetition.id !== id) {
      res
        .status(403)
        .json({ message: "You can only delete your own competition " });
    }

    await queries.deleteCompetition(id);
    res.status(200).json({ message: "competition deleted successfully" });
  } catch (error) {
    console.error("deleteCompetition controller error");
    res.status(500).json({ message: "Failed deleting competition" });
  }
}
