import type { Request, Response } from "express";
import * as createQuery from "../db/queries/create.queries.ts";
import * as readQuery from "../db/queries/select.queries.ts";
import * as updateQuery from "../db/queries/update.queries.ts";
import * as deleteQuery from "../db/queries/delete.queries.ts";
import * as idReadQuery from "../db/queries/id-select.queries.ts";

// select Choice
export async function getChoice(req: Request, res: Response) {
  try {
    const choices = await readQuery.getAllChoices();
    res.status(200).json(choices);
  } catch (error) {
    console.error("getChoice controller error:", error);
    res.status(500).json({ message: "Failed to get Choices" });
  }
}

// select Choice by id
export async function getChoiceById(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const choice = await idReadQuery.getChoiceById(id);

    if (!choice) {
      res.status(404).json({ message: "Choice not found" });
      return;
    }

    res.status(200).json(choice);
  } catch (error) {
    console.error("getChoiceById controller error:", error);
    res.status(500).json({ message: "Failed to get Choice" });
  }
}

// create Choice
export async function createChoice(req: Request, res: Response) {
  try {
    const { catFKey, choNameInput, choDescInput, noJudgesInput } = req.body;

    const createdChoice = await createQuery.createChoice({
      categoryId: catFKey,
      choiceName: choNameInput,
      choiceDesc: choDescInput,
      noOfJudges: noJudgesInput,
    });

    res.status(201).json(createdChoice);
  } catch (error) {
    console.error("createChoice controller error:", error);
    res.status(500).json({ message: "Failed to create Choice" });
  }
}

// update Choice
export async function updateChoice(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const { choNameInput, choDescInput, noJudgesInput } = req.body;

    const existingChoice = await idReadQuery.getChoiceById(id);

    if (!existingChoice) {
      res.status(404).json({ message: "Choice not found" });
      return;
    }

    const updatedChoice = await updateQuery.updateChoice(id, {
      choiceName: choNameInput,
      choiceDesc: choDescInput,
      noOfJudges: noJudgesInput,
    });

    res.status(200).json(updatedChoice);
  } catch (error) {
    console.error("updateChoice controller error:", error);
    res.status(500).json({ message: "Failed to update Choice" });
  }
}

// delete Choice
export async function deleteChoice(req: Request, res: Response) {
  try {
    const id = req.params.id as string;

    const existingChoice = await idReadQuery.getChoiceById(id);

    if (!existingChoice) {
      res.status(404).json({ message: "Choice not found" });
      return;
    }

    await deleteQuery.deleteChoice(id);
    res.status(200).json({ message: "Successfully deleted Choice" });
  } catch (error) {
    console.error("deleteChoice controller error:", error);
    res.status(500).json({ message: "Failed to delete Choice" });
  }
}
