import { Request, Response } from "express";
import * as createQuery from "../db/queries/create.queries.ts";
import * as readQuery from "../db/queries/select.queries.ts";
import * as updateQuery from "../db/queries/update.queries.ts";
import * as deleteQuery from "../db/queries/delete.queries.ts";
import * as idReadQuery from "../db/queries/id-select.queries.ts";

// select Judge
export async function getJudge(req: Request, res: Response) {
  try {
    const Judges = await readQuery.getAllJudges();
    res.status(200).json(Judges);
  } catch (error) {
    console.error("selectJudge controller error:", error);
    res.status(500).json({ message: "Failed to get Judges" });
  }
}

// select Judge by id
export async function getJudgeById(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const Judge = await idReadQuery.getJudgeById(id);

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
    // to do
    const idMekus = "mekusmekus";

    const { judgeFirstName, judgeLastName, judgeSpe } = req.body;

    if (!judgeFirstName || !judgeLastName || !judgeSpe) {
      return res.status(400).json({
        error: "First name, Last name, and specialization are required",
      });
    }
    const createdJudge = await createQuery.createJudge({
      choiceId: idMekus,
      firstName: judgeFirstName,
      lastName: judgeLastName,
      specialization: judgeSpe,
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
    const id = req.params.id as string;
    const { judgeFirstName, judgeLastName, judgeSpe } = req.body;

    const existingJudge = await idReadQuery.getJudgeById(id);

    if (!existingJudge) {
      res.status(404).json({ message: "Judge not found" });
      return;
    }

    const updatedJudge = await updateQuery.updateJudge(id, {
      firstName: judgeFirstName,
      lastName: judgeLastName,
      specialization: judgeSpe,
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
    const id = req.params.id as string;
    const existingJudge = await idReadQuery.getJudgeById(id);

    if (!existingJudge) {
      res.status(404).json({ message: "Judge not found" });
      return;
    }

    await deleteQuery.deleteJudge(id);
    res.status(200).json({ message: "Successfully deleted Judge" });
  } catch (error) {
    console.error("deleteJudge controller error:", error);
    res.status(500).json({ message: "Failed to delete Judge" });
  }
}
