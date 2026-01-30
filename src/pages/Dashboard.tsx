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
import { TradeOffSignal } from '@/components/dashboard/TradeOffSignal';
import { AnimatedSection } from '@/components/dashboard/AnimatedSection';
import { BackgroundParticles } from '@/components/dashboard/BackgroundParticles';
import { EnhancedBackground } from '@/components/dashboard/EnhancedBackground';
import { PatternBackground } from '@/components/dashboard/PatternBackground';
import { QuickGuide } from '@/components/dashboard/QuickGuide';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { KeyboardShortcuts } from '@/components/dashboard/KeyboardShortcuts';
import { WelcomeMessage } from '@/components/dashboard/WelcomeMessage';
import { RealWorldContext } from '@/components/dashboard/RealWorldContext';
import { SensitivityAnalysis } from '@/components/dashboard/SensitivityAnalysis';
import { DecisionRationale } from '@/components/dashboard/DecisionRationale';
import { ToastNotifications } from '@/components/dashboard/ToastNotifications';
import { useSimulationStore } from '@/store/simulationStore';

const Dashboard = () => {
  const { comparisonMode } = useSimulationStore();
  
  return (
    <div className="min-h-screen bg-background relative">
      <EnhancedBackground />
      <PatternBackground />
      <BackgroundParticles />
      <ScenarioHeader />
      
      <main className="container mx-auto px-6 py-8">
        {/* Scenario intro - Core interaction explanation */}
        <AnimatedSection>
          <div className="mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-serif text-3xl sm:text-4xl text-foreground mb-3"
            >
              Explore the Real-World Trade-Offs of Complex Decisions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-muted-foreground max-w-2xl mb-2"
            >
              Adjust renewable energy investment allocation. Watch how this single decision creates competing outcomes across environmental, economic, and social dimensions—before you make it.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-sm text-muted-foreground/80 italic max-w-2xl"
            >
              This is a simulation model, not a prediction. The goal is insight, not certainty.
            </motion.p>
          </div>
        </AnimatedSection>
        
        {/* Comparison Mode */}
        <AnimatedSection delay={0.1}>
          <ComparisonMode />
        </AnimatedSection>
        
        {/* Real-World Context */}
        {!comparisonMode && (
          <AnimatedSection delay={0.12}>
            <RealWorldContext />
          </AnimatedSection>
        )}
        
        {/* Sensitivity Analysis */}
        {!comparisonMode && (
          <AnimatedSection delay={0.13}>
            <SensitivityAnalysis />
          </AnimatedSection>
        )}
        
        {/* Trade-off Signal - Shows when competing outcomes occur */}
        {!comparisonMode && (
          <AnimatedSection delay={0.15}>
            <TradeOffSignal />
          </AnimatedSection>
        )}
        
        {/* Main layout: Control + Metrics */}
        {!comparisonMode ? (
          <>
            <AnimatedSection delay={0.2}>
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
            </AnimatedSection>
            
            {/* Timeline chart */}
            <AnimatedSection delay={0.3}>
              <div className="mb-8">
                <TimelineChart />
              </div>
            </AnimatedSection>
            
            {/* Insight panel */}
            <AnimatedSection delay={0.4}>
              <div className="mb-8">
                <InsightPanel />
              </div>
            </AnimatedSection>
            
            {/* Decision Rationale */}
            <AnimatedSection delay={0.45}>
              <div className="mb-8">
                <DecisionRationale />
              </div>
            </AnimatedSection>
          </>
        ) : (
          // Show slider in comparison mode when scenarios aren't both locked
          <AnimatedSection delay={0.2}>
            <div className="mb-8">
              <DecisionSlider />
            </div>
          </AnimatedSection>
        )}
        
        {/* Disclaimer */}
        <AnimatedSection delay={0.5}>
          <Disclaimer />
        </AnimatedSection>
      </main>
      
      {/* Welcome message for first-time users */}
      <WelcomeMessage />
      
      {/* Quick Guide - Floating help button */}
      <QuickGuide />
      
      {/* Keyboard shortcuts */}
      <KeyboardShortcuts />
      
      {/* Toast notifications */}
      <ToastNotifications />
    </div>
  );
};

export default Dashboard;
