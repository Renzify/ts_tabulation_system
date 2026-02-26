import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// tables
export const event = pgTable("event", {
  id: serial("id").primaryKey(),
  eventName: text("event_name").notNull(),
  eventDesc: text("event_desc").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

export const competition = pgTable("competition", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id")
    .notNull()
    .references(() => event.id, { onDelete: "cascade" }),
  competitionName: text("competition_name").notNull(),
  competitionDesc: text("competition_desc").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

export const category = pgTable("category", {
  id: serial("id").primaryKey(),
  competitionId: integer("competition_id")
    .notNull()
    .references(() => competition.id, { onDelete: "cascade" }),
  categoryName: text("category_name").notNull(),
  categoryDesc: text("category_desc").notNull(),
  parentCategoryId: integer("parent_category_id"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

export const choice = pgTable("choice", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id")
    .notNull()
    .references(() => category.id, { onDelete: "cascade" }),
  choiceName: text("choice_name").notNull(),
  choiceDesc: text("choice_desc").notNull(),
  noOfJudges: integer("no_of_judges").notNull(),
  unlockCategoryId: integer("unlock_category_id").references(
    () => category.id,
    { onDelete: "set null" },
  ),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

export const judge = pgTable("judge", {
  id: serial("id").primaryKey(),
  choiceId: integer("choice_id")
    .notNull()
    .references(() => choice.id, { onDelete: "cascade" }),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  specialization: text("specialization").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

export const contestant = pgTable("contestant", {
  id: serial("id").primaryKey(),
  choiceId: integer("choice_id")
    .notNull()
    .references(() => choice.id, { onDelete: "cascade" }),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
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
  }),
  competition: one(competition, {
    fields: [category.competitionId],
    references: [competition.id],
  }),
  children: many(category),
  choices: many(choice),
}));

export const choiceRelation = relations(choice, ({ many }) => ({
  judges: many(judge),
  contestants: many(contestant),
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
