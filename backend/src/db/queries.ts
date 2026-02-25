import { db } from "./index.ts";
import { eq } from "drizzle-orm";
import {
  event,
  competition,
  category,
  choice,
  judge,
  contestant,
  type NewEvent,
  type NewCompetition,
  type NewCategory,
  type NewChoice,
  type NewJudge,
  type NewContestant,
} from "./schema.ts";

export const createEvent = async (data: NewEvent) => {
  const [createdEvent] = await db.insert(event).values(data).returning();
  return createdEvent;
};

export const createCompetition = async (data: NewCompetition) => {
  const [createdCompetition] = await db
    .insert(competition)
    .values(data)
    .returning();

  return createdCompetition;
};

export const createCategory = async (data: NewCategory) => {
  const [createdCategory] = await db.insert(category).values(data).returning();

  return createdCategory;
};

export const createChoice = async (data: NewChoice) => {
  const [createdChoice] = await db.insert(choice).values(data).returning();
  return createdChoice;
};

export const createJudge = async (data: NewJudge) => {
  const [createdJudge] = await db.insert(judge).values(data).returning();
  return createdJudge;
};

export const createContestant = async (data: NewContestant) => {
  const [createdContestant] = await db
    .insert(contestant)
    .values(data)
    .returning();

  return createdContestant;
};
