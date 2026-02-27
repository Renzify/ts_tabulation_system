import {
  pgTable,
  serial,
  integer,
  text,
  timestamp,
  uuid,
  real,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// tables
export const event = pgTable("event", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventName: text("event_name").notNull(),
  eventDesc: text("event_desc").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

export const competition = pgTable("competition", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventId: uuid("event_id")
    .notNull()
    .references(() => event.id, { onDelete: "cascade" }),
  competitionName: text("competition_name").notNull(),
  competitionDesc: text("competition_desc").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

export const category = pgTable("category", {
  id: uuid("id").defaultRandom().primaryKey(),
  competitionId: uuid("competition_id")
    .notNull()
    .references(() => competition.id, { onDelete: "cascade" }),
  categoryName: text("category_name").notNull(),
  categoryDesc: text("category_desc").notNull(),
  parentCategoryId: uuid("parent_category_id"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

export const choice = pgTable("choice", {
  id: uuid("id").defaultRandom().primaryKey(),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => category.id, { onDelete: "cascade" }),
  choiceName: text("choice_name").notNull(),
  choiceDesc: text("choice_desc").notNull(),
  noOfJudges: uuid("no_of_judges").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

export const judge = pgTable("judge", {
  id: uuid("id").defaultRandom().primaryKey(),
  choiceId: uuid("choice_id")
    .notNull()
    .references(() => choice.id, { onDelete: "cascade" }),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  specialization: text("specialization").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

export const contestant = pgTable("contestant", {
  id: uuid("id").defaultRandom().primaryKey(),
  choiceId: uuid("choice_id")
    .notNull()
    .references(() => choice.id, { onDelete: "cascade" }),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

export const criteria = pgTable("criteria", {
  id: uuid("id").defaultRandom().primaryKey(),
  choiceId: uuid("criteria_id")
    .notNull()
    .references(() => choice.id, { onDelete: "cascade" }),
  criterion: text("criterion").notNull(),
  weight: real("weight").notNull().default(1),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

export const scores = pgTable("scores", {
  id: uuid("id").defaultRandom().primaryKey(),
  judgeId: uuid("judge_id")
    .notNull()
    .references(() => choice.id, { onDelete: "cascade" }),
  contestantId: uuid("contestant_id")
    .notNull()
    .references(() => contestant.id, { onDelete: "cascade" }),
  criteriaId: uuid("criteria_id")
    .notNull()
    .references(() => criteria.id, { onDelete: "cascade" }),
  scores: real().notNull().default(1),
});

// to do: criteria for judging table
// to do: scores table

// relations
export const eventRelation = relations(event, ({ many }) => ({
  competitions: many(competition),
}));

export const competitionRelation = relations(competition, ({ one, many }) => ({
  event: one(event, {
    fields: [competition.eventId],
    references: [event.id],
  }),
  categories: many(category),
}));

export const categoryRelation = relations(category, ({ one, many }) => ({
  parent: one(category, {
    fields: [category.parentCategoryId],
    references: [category.id],
    relationName: "parent",
  }),
  children: many(category, {
    relationName: "parent",
  }),
  competition: one(competition, {
    fields: [category.competitionId],
    references: [competition.id],
  }),
  choices: many(choice),
}));

export const choiceRelation = relations(choice, ({ many }) => ({
  judges: many(judge),
  contestants: many(contestant),
  criteria: many(criteria),
}));

export const judgeRelation = relations(judge, ({ many }) => ({
  criteria: many(criteria),
  scores: many(scores),
}));

export const contestantRelation = relations(contestant, ({ many }) => ({
  scores: many(scores),
}));

export const criteriaRelation = relations(criteria, ({ many }) => ({
  scores: many(scores),
}));

// type inference
export type Event = typeof event.$inferSelect;
export type NewEvent = typeof event.$inferInsert;

export type Competition = typeof competition.$inferSelect;
export type NewCompetition = typeof competition.$inferInsert;

export type Category = typeof category.$inferSelect;
export type NewCategory = typeof category.$inferInsert;

export type Choice = typeof choice.$inferSelect;
export type NewChoice = typeof choice.$inferInsert;

export type Judge = typeof judge.$inferSelect;
export type NewJudge = typeof judge.$inferInsert;

export type Contestant = typeof contestant.$inferSelect;
export type NewContestant = typeof contestant.$inferInsert;

export type Criteria = typeof criteria.$inferSelect;
export type NewCriteria = typeof criteria.$inferInsert;

export type Score = typeof scores.$inferSelect;
export type NewScore = typeof scores.$inferInsert;
