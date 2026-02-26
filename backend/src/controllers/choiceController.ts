import { Request, Response } from "express";
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
    console.error("selectChoice controller error:", error);
    res.status(500).json({ message: "Failed to get choices" });
  }
}

// select Choice by id
export async function getChoiceById(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const Choice = await idReadQuery.getChoiceById(id);

    if (!Choice) {
      res.status(404).json({ message: "Choice not found" });
      return;
    }

    res.status(200).json(Choice);
  } catch (error) {
    console.error("selectChoiceById controller error:", error);
    res.status(500).json({ message: "Failed to get Choice" });
  }
}

// create Choice
export async function createChoice(req: Request, res: Response) {
  try {
    const { id, choiceName, choiceDesc, noOfJudges } = req.body;

    const createdChoice = await createQuery.createChoice({
      categoryId: id,
      choiceName,
      choiceDesc,
      noOfJudges,
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
    const { choiceName, choiceDesc, noOfJudges } = req.body;

    const existingChoice = await idReadQuery.getChoiceById(id);

    if (!existingChoice) {
      res.status(404).json({ message: "Choice not found" });
      return;
    }

    const updatedChoice = await updateQuery.updateChoice(id, {
      choiceName,
      choiceDesc,
      noOfJudges,
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
