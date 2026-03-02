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
