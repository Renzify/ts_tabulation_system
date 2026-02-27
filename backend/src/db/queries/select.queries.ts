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

// Get all events
export const getAllEvents = async () => {
  return await db.select().from(event);
};

export const getAllCompetitions = async () => {
  return await db.select().from(competition);
};

export const getAllCategories = async () => {
  return await db.select().from(category);
};

export const getAllChoices = async () => {
  return await db.select().from(choice);
};

export const getAllJudges = async () => {
  return await db.select().from(judge);
};

export const getAllContestants = async () => {
  return await db.select().from(contestant);
};

export const getAllCriterias = async () => {
  return await db.select().from(criteria);
};

export const getAllScores = async () => {
  return await db.select().from(scores);
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
export const getJudgesByChoiceId = async (choiceId: string) => {
  return await db.select().from(judge).where(eq(judge.choiceId, choiceId));
};

// Get all contestants for a specific choice
export const getContestantsByChoiceId = async (choiceId: string) => {
  return await db
    .select()
    .from(contestant)
    .where(eq(contestant.choiceId, choiceId));
};

// Get all criteria for a specific choice
export const getCriteriaByChoiceId = async (choiceId: string) => {
  return await db
    .select()
    .from(criteria)
    .where(eq(criteria.choiceId, choiceId));
};

// Get all scores for a specific contestant
export const getScoresByChoiceId = async (contestantId: string) => {
  return await db
    .select()
    .from(scores)
    .where(eq(scores.contestantId, contestantId));
};

// Get all scores for a specific criteria
export const getScoresByCriteriaId = async (criteriaId: string) => {
  return await db
    .select()
    .from(scores)
    .where(eq(scores.criteriaId, criteriaId));
};

// Get all scores for a specific judge
export const getScoresByJudgeId = async (judgeId: string) => {
  return await db.select().from(scores).where(eq(scores.judgeId, judgeId));
};
