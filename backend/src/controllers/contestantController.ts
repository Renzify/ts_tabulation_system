import type { Request, Response } from "express";
import * as createQuery from "../db/queries/create.queries.ts";
import * as readQuery from "../db/queries/select.queries.ts";
import * as updateQuery from "../db/queries/update.queries.ts";
import * as deleteQuery from "../db/queries/delete.queries.ts";
import * as idReadQuery from "../db/queries/id-select.queries.ts";

// select Contestant
export async function getContestant(req: Request, res: Response) {
  try {
    const contestants = await readQuery.getAllContestants();
    res.status(200).json(contestants);
  } catch (error) {
    console.error("getContestant controller error:", error);
    res.status(500).json({ message: "Failed to get Contestants" });
  }
}

// select Contestant by id
export async function getContestantById(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const contestant = await idReadQuery.getContestantById(id);

    if (!contestant) {
      res.status(404).json({ message: "Contestant not found" });
      return;
    }

    res.status(200).json(contestant);
  } catch (error) {
    console.error("selectContestantById controller error:", error);
    res.status(500).json({ message: "Failed to get Contestant" });
  }
}

// create Contestant
export async function createContestant(req: Request, res: Response) {
  try {
    const { choFKey, fNameInput, lNameInput } = req.body;

    const createdContestant = await createQuery.createContestant({
      choiceId: choFKey,
      firstName: fNameInput,
      lastName: lNameInput,
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
    const id = req.params.id as string;
    const { fNameInput, lNameInput } = req.body;

    const existingContestant = await idReadQuery.getContestantById(id);

    if (!existingContestant) {
      res.status(404).json({ message: "Contestant not found" });
      return;
    }

    const updatedContestant = await updateQuery.updateContestant(id, {
      firstName: fNameInput,
      lastName: lNameInput,
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
    const id = req.params.id as string;

    const existingContestant = await idReadQuery.getContestantById(id);

    if (!existingContestant) {
      res.status(404).json({ message: "Contestant not found" });
      return;
    }

    await deleteQuery.deleteContestant(id);
    res.status(200).json({ message: "Successfully deleted Contestant" });
  } catch (error) {
    console.error("deleteContestant controller error:", error);
    res.status(500).json({ message: "Failed to delete Contestant" });
  }
}
