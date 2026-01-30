/**
 * Serverless Function: Explain Impact
 * 
 * This is a production-ready backend endpoint for Impact Lens.
 * It securely handles OpenAI API calls for AI-generated explanations.
 * 
 * Deploy to: Vercel or Cloudflare Workers
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

interface ExplainImpactRequest {
  input: {
    renewableInvestmentPercent: number;
  };
  currentMetrics: {
    jobsCreated: number;
    carbonReduction: number;
    energyCost: number;
    gdpImpact: number;
    gridStability: number;
    publicApproval: number;
  };
  previousMetrics: {
    jobsCreated: number;
    carbonReduction: number;
    energyCost: number;
    gdpImpact: number;
    gridStability: number;
    publicApproval: number;
  };
  previousInput: {
    renewableInvestmentPercent: number;
  };
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS headers (adjust origin for production)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    const {
      input,
      currentMetrics,
      previousMetrics,
      previousInput,
    }: ExplainImpactRequest = req.body;

    // Validate required fields
    if (!input || !currentMetrics || !previousMetrics || !previousInput) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get API key from environment (secure, never exposed to client)
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (!OPENAI_API_KEY) {
      return res.status(500).json({ 
        error: 'OpenAI API key not configured',
        fallback: true 
      });
    }

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an expert policy analyst explaining the consequences of renewable energy investment decisions. 
            Be concise (2-3 sentences), factual, and highlight trade-offs. 
            Explain what changed, why it changed, and the trade-off involved. 
            Use clear, policy-lab language. No fluff.
            
            CRITICAL: Use uncertain language. Avoid certainty. Use words like:
            - "suggests"
            - "indicates"
            - "appears"
            - "may"
            - "likely"
            - "tends to"
            
            Never say "will definitely" or "guaranteed". This is a simulation, not a prediction.
            Be honest about trade-offs. Some metrics improve while others degrade—acknowledge this tension.`,
          },
          {
            role: 'user',
            content: `Investment changed from ${previousInput.renewableInvestmentPercent}% to ${input.renewableInvestmentPercent}%.

Previous metrics:
- Jobs: ${previousMetrics.jobsCreated.toLocaleString()}
- Carbon reduction: ${previousMetrics.carbonReduction}%
- Energy cost: $${previousMetrics.energyCost}/kWh
- GDP impact: ${previousMetrics.gdpImpact > 0 ? '+' : ''}${previousMetrics.gdpImpact}%
- Grid stability: ${previousMetrics.gridStability}%
- Public approval: ${previousMetrics.publicApproval}%

Current metrics:
- Jobs: ${currentMetrics.jobsCreated.toLocaleString()}
- Carbon reduction: ${currentMetrics.carbonReduction}%
- Energy cost: $${currentMetrics.energyCost}/kWh
- GDP impact: ${currentMetrics.gdpImpact > 0 ? '+' : ''}${currentMetrics.gdpImpact}%
- Grid stability: ${currentMetrics.gridStability}%
- Public approval: ${currentMetrics.publicApproval}%

Explain what changed and the trade-offs.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 150,
      }),
    });

    if (!response.ok) {
      throw new Error('OpenAI API error');
    }

    const data = await response.json();
    const insight = data.choices[0]?.message?.content?.trim();

    if (insight) {
      return res.status(200).json({ insight });
    }

    // Fallback if no insight generated
    return res.status(500).json({ 
      error: 'Failed to generate insight',
      fallback: true 
    });

  } catch (error) {
    console.error('Error generating insight:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      fallback: true 
    });
  }
}
