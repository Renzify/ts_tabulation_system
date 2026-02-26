import type { Request, Response } from "express";
import * as createQuery from "../db/queries/create.queries.ts";
import * as readQuery from "../db/queries/select.queries.ts";
import * as updateQuery from "../db/queries/update.queries.ts";
import * as deleteQuery from "../db/queries/delete.queries.ts";
import * as idReadQuery from "../db/queries/id-select.queries.ts";

// select competition
export async function getCompetition(req: Request, res: Response) {
  try {
    const competitions = await readQuery.getAllCompetitions();
    res.status(200).json(competitions);
  } catch (error) {
    console.error("getCompetition controller error:", error);
    res.status(500).json({ message: "Failed to get all competitions" });
  }
}

// select competition by id
export async function getCompetitionById(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const competition = await idReadQuery.getCompetitionById(id);

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
    const { id, inputCompetitionName, inputCompetitionDesc } = req.body;

    const createdCompetition = await createQuery.createCompetition({
      eventId: id,
      competitionName: inputCompetitionName,
      competitionDesc: inputCompetitionDesc,
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
    const id = req.params.id as string;
    const { inputCompetitionName, inputCompetitionDesc } = req.body;

    const existingCompetition = await readQuery.getCompetitionsByEventId(id);

    if (!existingCompetition) {
      res.status(404).json({ message: "Competition not found" }); // if competition not existing
      return;
    }

    const updatedCompetition = await updateQuery.updateCompetition(id, {
      competitionName: inputCompetitionName,
      competitionDesc: inputCompetitionDesc,
    });

    res.status(200).json(updateCompetition);
  } catch (error) {
    console.error("updateCompetition controller error:", error);
    res.status(500).json({ message: "Failed to update competition" });
  }
}

// delete competition
export async function deleteCompetition(req: Request, res: Response) {
  try {
    const id = req.params.id as string;

    const existingCompetition = await idReadQuery.getCompetitionById(id);

    if (!existingCompetition) {
      res.status(404).json({ message: "competition not found" }); // if competition not existing
    }

    await deleteQuery.deleteCompetition(id);
    res.status(200).json({ message: "competition deleted successfully" });
  } catch (error) {
    console.error("deleteCompetition controller error");
    res.status(500).json({ message: "Failed deleting competition" });
  }
}
