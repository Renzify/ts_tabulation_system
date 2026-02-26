import { db } from "../index.ts";
import { eq } from "drizzle-orm";
import {
  event,
  competition,
  category,
  choice,
  judge,
  contestant,
} from "../schema.ts";

// Get all events
export const getAllEvents = async () => {
  return await db.select().from(event);
};

// Get all competitions for a specific event
export const getCompetitionsByEventId = async (eventId: string) => {
  return await db
    .select()
    .from(competition)
    .where(eq(competition.eventId, eventId));
};

// Get all categories for a specific competition
export const getCategoriesByCompetitionId = async (competitionId: string) => {
  return await db
    .select()
    .from(category)
    .where(eq(category.competitionId, competitionId));
};

// Get all choices for a specific category
export const getChoicesByCategoryId = async (categoryId: string) => {
  return await db
    .select()
    .from(choice)
    .where(eq(choice.categoryId, categoryId));
};

// Get all judges for a specific choice
export const getJudgesByChoieId = async (choiceId: string) => {
  return await db.select().from(judge).where(eq(judge.choiceId, choiceId));
};

// Get all contestants for a specific choice
export const getContestantsByChoieId = async (choiceId: string) => {
  return await db.select().from(judge).where(eq(contestant.choiceId, choiceId));
};
