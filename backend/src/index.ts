import express from "express";
import { ENV } from "./lib/env.ts";
import eventRoutes from "./routes/eventRoutes.ts";
import competitionRoutes from "./routes/competitionRoutes.ts";
import categoryRoutes from "./routes/categoryRoutes.ts";
import choiceRoutes from "./routes/choiceRoutes.ts";
import judgeRoutes from "./routes/judgeRoutes.ts";
import contestantRoutes from "./routes/contestantRoutes.ts";

const app = express();

const { PORT } = ENV;

app.use(express.json());

app.use("/api/event", eventRoutes);
app.use("/api/competition", competitionRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/choice", choiceRoutes);
app.use("/api/judge", judgeRoutes);
app.use("/api/contestant", contestantRoutes);

app.listen(PORT, () => {
  console.log("Server is running in port: ", PORT);
});
