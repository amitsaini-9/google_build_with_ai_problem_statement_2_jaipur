import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  try {
    const { team1, team2, venue, tournament } = await request.json();

    const prompt = `You are a cricket analyst. Give a brief prediction hint (2-3 sentences max) for:
${team1} vs ${team2}
Venue: ${venue}
Tournament: ${tournament}

Consider recent form, head-to-head, and venue factors. Be concise and give actionable insight for betting/prediction. Don't use markdown.`;

    const response = await client.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: prompt }] }],
    });

    const hint = response.response?.candidates?.[0]?.content?.parts?.[0]?.text || "Unable to generate hint";

    return Response.json({ hint });
  } catch (error) {
    console.error("Hint generation error:", error);
    return Response.json({ error: "Failed to generate hint" }, { status: 500 });
  }
}
