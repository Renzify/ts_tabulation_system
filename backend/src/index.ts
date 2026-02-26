import express from "express";
import { ENV } from "./lib/env.ts";
import eventRoutes from "./routes/eventRoutes.ts";

const app = express();

const { PORT } = ENV;

app.use("/api/event", eventRoutes);

app.listen(PORT, () => {
  console.log("Server is running in port: ", PORT);
});
