import { db } from "../index.ts";
import {
  event,
  competition,
  category,
  choice,
  judge,
  contestant,
  criteria,
  scores,
  type NewEvent,
  type NewCompetition,
  type NewCategory,
  type NewChoice,
  type NewJudge,
  type NewContestant,
  type NewCriteria,
  type NewScore,
} from "../schema.ts";

// Create Queries

// Create Event
export const createEvent = async (data: NewEvent) => {
  const [createdEvent] = await db.insert(event).values(data).returning();

  return createdEvent;
};

// Create Competition
export const createCompetition = async (data: NewCompetition) => {
  const [createdCompetition] = await db
    .insert(competition)
    .values(data)
    .returning();

  return createdCompetition;
};

// Create Category
export const createCategory = async (data: NewCategory) => {
  const [createdCategory] = await db.insert(category).values(data).returning();

  return createdCategory;
};

// Create Choice
export const createChoice = async (data: NewChoice) => {
  const [createdChoice] = await db.insert(choice).values(data).returning();

  return createdChoice;
};

// Create Judge
export const createJudge = async (data: NewJudge) => {
  const [createdJudge] = await db.insert(judge).values(data).returning();

  return createdJudge;
};

// Create Contestant
export const createContestant = async (data: NewContestant) => {
  const [createdContestant] = await db
    .insert(contestant)
    .values(data)
    .returning();

  return createdContestant;
};

// Create Criteria
export const createCriteria = async (data: NewCriteria) => {
  const [createdCriteria] = await db.insert(criteria).values(data).returning();

  return createdCriteria;
};

// Create Score
export const createScore = async (data: NewScore) => {
  const [createdScore] = await db.insert(scores).values(data).returning();

  return createdScore;
};
