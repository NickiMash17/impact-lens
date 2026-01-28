import { motion } from 'framer-motion';
import { useSimulationStore } from '@/store/simulationStore';
import { Lightbulb, AlertTriangle, CheckCircle } from 'lucide-react';
import { useEffect, useMemo } from 'react';

// Generate insights based on current investment level
const generateInsight = (investment: number): { text: string; type: 'balanced' | 'caution' | 'positive' } => {
  if (investment < 20) {
    return {
      text: `At ${investment}% renewable investment, you're maintaining status quo economics but missing critical decarbonization windows. Job creation remains modest, and public pressure for climate action will likely intensify. Consider: what's the cost of inaction?`,
      type: 'caution',
    };
  }
  
  if (investment < 40) {
    return {
      text: `${investment}% investment represents a measured approach. You're seeing initial job growth and carbon reduction, while energy costs remain stable. Grid stability is strong. This is a common "safe" policy position—effective for short-term goals but may require acceleration later.`,
      type: 'balanced',
    };
  }
  
  if (investment < 60) {
    return {
      text: `At ${investment}%, you've entered the transition zone. Carbon reduction is significant, but energy costs and grid stability face pressure. This is the hardest phase—temporary disruption for long-term gain. Public approval is high, but execution risk is elevated.`,
      type: 'caution',
    };
  }
  
  if (investment < 80) {
    return {
      text: `${investment}% investment signals serious commitment. Emissions are dropping rapidly, and the job market is transforming. You're past the steepest cost increases, and battery storage investments are improving grid reliability. The economic inflection point is approaching.`,
      type: 'positive',
    };
  }
  
  return {
    text: `At ${investment}%, you're modeling an aggressive renewable-first economy. Massive carbon reduction, strong job creation, and GDP growth are projected—but this requires unprecedented infrastructure investment and public buy-in. Grid stability depends on storage technology deployment.`,
    type: 'positive',
  };
};

export function InsightPanel() {
  const { investmentLevel, insight, setInsight } = useSimulationStore();
  
  const generatedInsight = useMemo(
    () => generateInsight(investmentLevel),
    [investmentLevel]
  );
  
  useEffect(() => {
    setInsight(generatedInsight.text);
  }, [generatedInsight.text, setInsight]);
  
  const iconMap = {
    balanced: Lightbulb,
    caution: AlertTriangle,
    positive: CheckCircle,
  };
  
  const colorMap = {
    balanced: 'text-muted-foreground bg-muted/50',
    caution: 'text-accent bg-accent/10',
    positive: 'text-primary bg-primary/10',
  };
  
  const Icon = iconMap[generatedInsight.type];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="metric-card"
    >
      <div className="flex items-start gap-4">
        <div className={`p-2.5 rounded-xl ${colorMap[generatedInsight.type]}`}>
          <Icon className="w-5 h-5" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-serif text-lg text-foreground mb-2">
            Impact Analysis
          </h3>
          
          <motion.p
            key={insight}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-muted-foreground text-sm leading-relaxed"
          >
            {insight}
          </motion.p>
        </div>
      </div>
      
      {/* Trade-off indicator */}
      <div className="mt-6 pt-4 border-t border-border/40">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-metric-positive animate-pulse" />
          <span>Some metrics improve while others may degrade—that's the nature of complex decisions.</span>
        </div>
      </div>
    </motion.div>
  );
}
