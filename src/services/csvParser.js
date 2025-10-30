// src/services/csvParser.js
import csv from "csv-parser";
import { Readable } from "stream";

const REQUIRED = ["name", "role", "company", "industry", "location", "linkedin_bio"];

export function parseCsvBuffer(buffer) {
  return new Promise((resolve, reject) => {
    const stream = Readable.from(buffer);
    const rows = [];

    stream
      .pipe(csv())
      .on("headers", (headers) => {
        const missing = REQUIRED.filter((h) => !headers.includes(h));
        if (missing.length) reject(new Error(`Missing columns: ${missing.join(", ")}`));
      })
      .on("data", (row) => rows.push(row))
      .on("end", () => resolve(rows))
      .on("error", reject);
  });
}