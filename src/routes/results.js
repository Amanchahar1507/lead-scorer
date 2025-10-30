import express from "express";
import { results } from "./score.js";
import { buildCsv } from "../utils/csvExport.js";

const router = express.Router();

router.get("/", (req, res) => {
  if (!results.length) return res.status(404).json({ error: "Run /score first" });
  res.json(results);
});

router.get("/csv", (req, res) => {
  if (!results.length) return res.status(404).json({ error: "No results" });
  const csv = buildCsv(results);
  res.header("Content-Type", "text/csv").attachment("scored-leads.csv").send(csv);
});

export default router;