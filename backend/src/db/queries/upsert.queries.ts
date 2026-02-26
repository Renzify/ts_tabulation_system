import { db } from "../index.ts";
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
import {
  getEventById,
  getCompetitionById,
  getCategoryById,
  getChoiceById,
  getJudgeById,
} from "./id-select-queries.ts";
import {
  updateEvent,
  updateCompetition,
  updateCategory,
  updateChoice,
  updateJudge,
} from "./update-queries.ts";
import {
  createEvent,
  createCompetition,
  createCategory,
  createChoice,
  createJudge,
} from "./create.queries.ts";
