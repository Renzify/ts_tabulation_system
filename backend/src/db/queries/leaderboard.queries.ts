import { db } from "../index.ts";
import { sql, eq } from "drizzle-orm";
import { contestant, scores, criteria } from "../schema.ts";

export const getLeaderboardByChoice = async (choiceId: string) => {
  const results = await db
    .select({
      contestantId: contestant.id,
      firstName: contestant.firstName,
      lastName: contestant.lastName,

      totalAverage: sql<number>`
        SUM(${scores.scores} * ${criteria.weight}) 
        / NULLIF(SUM(${criteria.weight}), 0)
      `.as("total_average"),
    })
    .from(contestant)
    .innerJoin(scores, eq(scores.contestantId, contestant.id))
    .innerJoin(criteria, eq(scores.criteriaId, criteria.id))
    .where(eq(contestant.choiceId, choiceId))
    .groupBy(contestant.id, contestant.firstName, contestant.lastName)
    .orderBy(sql`total_average DESC`);

  return results;
};
