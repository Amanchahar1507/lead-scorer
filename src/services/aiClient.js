
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

Classify buying intent and return **only**:
- "High" → 50 points
- "Medium" → 30 points
- "Low" → 10 points

Respond in this exact format:
INTENT: High
POINTS: 50
REASON: [1-2 sentences]
`.trim();

  try {
    console.log("Gemini Key loaded:", config.geminiKey ? "Yes" : "NO");

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${config.geminiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.1, 
          maxOutputTokens: 200,
        },
      }),
    });

    if (!res.ok) {
      console.error("Gemini error:", await res.text());
      return { ai_points: 10, intent: "Low", reasoning: "AI error" };
    }

    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

    
    const intentMatch = text.match(/INTENT:\s*(High|Medium|Low)/i);
    const pointsMatch = text.match(/POINTS:\s*(\d+)/);
    const reasonMatch = text.match(/REASON:\s*([\s\S]*)/i);

    const intent = intentMatch ? intentMatch[1] : "Low";
    const ai_points = pointsMatch ? parseInt(pointsMatch[1]) : 10;
    const reasoning = reasonMatch ? reasonMatch[1].trim() : "No reasoning from AI.";

    console.log("AI Response →", { intent, ai_points });

    return { intent, ai_points, reasoning };
  } catch (e) {
    console.error("Gemini failed:", e.message);
    return { intent: "Low", ai_points: 10, reasoning: "AI unavailable" };
  }
}