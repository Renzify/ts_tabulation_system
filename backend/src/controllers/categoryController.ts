import type { Request, Response } from "express";
import * as createQuery from "../db/queries/create.queries.ts";
import * as readQuery from "../db/queries/select.queries.ts";
import * as updateQuery from "../db/queries/update.queries.ts";
import * as deleteQuery from "../db/queries/delete.queries.ts";
import * as idReadQuery from "../db/queries/id-select.queries.ts";

// select category
export async function getCategory(req: Request, res: Response) {
  try {
    const categories = await readQuery.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error("selectCategory controller error:", error);
    res.status(500).json({ message: "Failed to get categories" });
  }
}

// select category by id
export async function getCategoryById(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const category = await idReadQuery.getCategoryById(id);

    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.status(200).json(category);
  } catch (error) {
    console.error("selectCategoryById controller error:", error);
    res.status(500).json({ message: "Failed to get category" });
  }
}

// create category
export async function createCategory(req: Request, res: Response) {
  try {
    const { id, inputCategoryName, inputCategoryDesc } = req.body;

    const createdCategory = await createQuery.createCategory({
      competitionId: id,
      categoryName: inputCategoryName,
      categoryDesc: inputCategoryDesc,
    });

    res.status(201).json(createdCategory);
  } catch (error) {
    console.error("createCategory controller error:", error);
    res.status(500).json({ message: "Failed to create category" });
  }
}

// update category
export async function updateCategory(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const { inputCategoryName, inputCategoryDesc } = req.body;

    const existingCategory = await idReadQuery.getCategoryById(id);

    if (!existingCategory) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    const updatedCategory = await updateQuery.updateCategory(id, {
      categoryName: inputCategoryName,
      categoryDesc: inputCategoryDesc,
    });

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("updateCategory controller error:", error);
    res.status(500).json({ message: "Failed to update category" });
  }
}

// delete category
export async function deleteCategory(req: Request, res: Response) {
  try {
    const id = req.params.id as string;

    const existingCategory = await idReadQuery.getCategoryById(id);

    if (!existingCategory) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    await deleteQuery.deleteCategory(id);
    res.status(200).json({ message: "Successfully deleted category" });
  } catch (error) {
    console.error("deleteCategory controller error:", error);
    res.status(500).json({ message: "Failed to delete category" });
  }
}
