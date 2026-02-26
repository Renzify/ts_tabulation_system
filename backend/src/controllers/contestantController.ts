import { Request, Response } from "express";
import * as createQuery from "../db/queries/create.queries.ts";
import * as readQuery from "../db/queries/select.queries.ts";
import * as updateQuery from "../db/queries/update.queries.ts";
import * as deleteQuery from "../db/queries/delete.queries.ts";
import * as idReadQuery from "../db/queries/id-select.queries.ts";

// select Contestant
export async function getContestant(req: Request, res: Response) {
  try {
    const Contestants = await readQuery.getAllContestants();
    res.status(200).json(Contestants);
  } catch (error) {
    console.error("selectContestant controller error:", error);
    res.status(500).json({ message: "Failed to get Contestants" });
  }
}

// select Contestant by id
export async function getContestantById(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const Contestant = await idReadQuery.getContestantById(id);

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
    const id = "idMekus";
    const { inputFirstName, inputLastName } = req.body;

    const createdContestant = await createQuery.createContestant({
      choiceId: id,
      firstName: inputFirstName,
      lastName: inputLastName,
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
    const { inputFirstName, inputLastName } = req.body;

    const existingContestant = await idReadQuery.getContestantById(id);

    if (!existingContestant) {
      res.status(404).json({ message: "Contestant not found" });
      return;
    }

    const updatedContestant = await updateQuery.updateContestant(id, {
      firstName: inputFirstName,
      lastName: inputLastName,
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

    res.status(200).json({ message: "Successfully deleted Contestant" });
  } catch (error) {
    console.error("deleteContestant controller error:", error);
    res.status(500).json({ message: "Failed to delete Contestant" });
  }
}
