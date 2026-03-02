import type { Request, Response } from "express";
import * as createQuery from "../db/queries/create.queries.ts";
import * as readQuery from "../db/queries/select.queries.ts";
import * as updateQuery from "../db/queries/update.queries.ts";
import * as deleteQuery from "../db/queries/delete.queries.ts";
import * as idReadQuery from "../db/queries/id-select.queries.ts";
import { criteria } from "../db/schema.ts";

// select Criteria
export async function getCriteria(req: Request, res: Response) {
  try {
    const Criterias = await readQuery.getAllCriterias();
    res.status(200).json(Criterias);
  } catch (error) {
    console.error("getCriteria controller error:", error);
    res.status(500).json({ message: "Failed to get criteria" });
  }
}

// select Criteria by id
export async function getCriteriaById(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const Criteria = await idReadQuery.getCriteriaById(id);

    if (!Criteria) {
      res.status(404).json({ message: "Criteria not found" });
      return;
    }

    res.status(200).json(Criteria);
  } catch (error) {
    console.error("getCriteriaById controller error:", error);
    res.status(500).json({ message: "Failed to get criteria" });
  }
}

// create Criteria
export async function createCriteria(req: Request, res: Response) {
  try {
    const { choiceFKey, criterionName, criterionWeight } = req.body;

    const createdCriteria = await createQuery.createCriteria({
      choiceId: choiceFKey,
      criterion: criterionName,
      weight: criterionWeight,
    });

    res.status(201).json(createdCriteria);
  } catch (error) {
    console.error("createCriteria controller error:", error);
    res.status(500).json({ message: "Failed to create Criteria" });
  }
}

// update Criteria
export async function updateCriteria(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const { criterionName, criterionWeight } = req.body;

    const existingCriteria = await idReadQuery.getCriteriaById(id);

    if (!existingCriteria) {
      res.status(404).json({ message: "Criteria not found" });
      return;
    }

    const updatedCriteria = await updateQuery.updateCriteria(id, {
      criterion: criterionName,
      weight: criterionWeight,
    });

    res.status(200).json(updatedCriteria);
  } catch (error) {
    console.error("updateCriteria controller error:", error);
    res.status(500).json({ message: "Failed to update Criteria" });
  }
}

// delete Criteria
export async function deleteCriteria(req: Request, res: Response) {
  try {
    const id = req.params.id as string;

    const existingCriteria = await idReadQuery.getCriteriaById(id);

    if (!existingCriteria) {
      res.status(404).json({ message: "Criteria not found" });
      return;
    }

    await deleteQuery.deleteCriteria(id);

    res.status(200).json({ message: "Successfully deleted Criteria" });
  } catch (error) {
    console.error("deleteCriteria controller error:", error);
    res.status(500).json({ message: "Failed to delete Criteria" });
  }
}
