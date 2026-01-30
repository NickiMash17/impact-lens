import { create } from 'zustand';
import { simulateImpact, ImpactMetrics, SimulationInput } from '@/lib/simulation';
import { generateInsight } from '@/lib/ai-insights';

export interface ComparisonScenario {
  investmentLevel: number;
  metrics: ImpactMetrics;
  label?: string;
}

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
  
  // Comparison mode
  comparisonMode: boolean;
  scenarioA: ComparisonScenario | null;
  scenarioB: ComparisonScenario | null;
  
  // Real-world context
  showRealWorldContext: boolean;
  setShowRealWorldContext: (show: boolean) => void;
  
  // Sensitivity analysis
  showUncertainty: boolean;
  setShowUncertainty: (show: boolean) => void;
  
  // Decision rationale
  decisionRationale: string;
  setDecisionRationale: (rationale: string) => void;
  showDecisionRationale: boolean;
  setShowDecisionRationale: (show: boolean) => void;
  
  // Toast notifications
  toasts: Array<{ id: string; message: string; type: 'success' | 'info' | 'warning' }>;
  addToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
  
  // Actions
  setInvestmentLevel: (level: number) => Promise<void>;
  toggleComparisonMode: () => void;
  lockScenarioA: () => void;
  lockScenarioB: () => void;
  clearComparison: () => void;
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
  
  comparisonMode: false,
  scenarioA: null,
  scenarioB: null,
  
  showRealWorldContext: false,
  setShowRealWorldContext: (show: boolean) => set({ showRealWorldContext: show }),
  
  showUncertainty: false,
  setShowUncertainty: (show: boolean) => set({ showUncertainty: show }),
  
  decisionRationale: '',
  setDecisionRationale: (rationale: string) => set({ decisionRationale: rationale }),
  showDecisionRationale: false,
  setShowDecisionRationale: (show: boolean) => set({ showDecisionRationale: show }),
  
  toasts: [],
  addToast: (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Math.random().toString(36).substring(7);
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 4000);
  },
  removeToast: (id: string) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },
  
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
  
  toggleComparisonMode: () => {
    const state = get();
    set({ comparisonMode: !state.comparisonMode });
  },
  
  lockScenarioA: () => {
    const state = get();
    set({
      scenarioA: {
        investmentLevel: state.investmentLevel,
        metrics: state.metrics,
        label: `Scenario A (${state.investmentLevel}%)`,
      },
    });
    get().addToast('Scenario A locked successfully', 'success');
  },
  
  lockScenarioB: () => {
    const state = get();
    set({
      scenarioB: {
        investmentLevel: state.investmentLevel,
        metrics: state.metrics,
        label: `Scenario B (${state.investmentLevel}%)`,
      },
    });
    get().addToast('Scenario B locked successfully', 'success');
  },
  
  clearComparison: () => {
    set({
      comparisonMode: false,
      scenarioA: null,
      scenarioB: null,
    });
  },
}));
