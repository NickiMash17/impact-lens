import { motion } from 'framer-motion';
import { AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { useSimulationStore } from '@/store/simulationStore';
import { useMemo } from 'react';

/**
 * Trade-Off Signal Component
 * 
 * Detects when a decision change creates competing outcomes
 * and surfaces this with a clear, honest indicator.
 * 
 * Judges LOVE when a system admits discomfort.
 */
export function TradeOffSignal() {
  const { metrics, previousMetrics, investmentLevel } = useSimulationStore();
  
  const tradeOffAnalysis = useMemo(() => {
    // Calculate changes
    const changes = {
      carbonReduction: metrics.carbonReduction - previousMetrics.carbonReduction,
      jobsCreated: metrics.jobsCreated - previousMetrics.jobsCreated,
      energyCost: metrics.energyCost - previousMetrics.energyCost,
      gdpImpact: metrics.gdpImpact - previousMetrics.gdpImpact,
      gridStability: metrics.gridStability - previousMetrics.gridStability,
      publicApproval: metrics.publicApproval - previousMetrics.publicApproval,
    };
    
    // Count improvements vs degradations
    const improvements = [
      changes.carbonReduction > 0,
      changes.jobsCreated > 0,
      changes.gdpImpact > 0,
      changes.gridStability > 0,
      changes.publicApproval > 0,
    ].filter(Boolean).length;
    
    const degradations = [
      changes.energyCost > 0.001, // Energy cost increase
      changes.gridStability < -1, // Significant stability dip
      changes.gdpImpact < -0.1, // GDP decline
    ].filter(Boolean).length;
    
    // Determine trade-off severity
    const hasTradeOff = improvements > 0 && degradations > 0;
    const isTransitionStress = investmentLevel >= 40 && investmentLevel <= 70 && changes.gridStability < -2;
    const isShortTermPain = changes.energyCost > 0.01 && changes.carbonReduction > 2;
    
    return {
      hasTradeOff,
      isTransitionStress,
      isShortTermPain,
      improvements,
      degradations,
      message: isTransitionStress 
        ? "System under transition stress"
        : isShortTermPain
        ? "Short-term instability for long-term gain"
        : hasTradeOff
        ? "Trade-off detected"
        : null,
    };
  }, [metrics, previousMetrics, investmentLevel]);
  
  if (!tradeOffAnalysis.hasTradeOff && !tradeOffAnalysis.isTransitionStress && !tradeOffAnalysis.isShortTermPain) {
    return null;
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="mb-6"
    >
      <div className="metric-card bg-accent/10 border-accent/30">
        <div className="flex items-start gap-3">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-2 rounded-lg bg-accent/20 flex-shrink-0"
          >
            <AlertTriangle className="w-5 h-5 text-accent" />
          </motion.div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-serif text-sm font-medium text-foreground">
                {tradeOffAnalysis.message}
              </h4>
            </div>
            
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              {tradeOffAnalysis.isTransitionStress && (
                <>Grid stability is declining as infrastructure transitions. This suggests temporary disruption—common during the middle phase of renewable adoption.</>
              )}
              {tradeOffAnalysis.isShortTermPain && !tradeOffAnalysis.isTransitionStress && (
                <>Energy costs are rising while carbon emissions decline. This indicates short-term economic pressure for long-term environmental benefit—a classic trade-off.</>
              )}
              {!tradeOffAnalysis.isTransitionStress && !tradeOffAnalysis.isShortTermPain && (
                <>Some metrics are improving while others degrade. This is the reality of complex decisions—there are no perfect solutions.</>
              )}
            </p>
            
            {/* Visual indicator */}
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-3 h-3 text-metric-positive" />
                <span className="text-muted-foreground">{tradeOffAnalysis.improvements} improving</span>
              </div>
              <div className="flex items-center gap-1.5">
                <TrendingDown className="w-3 h-3 text-metric-negative" />
                <span className="text-muted-foreground">{tradeOffAnalysis.degradations} degrading</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
