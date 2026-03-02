import type { Request, Response } from "express";
import { db } from "../index.ts";
import { eq } from "drizzle-orm";
import {
  event,
  competition,
  category,
  choice,
  judge,
  contestant,
  criteria,
  scores,
} from "../schema.ts";

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

// Get Judge By Id
export const getJudgeById = async (id: string) => {
  return await db.select().from(judge).where(eq(judge.id, id));
};

// Get Contestant By Id
export const getContestantById = async (id: string) => {
  return await db.select().from(contestant).where(eq(contestant.id, id));
};

// Get Criteria By Id
export const getCriteriaById = async (id: string) => {
  return await db.select().from(criteria).where(eq(criteria.id, id));
};

// Get Score By Id
export const getScoreById = async (id: string) => {
  return await db.select().from(scores).where(eq(scores.id, id));
};

// Get Event forms with all children/full tree
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

            const choicesWithData = await Promise.all(
              choices.map(async (ch) => {
                const judges = await db
                  .select()
                  .from(judge)
                  .where(eq(judge.choiceId, ch.id));
                const contestants = await db
                  .select()
                  .from(contestant)
                  .where(eq(contestant.choiceId, ch.id));
                const criterias = await db
                  .select()
                  .from(criteria)
                  .where(eq(criteria.choiceId, ch.id));

                return { ...ch, judges, contestants, criterias };
              }),
            );

            return { ...cat, choices: choicesWithData };
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
