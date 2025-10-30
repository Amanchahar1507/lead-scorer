// src/config/env.js
import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  aimlKey: process.env.AIML_API_KEY,
};