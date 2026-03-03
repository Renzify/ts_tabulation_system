import type { Request, Response } from "express";
import * as leaderboardQuery from "../db/queries/leaderboard.queries.ts";

export async function getLeaderboard(req: Request, res: Response) {
  try {
    const choiceId = req.params.choiceId as string;

    const leaderboard = await leaderboardQuery.getLeaderboardByChoice(choiceId);

    res.status(200).json(leaderboard);
  } catch (error) {
    console.error("Leaderboard error:", error);
    res.status(500).json({ message: "Failed to fetch leaderboard" });
  }
}
