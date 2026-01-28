/**
 * AI Insight Generation
 * 
 * Uses OpenAI to generate contextual explanations of impact changes.
 * Falls back to deterministic insights if API fails.
 * 
 * AI is NOT the product - it's a supporting narrator.
 */

import { ImpactMetrics, SimulationInput } from './simulation';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

/**
 * Generate AI-powered insight explaining what changed and why
 * Falls back to deterministic insight if API unavailable
 */
export async function generateInsight(
  input: SimulationInput,
  currentMetrics: ImpactMetrics,
  previousMetrics: ImpactMetrics,
  previousInput: SimulationInput
): Promise<string> {
  // If no API key, use fallback
  if (!OPENAI_API_KEY) {
    return generateFallbackInsight(input, currentMetrics, previousMetrics);
  }

  try {
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
            Use clear, policy-lab language. No fluff.`,
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
      return insight;
    }
  } catch (error) {
    console.warn('AI insight generation failed, using fallback:', error);
  }

  // Fallback to deterministic insight
  return generateFallbackInsight(input, currentMetrics, previousMetrics);
}

/**
 * Deterministic fallback insight generator
 * Always works, no API dependency
 */
function generateFallbackInsight(
  input: SimulationInput,
  currentMetrics: ImpactMetrics,
  previousMetrics: ImpactMetrics
): string {
  const { renewableInvestmentPercent } = input;
  const investment = renewableInvestmentPercent;
  
  // Calculate key changes
  const carbonChange = currentMetrics.carbonReduction - previousMetrics.carbonReduction;
  const costChange = currentMetrics.energyCost - previousMetrics.energyCost;
  const stabilityChange = currentMetrics.gridStability - previousMetrics.gridStability;
  const jobsChange = currentMetrics.jobsCreated - previousMetrics.jobsCreated;
  
  // Determine primary trade-off
  const hasCostIncrease = costChange > 0.01;
  const hasStabilityDip = stabilityChange < -1;
  const hasStrongCarbonGain = carbonChange > 5;
  const hasJobGrowth = jobsChange > 5000;
  
  if (investment < 20) {
    return `At ${investment}% renewable investment, you're maintaining status quo economics but missing critical decarbonization windows. Job creation remains modest, and public pressure for climate action will likely intensify. Consider: what's the cost of inaction?`;
  }
  
  if (investment < 40) {
    if (hasCostIncrease && hasStrongCarbonGain) {
      return `At ${investment}%, carbon reduction is accelerating (${carbonChange > 0 ? '+' : ''}${carbonChange.toFixed(1)}%), but energy costs are rising due to transition infrastructure. This is the measured approach—effective for short-term stability but may require acceleration later.`;
    }
    return `${investment}% investment represents a measured approach. You're seeing initial job growth and carbon reduction, while energy costs remain stable. Grid stability is strong. This is a common "safe" policy position.`;
  }
  
  if (investment < 60) {
    if (hasStabilityDip && hasStrongCarbonGain) {
      return `At ${investment}%, you've entered the transition zone. Carbon reduction is significant (+${carbonChange.toFixed(1)}%), but grid stability faces pressure (${stabilityChange > 0 ? '+' : ''}${stabilityChange.toFixed(1)}%). This is the hardest phase—temporary disruption for long-term gain.`;
    }
    return `At ${investment}%, transition effects are visible. Carbon reduction is strong, but grid stability and energy costs show the complexity of infrastructure change. Public approval remains high, but execution risk is elevated.`;
  }
  
  if (investment < 80) {
    if (hasJobGrowth && !hasCostIncrease) {
      return `${investment}% investment signals serious commitment. Emissions are dropping rapidly (+${carbonChange > 0 ? '+' : ''}${carbonChange.toFixed(1)}%), and the job market is transforming (+${jobsChange > 0 ? '+' : ''}${(jobsChange / 1000).toFixed(0)}K jobs). You're past the steepest cost increases, and battery storage investments are improving grid reliability.`;
    }
    return `${investment}% investment shows strong momentum. Carbon reduction and job creation are accelerating, while transition costs are stabilizing. The economic inflection point is approaching.`;
  }
  
  return `At ${investment}%, you're modeling an aggressive renewable-first economy. Massive carbon reduction (+${carbonChange > 0 ? '+' : ''}${carbonChange.toFixed(1)}%), strong job creation (+${jobsChange > 0 ? '+' : ''}${(jobsChange / 1000).toFixed(0)}K jobs), and GDP growth are projected—but this requires unprecedented infrastructure investment and public buy-in. Grid stability depends on storage technology deployment.`;
}
