import { Request, Response } from "express";
import * as queries from "../db/queries.ts";

// select Choice
export async function getChoice(req: Request, res: Response) {
  try {
    const choices = await queries.getChoice();
    res.status(200).json(choices);
  } catch (error) {
    console.error("selectChoice controller error:", error);
    res.status(500).json({ message: "Failed to get choices" });
  }
}

// select Choice by id
export async function getChoiceById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const Choice = await queries.getChoiceById(id);

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
    const { choiceName, choiceDesc } = req.body;

    const createdChoice = await queries.createChoice({
      choiceName,
      choiceDesc,
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
    const { id } = req.params;
    const { choiceName, choiceDesc } = req.body;

    const existingChoice = await queries.getChoiceById(id);

    if (!existingChoice) {
      res.status(404).json({ message: "Choice not found" });
      return;
    }

    if (existingChoice.id !== id) {
      res.status(404).json({ message: "You can only update your own Choice" });
      return;
    }

    const updatedChoice = await queries.updateChoice(id, {
      choiceName,
      choiceDesc,
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
    const { id } = req.params;

    const existingChoice = await queries.getChoiceById(id);

    if (!existingChoice) {
      res.status(404).json({ message: "Choice not found" });
      return;
    }

    if (existingChoice.id !== id) {
      res.status(404).json({ message: "You can only update your own Choice" });
      return;
    }

    res.status(200).json({ message: "Successfully deleted Choice" });
  } catch (error) {
    console.error("deleteChoice controller error:", error);
    res.status(500).json({ message: "Failed to delete Choice" });
  }
}
