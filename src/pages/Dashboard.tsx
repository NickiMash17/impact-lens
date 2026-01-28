import { motion } from 'framer-motion';
import { ScenarioHeader } from '@/components/dashboard/ScenarioHeader';
import { DecisionSlider } from '@/components/dashboard/DecisionSlider';
import { MetricsGrid } from '@/components/dashboard/MetricsGrid';
import { InsightPanel } from '@/components/dashboard/InsightPanel';
import { TimelineChart } from '@/components/dashboard/TimelineChart';
import { Disclaimer } from '@/components/dashboard/Disclaimer';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScenarioHeader />
      
      <main className="container mx-auto px-6 py-8">
        {/* Scenario intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-3">
            National Energy Transition Scenario
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Explore how shifting investment from fossil fuels to renewable energy 
            affects employment, emissions, costs, and public sentiment over a 10-year horizon.
          </p>
        </motion.div>
        
        {/* Main layout: Control + Metrics */}
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
        
        {/* Disclaimer */}
        <Disclaimer />
      </main>
    </div>
  );
};

export default Dashboard;
