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

export const getEventById = async (id: string) => {
  return await db.select().from(event).where(eq(event.id, id));
};

export const getCompetitionById = async (id: string) => {
  return await db.select().from(competition).where(eq(competition.id, id));
};

export const getCategoryById = async (id: string) => {
  return await db.select().from(category).where(eq(category.id, id));
};

export const getChoiceById = async (id: string) => {
  return await db.select().from(choice).where(eq(choice.id, id));
};

export const getJudgeById = async (id: string) => {
  return await db.select().from(judge).where(eq(judge.id, id));
};

export const getContestantById = async (id: string) => {
  return await db.select().from(contestant).where(eq(contestant.id, id));
};

export const getCriteriaById = async (id: string) => {
  return await db.select().from(criteria).where(eq(criteria.id, id));
};

export const getScoreById = async (id: string) => {
  return await db.select().from(scores).where(eq(scores.id, id));
};
