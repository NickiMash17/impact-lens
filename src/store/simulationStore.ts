import { create } from 'zustand';

export interface ImpactMetrics {
  jobsCreated: number;
  carbonReduction: number;
  energyCost: number;
  gdpImpact: number;
  gridStability: number;
  publicApproval: number;
}

interface SimulationState {
  // Primary input: Renewable energy investment percentage
  investmentLevel: number;
  setInvestmentLevel: (level: number) => void;
  
  // Derived metrics based on investment
  metrics: ImpactMetrics;
  
  // Previous metrics for comparison
  previousMetrics: ImpactMetrics;
  
  // Loading state for AI insight
  isGeneratingInsight: boolean;
  insight: string;
  setInsight: (insight: string) => void;
  setIsGeneratingInsight: (loading: boolean) => void;
}

// Simulation logic: Calculate impacts based on investment level
// These are simplified models that show trade-offs
const calculateMetrics = (investment: number): ImpactMetrics => {
  // Base values at 0% investment
  const baseJobs = 50000;
  const baseCarbon = 0;
  const baseCost = 0.12; // $/kWh
  const baseGDP = 0;
  const baseStability = 95;
  const baseApproval = 45;
  
  // Non-linear relationships to show trade-offs
  // Jobs: Increases but diminishing returns
  const jobsCreated = Math.round(baseJobs + (investment * 1500) - (investment * investment * 3));
  
  // Carbon reduction: Near-linear, strong positive
  const carbonReduction = Math.round(investment * 8.5);
  
  // Energy cost: Initially increases (transition cost), then decreases at high investment
  const costMultiplier = investment < 50 
    ? 1 + (investment * 0.004) 
    : 1.2 - ((investment - 50) * 0.006);
  const energyCost = Math.round(baseCost * costMultiplier * 100) / 100;
  
  // GDP: Positive but with initial dip (transition costs)
  const gdpImpact = investment < 30 
    ? -0.2 + (investment * 0.01)
    : -0.2 + (investment * 0.025);
  
  // Grid stability: Dips in middle range, improves with high investment (battery storage)
  const stabilityDip = Math.sin((investment / 100) * Math.PI) * 8;
  const gridStability = Math.round(baseStability - stabilityDip + (investment > 70 ? (investment - 70) * 0.3 : 0));
  
  // Public approval: Generally positive but complex
  const publicApproval = Math.round(baseApproval + (investment * 0.45) - (investment > 60 ? (investment - 60) * 0.15 : 0));
  
  return {
    jobsCreated: Math.max(0, jobsCreated),
    carbonReduction: Math.max(0, Math.min(100, carbonReduction)),
    energyCost: Math.max(0.08, energyCost),
    gdpImpact: Math.round(gdpImpact * 10) / 10,
    gridStability: Math.max(80, Math.min(99, gridStability)),
    publicApproval: Math.max(30, Math.min(85, publicApproval)),
  };
};

const initialMetrics = calculateMetrics(35);

export const useSimulationStore = create<SimulationState>((set) => ({
  investmentLevel: 35,
  metrics: initialMetrics,
  previousMetrics: initialMetrics,
  isGeneratingInsight: false,
  insight: "At 35% renewable investment, you're balancing job growth with manageable transition costs. Carbon emissions are declining steadily, though grid stability requires attention during this phase.",
  
  setInvestmentLevel: (level) => set((state) => ({
    investmentLevel: level,
    previousMetrics: state.metrics,
    metrics: calculateMetrics(level),
  })),
  
  setInsight: (insight) => set({ insight }),
  setIsGeneratingInsight: (loading) => set({ isGeneratingInsight: loading }),
}));
