// src/services/aiClient.js
import { config } from "../config/env.js";

export async function getAiIntent(lead, offer) {
  const prompt = `
Product: ${offer.name}
Value Props: ${offer.value_props.join(", ")}
Ideal Use Cases: ${offer.ideal_use_cases.join(", ")}

Prospect:
- Name: ${lead.name}
- Role: ${lead.role}
- Company: ${lead.company}
- Industry: ${lead.industry}
- Location: ${lead.location}
- Bio: ${lead.linkedin_bio}

Classify buying intent as High, Medium, or Low. Explain in 1-2 sentences.
`.trim();

  try {
    const res = await fetch("https://api.aimlapi.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.aimlKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-exp",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
        max_tokens: 150,
      }),
    });

    if (!res.ok) {
      console.error("AIMLAPI error:", await res.text());
      return { intent: "Low", reasoning: "AI error" };
    }

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content?.trim() || "Low intent.";
    const match = text.match(/^(High|Medium|Low)/i);
    const intent = match ? match[0] : "Low";
    return { intent, reasoning: text };
  } catch (e) {
    console.error("AI call failed:", e.message);
    return { intent: "Low", reasoning: "AI unavailable" };
  }
}