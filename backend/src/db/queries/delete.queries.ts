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

// Delete Queries

// Delete Event
export const deleteEvent = async (eventId: string) => {
  const [deletedEvent] = await db
    .delete(event)
    .where(eq(event.id, eventId))
    .returning();

  return deletedEvent;
};

// Delete Competition
export const deleteCompetition = async (competitionId: string) => {
  const [deletedCompetition] = await db
    .delete(competition)
    .where(eq(competition.id, competitionId))
    .returning();

  return deletedCompetition;
};

// Delete Category
export const deleteCategory = async (categoryId: string) => {
  const [deletedCategory] = await db
    .delete(category)
    .where(eq(category.id, categoryId))
    .returning();

  return deletedCategory;
};

// Delete Choice
export const deleteChoice = async (choiceId: string) => {
  const [deletedChoice] = await db
    .delete(choice)
    .where(eq(choice.id, choiceId))
    .returning();

  return deletedChoice;
};

// Delete Judge
export const deleteJudge = async (judgeId: string) => {
  const [deletedJudge] = await db
    .delete(judge)
    .where(eq(judge.id, judgeId))
    .returning();

  return deletedJudge;
};

// Delete Contestant
export const deleteContestant = async (contestantId: string) => {
  const [deletedContestant] = await db
    .delete(contestant)
    .where(eq(contestant.id, contestantId))
    .returning();

  return deletedContestant;
};

// Delete Criteria
export const deleteCriteria = async (criteriaId: string) => {
  const [deletedCriteria] = await db
    .delete(criteria)
    .where(eq(criteria.id, criteriaId))
    .returning();

  return deletedCriteria;
};

// Delete Score
export const deleteScore = async (scoreId: string) => {
  const [deletedScore] = await db
    .delete(scores)
    .where(eq(scores.id, scoreId))
    .returning();

  return deletedScore;
};
