import express from "express";
import multer from "multer";
import { parseCsvBuffer } from "../services/csvParser.js";

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();
let leads = [];

router.post("/", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file" });
  if (!req.file.originalname.endsWith(".csv")) return res.status(400).json({ error: "CSV only" });

  try {
    leads = await parseCsvBuffer(req.file.buffer);
    res.json({ message: "Leads uploaded", count: leads.length });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export { router as uploadRouter, leads };