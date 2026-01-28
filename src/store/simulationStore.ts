import { create } from 'zustand';
import { simulateImpact, ImpactMetrics, SimulationInput } from '@/lib/simulation';
import { generateInsight } from '@/lib/ai-insights';

interface SimulationState {
  // Primary input: Renewable energy investment percentage
  investmentLevel: number;
  previousInvestmentLevel: number;
  
  // Derived metrics based on investment
  metrics: ImpactMetrics;
  previousMetrics: ImpactMetrics;
  
  // AI-generated insight
  isGeneratingInsight: boolean;
  insight: string;
  
  // Actions
  setInvestmentLevel: (level: number) => Promise<void>;
}

const initialInput: SimulationInput = { renewableInvestmentPercent: 35 };
const initialMetrics = simulateImpact(initialInput);

export const useSimulationStore = create<SimulationState>((set, get) => ({
  investmentLevel: 35,
  previousInvestmentLevel: 35,
  metrics: initialMetrics,
  previousMetrics: initialMetrics,
  isGeneratingInsight: false,
  insight: "At 35% renewable investment, you're balancing job growth with manageable transition costs. Carbon emissions are declining steadily, though grid stability requires attention during this phase.",
  
  setInvestmentLevel: async (level) => {
    const state = get();
    const newInput: SimulationInput = { renewableInvestmentPercent: level };
    const newMetrics = simulateImpact(newInput);
    
    // Update state immediately for responsive UI
    set({
      investmentLevel: level,
      previousInvestmentLevel: state.investmentLevel,
      previousMetrics: state.metrics,
      metrics: newMetrics,
      isGeneratingInsight: true,
    });
    
    // Generate AI insight asynchronously
    try {
      const insight = await generateInsight(
        newInput,
        newMetrics,
        state.metrics,
        { renewableInvestmentPercent: state.investmentLevel }
      );
      
      set({ insight, isGeneratingInsight: false });
    } catch (error) {
      console.error('Failed to generate insight:', error);
      set({ isGeneratingInsight: false });
    }
  },
}));
