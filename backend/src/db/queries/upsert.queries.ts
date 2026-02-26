import { db } from "../index.ts";
import {
  type NewEvent,
  type NewCompetition,
  type NewCategory,
  type NewChoice,
  type NewJudge,
  type NewContestant,
} from "../schema.ts";
import {
  getEventById,
  getCompetitionById,
  getCategoryById,
  getChoiceById,
  getJudgeById,
  getContestantById,
} from "./id-select-queries.ts";
import {
  updateEvent,
  updateCompetition,
  updateCategory,
  updateChoice,
  updateJudge,
  updateContestant,
} from "./update-queries.ts";
import {
  createEvent,
  createCompetition,
  createCategory,
  createChoice,
  createJudge,
  createContestant,
} from "./create.queries.ts";

export const upsertEvent = async (data: NewEvent) => {
  const existingEvent = await getEventById(data.id);
  if (existingEvent) return updateEvent(data.id, data);

  return createEvent(data);
};

export const upsertCompetition = async (data: NewCompetition) => {
  const existingCompetition = await getCompetitionById(data.id);
  if (existingCompetition) return updateCompetition(data.id, data);

  return createCompetition(data);
};

export const upsertCategory = async (data: NewCategory) => {
  const existingCategory = await getCategoryById(data.id);
  if (existingCategory) return updateCategory(data.id, data);

  return createCategory(data);
};

export const upsertChoice = async (data: NewChoice) => {
  const existingChoice = await getChoiceById(data.id);
  if (existingChoice) return updateChoice(data.id, data);

  return createChoice(data);
};

export const upsertJudge = async (data: NewJudge) => {
  const existingJudge = await getJudgeById(data.id);
  if (existingJudge) return updateJudge(data.id, data);

  return createJudge(data);
};

export const upsertContestant = async (data: NewContestant) => {
  const existingContestant = await getContestantById(data.id);
  if (existingContestant) return updateContestant(data.id, data);

  return createContestant(data);
};
