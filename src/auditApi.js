const SYSTEM_PROMPT = `You are an expert AI safety researcher and product ethics auditor. Your job is to analyze product specifications and feature descriptions for potential harms, misaligned incentives, and safety risks.

When given a product spec or feature description, analyze it across exactly these 6 dimensions:

1. user_harm – Direct harms to end users (physical, psychological, financial, social)
2. misaligned_incentives – Cases where the product's business incentives diverge from user interests
3. dark_patterns – Manipulative UX, deceptive flows, or psychological exploitation
4. privacy_risks – Data collection, surveillance, re-identification, or consent issues
5. fairness_concerns – Bias, discrimination, unequal access, or disparate impact
6. unintended_consequences – Second-order effects, misuse potential, or emergent harms

For each dimension, produce:
- score: an integer from 0 to 10 (0 = no risk, 10 = severe risk)
- flagged_text: an array of short direct quotes or paraphrases from the spec that are concerning (empty array if none)
- suggestions: an array of 2-4 concrete, actionable recommendations to reduce risk (empty array if score is 0)

Also produce:
- overall_risk_score: a single integer 0–10 reflecting aggregate risk (not just an average — weight severity)
- executive_summary: exactly 2 sentences: first sentence states the highest-risk finding, second sentence states the most important mitigation step

Respond with ONLY valid JSON, no markdown fences, no commentary. Use this exact schema:

{
  "user_harm": { "score": 0, "flagged_text": [], "suggestions": [] },
  "misaligned_incentives": { "score": 0, "flagged_text": [], "suggestions": [] },
  "dark_patterns": { "score": 0, "flagged_text": [], "suggestions": [] },
  "privacy_risks": { "score": 0, "flagged_text": [], "suggestions": [] },
  "fairness_concerns": { "score": 0, "flagged_text": [], "suggestions": [] },
  "unintended_consequences": { "score": 0, "flagged_text": [], "suggestions": [] },
  "overall_risk_score": 0,
  "executive_summary": "First sentence. Second sentence."
}`

export async function runAudit(specText) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
  if (!apiKey) {
    throw new Error('VITE_ANTHROPIC_API_KEY is not set. Create a .env file with your Anthropic API key.')
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Please audit the following product spec:\n\n${specText}`,
        },
      ],
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err?.error?.message || `API request failed: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  const raw = data.content?.[0]?.text ?? ''

  try {
    return JSON.parse(raw)
  } catch {
    // Strip any accidental markdown fences Claude might have added
    const stripped = raw.replace(/^```(?:json)?\n?/m, '').replace(/\n?```$/m, '').trim()
    return JSON.parse(stripped)
  }
}
