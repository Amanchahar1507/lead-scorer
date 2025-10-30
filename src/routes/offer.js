import express from "express";
import { setOffer } from "../services/ruleEngine.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { name, value_props, ideal_use_cases } = req.body;
  if (!name || !Array.isArray(value_props) || !Array.isArray(ideal_use_cases)) {
    return res.status(400).json({ error: "Invalid offer format" });
  }
  setOffer({ name, value_props, ideal_use_cases });
  res.json({ message: "Offer saved" });
});

export default router;