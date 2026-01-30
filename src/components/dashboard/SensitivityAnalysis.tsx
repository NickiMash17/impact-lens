import { motion, AnimatePresence } from 'framer-motion';
import { useSimulationStore } from '@/store/simulationStore';
import { BarChart3, Info, TrendingUp, TrendingDown } from 'lucide-react';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ImpactMetrics } from '@/lib/simulation';

/**
 * Calculate uncertainty ranges for metrics
 * Simulates variability in model assumptions
 */
function calculateUncertaintyRanges(
  baseMetrics: ImpactMetrics,
  investmentLevel: number
): { min: ImpactMetrics; max: ImpactMetrics } {
  // Uncertainty increases with investment level (more variables, more uncertainty)
  const uncertaintyFactor = 0.05 + (investmentLevel / 100) * 0.15; // 5-20% uncertainty
  
  const ranges = {
    min: { ...baseMetrics },
    max: { ...baseMetrics },
  };
  
  // Jobs: ±15% uncertainty
  const jobsUncertainty = baseMetrics.jobsCreated * 0.15;
  ranges.min.jobsCreated = Math.max(0, Math.round(baseMetrics.jobsCreated - jobsUncertainty));
  ranges.max.jobsCreated = Math.round(baseMetrics.jobsCreated + jobsUncertainty);
  
  // Carbon: ±8% uncertainty (more predictable)
  const carbonUncertainty = baseMetrics.carbonReduction * 0.08;
  ranges.min.carbonReduction = Math.max(0, Math.round(baseMetrics.carbonReduction - carbonUncertainty));
  ranges.max.carbonReduction = Math.min(100, Math.round(baseMetrics.carbonReduction + carbonUncertainty));
  
  // Energy Cost: ±12% uncertainty
  const costUncertainty = baseMetrics.energyCost * 0.12;
  ranges.min.energyCost = Math.max(0.08, Math.round((baseMetrics.energyCost - costUncertainty) * 100) / 100);
  ranges.max.energyCost = Math.min(0.20, Math.round((baseMetrics.energyCost + costUncertainty) * 100) / 100);
  
  // GDP: ±25% uncertainty (highly variable)
  const gdpUncertainty = Math.abs(baseMetrics.gdpImpact) * 0.25;
  ranges.min.gdpImpact = Math.round((baseMetrics.gdpImpact - gdpUncertainty) * 10) / 10;
  ranges.max.gdpImpact = Math.round((baseMetrics.gdpImpact + gdpUncertainty) * 10) / 10;
  
  // Grid Stability: ±5% uncertainty (infrastructure is somewhat predictable)
  const stabilityUncertainty = baseMetrics.gridStability * 0.05;
  ranges.min.gridStability = Math.max(80, Math.round(baseMetrics.gridStability - stabilityUncertainty));
  ranges.max.gridStability = Math.min(99, Math.round(baseMetrics.gridStability + stabilityUncertainty));
  
  // Public Approval: ±10% uncertainty
  const approvalUncertainty = baseMetrics.publicApproval * 0.10;
  ranges.min.publicApproval = Math.max(30, Math.round(baseMetrics.publicApproval - approvalUncertainty));
  ranges.max.publicApproval = Math.min(85, Math.round(baseMetrics.publicApproval + approvalUncertainty));
  
  return ranges;
}

export function SensitivityAnalysis() {
  const { metrics, investmentLevel, showUncertainty, setShowUncertainty } = useSimulationStore();
  
  const uncertaintyRanges = useMemo(
    () => calculateUncertaintyRanges(metrics, investmentLevel),
    [metrics, investmentLevel]
  );
  
  if (!showUncertainty) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6"
      >
        <Button
          onClick={() => setShowUncertainty(true)}
          variant="outline"
          size="sm"
          className="group hover:border-primary/40 hover:bg-primary/5"
        >
          <BarChart3 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
          Show Uncertainty Ranges
        </Button>
      </motion.div>
    );
  }

  const metricsList = [
    { key: 'jobsCreated' as const, label: 'Jobs Created', format: (v: number) => `${Math.round(v).toLocaleString()}` },
    { key: 'carbonReduction' as const, label: 'Carbon Reduction', format: (v: number) => `${Math.round(v)}%` },
    { key: 'energyCost' as const, label: 'Energy Cost', format: (v: number) => `$${v.toFixed(2)}/kWh` },
    { key: 'gdpImpact' as const, label: 'GDP Impact', format: (v: number) => `${v > 0 ? '+' : ''}${v.toFixed(1)}%` },
    { key: 'gridStability' as const, label: 'Grid Stability', format: (v: number) => `${Math.round(v)}%` },
    { key: 'publicApproval' as const, label: 'Public Approval', format: (v: number) => `${Math.round(v)}%` },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="mb-6"
      >
        <Card className="p-6 bg-muted/30 border-primary/20">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h3 className="font-serif text-lg text-foreground">
                Sensitivity Analysis
              </h3>
            </div>
            <Button
              onClick={() => setShowUncertainty(false)}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
            >
              ×
            </Button>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-background/50 border border-border/40">
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Uncertainty Ranges
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                These ranges reflect potential variability based on model assumptions, external factors, and implementation differences. The actual outcomes may fall anywhere within these bounds.
              </p>
              
              <div className="space-y-3">
                {metricsList.map((metric) => {
                  const base = metrics[metric.key];
                  const min = uncertaintyRanges.min[metric.key];
                  const max = uncertaintyRanges.max[metric.key];
                  const range = max - min;
                  const percentRange = base !== 0 ? ((range / Math.abs(base)) * 100).toFixed(1) : '0';
                  
                  return (
                    <div key={metric.key} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-foreground font-medium">
                          {metric.label}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          ±{percentRange}% uncertainty
                        </span>
                      </div>
                      
                      <div className="relative h-8 bg-muted/50 rounded-lg overflow-hidden">
                        {/* Uncertainty range bar */}
                        <div
                          className="absolute inset-0 bg-primary/20"
                          style={{
                            left: `${((min - min) / (max - min || 1)) * 100}%`,
                            width: `${((max - min) / (max - min || 1)) * 100}%`,
                          }}
                        />
                        
                        {/* Base value indicator */}
                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-primary"
                          style={{
                            left: `${((base - min) / (max - min || 1)) * 100}%`,
                          }}
                        />
                        
                        {/* Labels */}
                        <div className="absolute inset-0 flex items-center justify-between px-2 text-xs">
                          <span className="text-muted-foreground">
                            {metric.format(min)}
                          </span>
                          <span className="text-foreground font-medium">
                            {metric.format(base)}
                          </span>
                          <span className="text-muted-foreground">
                            {metric.format(max)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 rounded-lg bg-accent/10 border border-accent/20">
              <Info className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">Why uncertainty matters:</strong> Real-world outcomes depend on many factors beyond the model—policy implementation quality, technological breakthroughs, economic conditions, and unforeseen events. These ranges help you understand the confidence level in projections.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
