// api/ai-suggest.js
// Vercel serverless function — proxies Claude API so the key never hits the browser.
// Deploy this alongside your React app on Vercel.
// Set ANTHROPIC_API_KEY in your Vercel project environment variables.

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
    return res.status(400).json({ error: "Missing or empty prompt" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured on server" });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: `You are a content strategist for SecuredSystems.in — a gig worker safety platform in India.
Given a raw blog idea, return ONLY a valid JSON object (no markdown, no preamble, no backticks):
{
  "refined_title": "An impactful, SEO-aware title",
  "hook": "A 1-sentence opening hook for the blog",
  "awareness_angles": ["3-4 awareness topics to raise based on the blog theme"],
  "related_ideas": ["3 related blog titles to write next"],
  "cta": "A strong CTA line for the blog",
  "suggested_tag": "One of: SAFETY, RESEARCH, POLICY, TECH"
}`,
        messages: [{ role: "user", content: prompt.trim() }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic API error:", response.status, errText);
      return res.status(502).json({ error: "Upstream AI error", detail: errText });
    }

    const data = await response.json();
    const text = data.content
      ?.filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("") || "";

    // Strip any accidental backtick fences
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    return res.status(200).json(parsed);
  } catch (err) {
    console.error("Handler error:", err);
    return res.status(500).json({ error: "Internal server error", detail: err.message });
  }
}
