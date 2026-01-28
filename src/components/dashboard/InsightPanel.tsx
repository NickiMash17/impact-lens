import { motion } from 'framer-motion';
import { useSimulationStore } from '@/store/simulationStore';
import { Lightbulb, AlertTriangle, CheckCircle, Sparkles } from 'lucide-react';
import { useMemo } from 'react';

// Determine insight type based on investment level and metrics
function getInsightType(investment: number): 'balanced' | 'caution' | 'positive' {
  if (investment < 20) return 'caution';
  if (investment < 40) return 'balanced';
  if (investment < 60) return 'caution';
  return 'positive';
}

export function InsightPanel() {
  const { investmentLevel, insight, isGeneratingInsight } = useSimulationStore();
  
  const insightType = useMemo(
    () => getInsightType(investmentLevel),
    [investmentLevel]
  );
  
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
  
  const Icon = iconMap[insightType];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="metric-card"
    >
      <div className="flex items-start gap-4">
        <div className={`p-2.5 rounded-xl ${colorMap[insightType]}`}>
          {isGeneratingInsight ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
          ) : (
            <Icon className="w-5 h-5" />
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-serif text-lg text-foreground">
              What Changed and Why
            </h3>
            {isGeneratingInsight && (
              <span className="text-xs text-muted-foreground">Generating explanation...</span>
            )}
          </div>
          
          <motion.p
            key={insight}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-muted-foreground text-sm leading-relaxed"
          >
            {insight}
          </motion.p>
          
          {/* AI disclosure */}
          {!isGeneratingInsight && (
            <p className="text-xs text-muted-foreground/60 mt-3 italic">
              AI-generated explanation. This helps you understand the trade-offs—it does not recommend a decision.
            </p>
          )}
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
