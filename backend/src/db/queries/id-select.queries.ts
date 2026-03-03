import type { Request, Response } from "express";
import { db } from "../index.ts";
import { eq } from "drizzle-orm";
import { event, competition, category, choice, scores } from "../schema.ts";

// Get By Id Queries

// Get Event By Id
export const getEventById = async (id: string) => {
  return await db.select().from(event).where(eq(event.id, id));
};

// Get Competition By Id
export const getCompetitionById = async (id: string) => {
  return await db.select().from(competition).where(eq(competition.id, id));
};

// Get Category By Id
export const getCategoryById = async (id: string) => {
  return await db.select().from(category).where(eq(category.id, id));
};

// Get Choice By Id
export const getChoiceById = async (id: string) => {
  return await db.select().from(choice).where(eq(choice.id, id));
};

// Get Score By Id
export const getScoreById = async (id: string) => {
  return await db.select().from(scores).where(eq(scores.id, id));
};

// Get Event with all its nested competitions, categories, and choices
export const getFullEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };

    const [foundEvent] = await db.select().from(event).where(eq(event.id, id));

    if (!foundEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    const competitions = await db
      .select()
      .from(competition)
      .where(eq(competition.eventId, id));

    const competitionsWithData = await Promise.all(
      competitions.map(async (comp) => {
        const categories = await db
          .select()
          .from(category)
          .where(eq(category.competitionId, comp.id));

        const categoriesWithData = await Promise.all(
          categories.map(async (cat) => {
            const choices = await db
              .select()
              .from(choice)
              .where(eq(choice.categoryId, cat.id));

            return { ...cat, choices };
          }),
        );

        return { ...comp, categories: categoriesWithData };
      }),
    );

    res.json({ ...foundEvent, competitions: competitionsWithData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
