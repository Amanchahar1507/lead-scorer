// src/server.js
import express from "express";
import { config } from "./config/env.js";
import offerRouter from "./routes/offer.js";
import { uploadRouter } from "./routes/upload.js";
import { scoreRouter } from "./routes/score.js";
import resultsRouter from "./routes/results.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.json({ message: "Lead Scorer API – modular" }));

app.use("/offer", offerRouter);
app.use("/leads/upload", uploadRouter);
app.use("/score", scoreRouter);
app.use("/results", resultsRouter);

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});