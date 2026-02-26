import { Request, Response } from "express";
import * as queries from "../db/queries";

// select category
export async function getCategory(req: Request, res: Response) {
  try {
    const categories = await queries.getCategory();
    res.status(200).json(categories);
  } catch (error) {
    console.error("selectCategory controller error:", error);
    res.status(500).json({ message: "Failed to get categories" });
  }
}

// select category by id
export async function getCategoryById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const category = await queries.getCategoryById(id);

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
    const { categoryName, categoryDesc } = req.body;

    const createdCategory = await queries.createCategory({
      categoryName,
      categoryDesc,
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
    const { id } = req.params;
    const { categoryName, categoryDesc } = req.body;

    const existingCategory = await queries.getCategoryById(id);

    if (!existingCategory) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    if (existingCategory.id !== id) {
      res
        .status(404)
        .json({ message: "You can only update your own category" });
      return;
    }

    const updatedCategory = await queries.updateCategory(id, {
      categoryName,
      categoryDesc,
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
    const { id } = req.params;

    const existingCategory = await queries.getCategoryById(id);

    if (!existingCategory) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    if (existingCategory.id !== id) {
      res
        .status(404)
        .json({ message: "You can only update your own category" });
      return;
    }

    res.status(200).json({ message: "Successfully deleted category" });
  } catch (error) {
    console.error("deleteCategory controller error:", error);
    res.status(500).json({ message: "Failed to delete category" });
  }
}
