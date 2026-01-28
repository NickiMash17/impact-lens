/**
 * Pure Simulation Engine
 * 
 * This is the intellectual core of Impact Lens.
 * Deterministic, explainable functions that calculate impact metrics
 * based on decision inputs.
 * 
 * No API dependencies. No randomness. Clear formulas.
 */

export interface ImpactMetrics {
  jobsCreated: number;
  carbonReduction: number;
  energyCost: number;
  gdpImpact: number;
  gridStability: number;
  publicApproval: number;
}

export interface SimulationInput {
  renewableInvestmentPercent: number; // 0-100
}

/**
 * Core simulation function: Calculate impacts based on renewable energy investment
 * 
 * This function models real-world trade-offs:
 * - Higher investment → More jobs, less carbon, but transition costs
 * - Grid stability dips during transition, then improves
 * - Public approval increases but plateaus at extremes
 * - Energy costs increase initially, then decrease
 * 
 * At least one metric must worsen when others improve (critical for showing trade-offs).
 */
export function simulateImpact(input: SimulationInput): ImpactMetrics {
  const { renewableInvestmentPercent } = input;
  
  // Clamp input to valid range
  const investment = Math.max(0, Math.min(100, renewableInvestmentPercent));
  const investmentFactor = investment / 100;
  
  // ============================================
  // JOBS CREATED
  // ============================================
  // Positive relationship with diminishing returns
  // Formula: base + linear growth - quadratic decay
  const baseJobs = 50000;
  const jobsCreated = Math.round(
    baseJobs + (investment * 1500) - (investment * investment * 3)
  );
  
  // ============================================
  // CARBON REDUCTION
  // ============================================
  // Near-linear positive relationship
  // This is the "easy win" metric
  const carbonReduction = Math.round(investment * 8.5);
  
  // ============================================
  // ENERGY COST (per kWh)
  // ============================================
  // TRADE-OFF: Initially increases (transition costs), then decreases
  // This is a critical trade-off metric
  const baseCost = 0.12; // $/kWh baseline
  let costMultiplier: number;
  
  if (investment < 50) {
    // Transition phase: costs increase
    costMultiplier = 1 + (investment * 0.004);
  } else {
    // Post-transition: costs decrease with scale
    costMultiplier = 1.2 - ((investment - 50) * 0.006);
  }
  const energyCost = Math.round(baseCost * costMultiplier * 100) / 100;
  
  // ============================================
  // GDP IMPACT (% growth)
  // ============================================
  // TRADE-OFF: Initial dip, then positive growth
  // Models transition costs vs long-term gains
  let gdpImpact: number;
  if (investment < 30) {
    // Low investment: minimal impact, slight negative
    gdpImpact = -0.2 + (investment * 0.01);
  } else {
    // Higher investment: stronger positive impact
    gdpImpact = -0.2 + (investment * 0.025);
  }
  
  // ============================================
  // GRID STABILITY (% reliability)
  // ============================================
  // TRADE-OFF: Dips during transition, improves with storage
  // Critical trade-off - shows infrastructure challenges
  const baseStability = 95;
  const stabilityDip = Math.sin((investment / 100) * Math.PI) * 8;
  const storageBonus = investment > 70 ? (investment - 70) * 0.3 : 0;
  const gridStability = Math.round(
    baseStability - stabilityDip + storageBonus
  );
  
  // ============================================
  // PUBLIC APPROVAL (% support)
  // ============================================
  // Generally positive but complex
  // Plateaus at extremes (too low = inaction, too high = disruption fears)
  const baseApproval = 45;
  const linearGrowth = investment * 0.45;
  const plateauPenalty = investment > 60 ? (investment - 60) * 0.15 : 0;
  const publicApproval = Math.round(
    baseApproval + linearGrowth - plateauPenalty
  );
  
  // ============================================
  // Return normalized metrics
  // ============================================
  return {
    jobsCreated: Math.max(0, jobsCreated),
    carbonReduction: Math.max(0, Math.min(100, carbonReduction)),
    energyCost: Math.max(0.08, Math.min(0.20, energyCost)),
    gdpImpact: Math.round(gdpImpact * 10) / 10,
    gridStability: Math.max(80, Math.min(99, gridStability)),
    publicApproval: Math.max(30, Math.min(85, publicApproval)),
  };
}

/**
 * Calculate change between two metric sets
 * Useful for animations and delta displays
 */
export function calculateDelta(
  current: ImpactMetrics,
  previous: ImpactMetrics
): Partial<ImpactMetrics> {
  return {
    jobsCreated: current.jobsCreated - previous.jobsCreated,
    carbonReduction: current.carbonReduction - previous.carbonReduction,
    energyCost: current.energyCost - previous.energyCost,
    gdpImpact: current.gdpImpact - previous.gdpImpact,
    gridStability: current.gridStability - previous.gridStability,
    publicApproval: current.publicApproval - previous.publicApproval,
  };
}

/**
 * Generate projection data for timeline visualization
 * Returns 10-year trajectory based on investment level
 */
export function generateProjection(input: SimulationInput) {
  const { renewableInvestmentPercent } = input;
  const investment = Math.max(0, Math.min(100, renewableInvestmentPercent));
  const investmentFactor = investment / 100;
  
  const years = [];
  
  for (let year = 0; year <= 10; year++) {
    const yearProgress = year / 10;
    
    // Carbon reduction: accelerates over time
    const carbonReduction = Math.min(
      100,
      (investmentFactor * 8.5) * (1 + year * 0.12 * investmentFactor)
    );
    
    // Jobs: initial surge then stabilization
    const baseJobCount = (investment * 1500 - investment * investment * 3);
    const jobGrowth = baseJobCount * (0.3 + year * 0.07) / 50;
    
    // Energy cost: transition costs early, savings later
    const costImpact = investment < 50
      ? (year < 4 
          ? 5 + year * 2 * investmentFactor 
          : 12 - (year - 4) * 3 * investmentFactor)
      : (year < 3 
          ? 8 + year * 3 * investmentFactor 
          : 15 - (year - 3) * 4 * investmentFactor);
    
    // GDP: dip early, growth later
    const gdpImpact = investment < 30
      ? -0.5 + year * 0.15 * investmentFactor
      : -0.8 + year * 0.35 * investmentFactor;
    
    years.push({
      year: 2025 + year,
      yearLabel: year === 0 ? 'Now' : `${year}y`,
      carbonReduction: Math.max(0, Math.round(carbonReduction * 10) / 10),
      jobsCreated: Math.max(0, Math.round(jobGrowth)),
      energySavings: Math.round(Math.max(-15, Math.min(25, costImpact)) * 10) / 10,
      gdpGrowth: Math.round(Math.max(-1, Math.min(4, gdpImpact)) * 10) / 10,
    });
  }
  
  return years;
}
