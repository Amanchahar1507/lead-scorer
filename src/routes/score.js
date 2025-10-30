import express from "express";
import { calculateRuleScore } from "../services/ruleEngine.js";
import { getAiIntent } from "../services/aiClient.js";
import { leads } from "./upload.js";

const router = express.Router();
let results = [];

router.post("/", async (req, res) => {
  if (!globalThis.offer) return res.status(400).json({ error: "Upload offer first" });
  if (!leads.length) return res.status(400).json({ error: "Upload leads first" });

  results = [];

  for (const lead of leads) {
    const ruleScore = calculateRuleScore(lead);
    const { intent, reasoning } = await getAiIntent(lead, globalThis.offer);
    const aiScore = intent === "High" ? 50 : intent === "Medium" ? 30 : 10;
    const total = ruleScore + aiScore;
    const finalIntent = total >= 70 ? "High" : total >= 40 ? "Medium" : "Low";

    const scored = { name: lead.name, role: lead.role, company: lead.company, intent: finalIntent, score: total, reasoning };
    results.push(scored);
    console.table(scored);
  }

  res.json({ message: "Scoring complete", count: results.length });
});

export { router as scoreRouter, results };