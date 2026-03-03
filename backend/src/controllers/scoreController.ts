import type { Request, Response } from "express";
import * as createQuery from "../db/queries/create.queries.ts";
import * as readQuery from "../db/queries/select.queries.ts";
import * as updateQuery from "../db/queries/update.queries.ts";
import * as deleteQuery from "../db/queries/delete.queries.ts";
import * as idReadQuery from "../db/queries/id-select.queries.ts";
import * as leaderBoardQuery from "../db/queries/leaderboard.queries.ts";
import { scores } from "../db/schema.ts";

// select Score
export async function getScore(req: Request, res: Response) {
  try {
    const Scores = await readQuery.getAllScores();
    res.status(200).json(Scores);
  } catch (error) {
    console.error("getScore controller error:", error);
    res.status(500).json({ message: "Failed to get Scores" });
  }
}

// select Score by id
export async function getScoreById(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const Score = await idReadQuery.getScoreById(id);

    if (!Score) {
      res.status(404).json({ message: "Score not found" });
      return;
    }

    res.status(200).json(Score);
  } catch (error) {
    console.error("getScoreById controller error:", error);
    res.status(500).json({ message: "Failed to get Score" });
  }
}

// create Score
export async function createScore(req: Request, res: Response) {
  try {
    const { judgeFKey, contestantFKey, criteriatFKey, scoreInput } = req.body;

    const createdScore = await createQuery.createScore({
      judgeId: judgeFKey,
      contestantId: contestantFKey,
      criteriaId: criteriatFKey,
      scores: scoreInput,
    });

    // 2️⃣ Fetch contestant to get choiceId
    const contestantResult =
      await idReadQuery.getContestantById(contestantFKey);

    if (!contestantResult.length) {
      return res.status(404).json({ message: "Contestant not found" });
    }

    const contestantChoiceId = contestantResult[0].choiceId;

    // 3️⃣ Get updated leaderboard
    const leaderboard =
      await leaderBoardQuery.getLeaderboardByChoice(contestantChoiceId);

    res.status(201).json({
      createdScore,
      leaderboard,
    });

    res.status(201).json(createdScore);
  } catch (error) {
    console.error("createScore controller error:", error);
    res.status(500).json({ message: "Failed to create Score" });
  }
}

// update Score
export async function updateScore(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const { scoreInput } = req.body;

    const existingScore = await idReadQuery.getScoreById(id);

    if (!existingScore) {
      res.status(404).json({ message: "Score not found" });
      return;
    }

    const updatedScore = await updateQuery.updateScore(id, {
      scores: scoreInput,
    });

    res.status(200).json(updatedScore);
  } catch (error) {
    console.error("updateScore controller error:", error);
    res.status(500).json({ message: "Failed to update Score" });
  }
}

// delete Score
export async function deleteScore(req: Request, res: Response) {
  try {
    const id = req.params.id as string;

    const existingScore = await idReadQuery.getScoreById(id);

    if (!existingScore) {
      res.status(404).json({ message: "Score not found" });
      return;
    }

    await deleteQuery.deleteScore(id);

    res.status(200).json({ message: "Successfully deleted Score" });
  } catch (error) {
    console.error("deleteScore controller error:", error);
    res.status(500).json({ message: "Failed to delete Score" });
  }
}
