import { db } from "../index.ts";
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
} from "../schema.ts";

// Update Queries
export const updateEvent = async (eventId: number, data: Partial<NewEvent>) => {
  const [updatedEvent] = await db
    .update(event)
    .set(data)
    .where(eq(event.id, eventId))
    .returning();

  return updatedEvent;
};

export const updateCompetition = async (
  competition_id: number,
  data: Partial<NewCompetition>,
) => {
  const [updatedCompetition] = await db
    .update(competition)
    .set(data)
    .where(eq(competition.id, competition_id))
    .returning();

  return updatedCompetition;
};

export const updateCategory = async (
  category_id: number,
  data: Partial<NewCategory>,
) => {
  const [updatedCategory] = await db
    .update(category)
    .set(data)
    .where(eq(category.id, category_id))
    .returning();

  return updatedCategory;
};

export const updateChoice = async (
  choice_id: number,
  data: Partial<NewChoice>,
) => {
  const [updatedChoice] = await db
    .update(choice)
    .set(data)
    .where(eq(choice.id, choice_id))
    .returning();

  return updatedChoice;
};

export const updateJudge = async (
  judge_id: number,
  data: Partial<NewJudge>,
) => {
  const [updatedJudge] = await db
    .update(judge)
    .set(data)
    .where(eq(judge.id, judge_id))
    .returning();

  return updatedJudge;
};

export const updateContestant = async (
  contestant_id: number,
  data: Partial<NewContestant>,
) => {
  const [updatedContestant] = await db
    .update(contestant)
    .set(data)
    .where(eq(contestant.id, contestant_id))
    .returning();

  return updateContestant;
};
