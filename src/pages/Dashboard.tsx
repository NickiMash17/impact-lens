/**
 * Dashboard Page
 * 
 * Implements core Impact Lens features:
 * - Single-Decision Scenario Simulation (DecisionSlider)
 * - Trade-Off-Aware Impact Modeling (MetricsGrid)
 * - Real-Time Impact Recalculation (simulationStore)
 * - Multi-Dimensional Impact Dashboard (layout)
 * - Time-Horizon Impact Projection (TimelineChart)
 * - AI-Generated Impact Insight (InsightPanel)
 * - Transparent Simulation Boundaries (Disclaimer)
 * - Comparison Mode (ComparisonMode)
 * 
 * See FEATURES.md for complete feature documentation.
 */
import { motion } from 'framer-motion';
import { ScenarioHeader } from '@/components/dashboard/ScenarioHeader';
import { DecisionSlider } from '@/components/dashboard/DecisionSlider';
import { MetricsGrid } from '@/components/dashboard/MetricsGrid';
import { InsightPanel } from '@/components/dashboard/InsightPanel';
import { TimelineChart } from '@/components/dashboard/TimelineChart';
import { Disclaimer } from '@/components/dashboard/Disclaimer';
import { ComparisonMode } from '@/components/dashboard/ComparisonMode';
import { useSimulationStore } from '@/store/simulationStore';

const Dashboard = () => {
  const { comparisonMode } = useSimulationStore();
  
  return (
    <div className="min-h-screen bg-background">
      <ScenarioHeader />
      
      <main className="container mx-auto px-6 py-8">
        {/* Scenario intro - Core interaction explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-3">
            Renewable Energy Investment Allocation
          </h1>
          <p className="text-muted-foreground max-w-2xl mb-2">
            Adjust the percentage of budget allocated to renewable energy. 
            Watch how this single decision ripples across environmental, economic, and social dimensions—including visible trade-offs.
          </p>
          <p className="text-sm text-muted-foreground/80 italic max-w-2xl">
            This is a simulation model, not a prediction. The goal is insight, not certainty.
          </p>
        </motion.div>
        
        {/* Comparison Mode */}
        <ComparisonMode />
        
        {/* Main layout: Control + Metrics */}
        {!comparisonMode ? (
          <>
            <div className="grid lg:grid-cols-12 gap-6 mb-8">
              {/* Left: Decision control */}
              <div className="lg:col-span-4">
                <DecisionSlider />
              </div>
              
              {/* Right: Metrics grid */}
              <div className="lg:col-span-8">
                <MetricsGrid />
              </div>
            </div>
            
            {/* Timeline chart */}
            <div className="mb-8">
              <TimelineChart />
            </div>
            
            {/* Insight panel */}
            <div className="mb-8">
              <InsightPanel />
            </div>
          </>
        ) : (
          // Show slider in comparison mode when scenarios aren't both locked
          <div className="mb-8">
            <DecisionSlider />
          </div>
        )}
        
        {/* Disclaimer */}
        <Disclaimer />
      </main>
    </div>
  );
};

export default Dashboard;
