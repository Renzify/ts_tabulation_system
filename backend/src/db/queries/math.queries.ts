import { db } from "../index.ts";
import { sql, eq } from "drizzle-orm";
import { choice, judge, contestant, scores, criteria } from "../schema.ts";

// Get Weighted Average per Criteria per Contestant (for a given choice)
export const getAveragePerCriteria = async (choiceId: string) => {
  const results = await db
    .select({
      choiceId: contestant.choiceId,
      contestantId: contestant.id,
      firstName: contestant.firstName,
      lastName: contestant.lastName,
      criteriaId: criteria.id,
      criterion: criteria.criterion,
      weight: criteria.weight,
      weightedAverage: sql<number>`
        AVG(${scores.scores}) * ${criteria.weight}
      `,
    })
    .from(contestant)
    // Join contestants → their scores
    .innerJoin(scores, sql`${scores.contestantId} = ${contestant.id}`)
    // Join scores → their criteria (for weight)
    .innerJoin(criteria, sql`${scores.criteriaId} = ${criteria.id}`)
    // Restrict to this choice only
    .where(eq(contestant.choiceId, choiceId))
    // Group by contestant and criterion
    .groupBy(
      contestant.choiceId,
      contestant.id,
      contestant.firstName,
      contestant.lastName,
      criteria.id,
      criteria.criterion,
      criteria.weight,
    );

  return results;
};

// Get Weighted Average per Contestant (per choice)
export const getAverage = async (choiceId: string) => {
  const results = await db
    .select({
      choiceId: contestant.choiceId,
      contestantId: contestant.id,
      firstName: contestant.firstName,
      lastName: contestant.lastName,
      weightedAverage: sql<number>`
        SUM(${scores.scores} * ${criteria.weight}) / SUM(${criteria.weight})
      `,
    })
    .from(contestant)
    // join scores → contestant to their scores
    .innerJoin(scores, sql`${scores.contestantId} = ${contestant.id}`)
    // join criteria → scores to their weight
    .innerJoin(criteria, sql`${scores.criteriaId} = ${criteria.id}`)
    // limit to one choice
    .where(eq(contestant.choiceId, choiceId))
    // group by contestant
    .groupBy(
      contestant.choiceId,
      contestant.id,
      contestant.firstName,
      contestant.lastName,
    );

  return results;
};
