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

export const deleteEvent = async (eventId: string) => {
  const [deletedEvent] = await db
    .delete(event)
    .where(eq(event.id, eventId))
    .returning();

  return deletedEvent;
};

export const competitionEvent = async (competitionId: string) => {
  const [deletedCompetition] = await db
    .delete(competition)
    .where(eq(competition.id, competitionId))
    .returning();

  return deletedCompetition;
};

export const deleteCategory = async (categoryId: string) => {
  const [deletedCategory] = await db
    .delete(category)
    .where(eq(category.id, categoryId))
    .returning();

  return deletedCategory;
};

export const deleteChoice = async (choiceId: string) => {
  const [deletedChoice] = await db
    .delete(choice)
    .where(eq(choice.id, choiceId))
    .returning();

  return deletedChoice;
};

export const deleteJudge = async (judgeId: string) => {
  const [deletedJudge] = await db
    .delete(judge)
    .where(eq(judge.id, judgeId))
    .returning();

  return deletedJudge;
};

export const deleteContestant = async (contestantId: string) => {
  const [deletedContestant] = await db
    .delete(contestant)
    .where(eq(contestant.id, contestantId))
    .returning();

  return deletedContestant;
};
