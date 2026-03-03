import express from "express";
import path from "path";
import cors from "cors";

import eventRoutes from "./routes/eventRoutes.ts";
import competitionRoutes from "./routes/competitionRoutes.ts";
import categoryRoutes from "./routes/categoryRoutes.ts";
import choiceRoutes from "./routes/choiceRoutes.ts";
import judgeRoutes from "./routes/judgeRoutes.ts";
import criteriaRoutes from "./routes/criteriaRoutes.ts";
import contestantRoutes from "./routes/contestantRoutes.ts";
import leaderBoardRoutes from "./routes/leaderBoardRoutes.ts";
import scoreRoutes from "./routes/scoreRoutes.ts";

import { ENV } from "./lib/env.ts";

const app = express();

const __dirname = path.resolve();

const { PORT } = ENV;

app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(express.json());

app.use("/api/event", eventRoutes);
app.use("/api/competition", competitionRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/choice", choiceRoutes);
app.use("/api/criteria", criteriaRoutes);
app.use("/api/judge", judgeRoutes);
app.use("/api/contestant", contestantRoutes);
app.use("/api/leaderboard", leaderBoardRoutes);
app.use("/api/score", scoreRoutes);

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server is running in port: ", PORT);
});
