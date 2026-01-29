import { motion } from 'framer-motion';
import { useSimulationStore, ComparisonScenario } from '@/store/simulationStore';
import { Lock, Unlock, X, GitCompare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ImpactMetric } from './ImpactMetric';
import { Briefcase, Leaf, DollarSign, TrendingUp, Zap, Users } from 'lucide-react';

interface ComparisonCardProps {
  scenario: ComparisonScenario;
  label: string;
  onUnlock: () => void;
  isLocked: boolean;
}

function ComparisonCard({ scenario, label, onUnlock, isLocked }: ComparisonCardProps) {
  const metricsConfig = [
    {
      key: 'jobsCreated',
      label: 'Jobs Created',
      icon: Briefcase,
      unit: 'positions',
      format: 'number' as const,
      description: 'New employment opportunities',
      inverseColor: false,
    },
    {
      key: 'carbonReduction',
      label: 'Carbon Reduction',
      icon: Leaf,
      unit: 'vs baseline',
      format: 'percent' as const,
      description: 'Decrease in emissions',
      inverseColor: false,
    },
    {
      key: 'energyCost',
      label: 'Energy Cost',
      icon: DollarSign,
      unit: 'per kWh',
      format: 'currency' as const,
      description: 'Average cost to consumers',
      inverseColor: true,
    },
    {
      key: 'gdpImpact',
      label: 'GDP Impact',
      icon: TrendingUp,
      unit: 'growth',
      format: 'decimal' as const,
      description: 'Effect on GDP',
      inverseColor: false,
    },
    {
      key: 'gridStability',
      label: 'Grid Stability',
      icon: Zap,
      unit: 'reliability',
      format: 'percent' as const,
      description: 'Power grid uptime',
      inverseColor: false,
    },
    {
      key: 'publicApproval',
      label: 'Public Approval',
      icon: Users,
      unit: 'support',
      format: 'percent' as const,
      description: 'Citizen sentiment',
      inverseColor: false,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="metric-card"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-serif text-xl text-foreground mb-1">{label}</h3>
          <p className="text-sm text-muted-foreground">
            {scenario.investmentLevel}% renewable investment
          </p>
        </div>
        {isLocked && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onUnlock}
            className="text-muted-foreground hover:text-foreground"
          >
            <Unlock className="w-4 h-4 mr-2" />
            Unlock
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metricsConfig.map((config) => (
          <ImpactMetric
            key={config.key}
            label={config.label}
            value={scenario.metrics[config.key as keyof typeof scenario.metrics]}
            previousValue={scenario.metrics[config.key as keyof typeof scenario.metrics]}
            unit={config.unit}
            format={config.format}
            icon={config.icon}
            description={config.description}
            inverseColor={config.inverseColor}
          />
        ))}
      </div>
    </motion.div>
  );
}

function ComparisonDiff({ scenarioA, scenarioB }: { scenarioA: ComparisonScenario; scenarioB: ComparisonScenario }) {
  const calculateDiff = (key: keyof typeof scenarioA.metrics) => {
    const diff = scenarioB.metrics[key] - scenarioA.metrics[key];
    const percentDiff = scenarioA.metrics[key] !== 0 
      ? ((diff / scenarioA.metrics[key]) * 100).toFixed(1)
      : '0';
    return { diff, percentDiff };
  };

  const metrics = [
    { key: 'jobsCreated' as const, label: 'Jobs Created', format: 'number' },
    { key: 'carbonReduction' as const, label: 'Carbon Reduction', format: 'percent' },
    { key: 'energyCost' as const, label: 'Energy Cost', format: 'currency' },
    { key: 'gdpImpact' as const, label: 'GDP Impact', format: 'decimal' },
    { key: 'gridStability' as const, label: 'Grid Stability', format: 'percent' },
    { key: 'publicApproval' as const, label: 'Public Approval', format: 'percent' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="metric-card bg-primary/5 border-primary/20"
    >
      <h3 className="font-serif text-lg text-foreground mb-4">Difference (B - A)</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {metrics.map((metric) => {
          const { diff, percentDiff } = calculateDiff(metric.key);
          const isPositive = diff > 0;
          const displayValue = metric.format === 'percent' || metric.format === 'decimal'
            ? `${isPositive ? '+' : ''}${diff.toFixed(metric.format === 'decimal' ? 1 : 0)}${metric.format === 'percent' ? '%' : '%'}`
            : `${isPositive ? '+' : ''}${diff.toFixed(0)}`;
          
          return (
            <div key={metric.key} className="text-center">
              <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
              <p className={`font-serif text-2xl ${isPositive ? 'text-metric-positive' : 'text-metric-negative'}`}>
                {displayValue}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {percentDiff !== '0' && `${isPositive ? '+' : ''}${percentDiff}%`}
              </p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export function ComparisonMode() {
  const {
    comparisonMode,
    scenarioA,
    scenarioB,
    investmentLevel,
    metrics,
    toggleComparisonMode,
    lockScenarioA,
    lockScenarioB,
    clearComparison,
  } = useSimulationStore();

  if (!comparisonMode) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-8"
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={toggleComparisonMode}
            variant="outline"
            className="w-full sm:w-auto group hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
          >
            <GitCompare className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
            Enable Comparison Mode
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl text-foreground mb-2">Compare Scenarios</h2>
          <p className="text-sm text-muted-foreground">
            Lock two different investment levels to see them side-by-side
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => {
              clearComparison();
              toggleComparisonMode();
            }}
            variant="ghost"
            size="sm"
            className="hover:bg-destructive/10 hover:text-destructive transition-colors duration-300"
          >
            <X className="w-4 h-4 mr-2" />
            Exit Comparison
          </Button>
        </motion.div>
      </div>

      {/* Lock buttons */}
      <div className="flex gap-4">
        <motion.div 
          whileHover={!scenarioA ? { scale: 1.02 } : {}}
          whileTap={!scenarioA ? { scale: 0.98 } : {}}
          className="flex-1"
        >
          <Button
            onClick={lockScenarioA}
            disabled={!!scenarioA}
            variant={scenarioA ? "secondary" : "outline"}
            className="w-full group hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
          >
            {scenarioA ? (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Scenario A Locked ({scenarioA.investmentLevel}%)
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 mr-2 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
                Lock Scenario A ({investmentLevel}%)
              </>
            )}
          </Button>
        </motion.div>
        <motion.div 
          whileHover={!scenarioB ? { scale: 1.02 } : {}}
          whileTap={!scenarioB ? { scale: 0.98 } : {}}
          className="flex-1"
        >
          <Button
            onClick={lockScenarioB}
            disabled={!!scenarioB}
            variant={scenarioB ? "secondary" : "outline"}
            className="w-full group hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
          >
            {scenarioB ? (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Scenario B Locked ({scenarioB.investmentLevel}%)
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 mr-2 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
                Lock Scenario B ({investmentLevel}%)
              </>
            )}
          </Button>
        </motion.div>
      </div>

      {/* Comparison view */}
      {scenarioA && scenarioB && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid lg:grid-cols-2 gap-6">
            <ComparisonCard
              scenario={scenarioA}
              label="Scenario A"
              onUnlock={() => useSimulationStore.setState({ scenarioA: null })}
              isLocked={true}
            />
            <ComparisonCard
              scenario={scenarioB}
              label="Scenario B"
              onUnlock={() => useSimulationStore.setState({ scenarioB: null })}
              isLocked={true}
            />
          </div>
          <ComparisonDiff scenarioA={scenarioA} scenarioB={scenarioB} />
        </motion.div>
      )}

      {/* Instructions */}
      {(!scenarioA || !scenarioB) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="metric-card bg-muted/30 border-dashed"
        >
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground text-center font-medium">
              {!scenarioA && !scenarioB && (
                <>📊 How to compare scenarios:</>
              )}
              {scenarioA && !scenarioB && (
                <>✅ Scenario A locked. Next step:</>
              )}
              {!scenarioA && scenarioB && (
                <>✅ Scenario B locked. Next step:</>
              )}
            </p>
            <p className="text-sm text-muted-foreground text-center">
              {!scenarioA && !scenarioB && (
                <>1. Adjust the slider to your first scenario<br />2. Click "Lock Scenario A"<br />3. Adjust the slider to your second scenario<br />4. Click "Lock Scenario B" to see the comparison</>
              )}
              {scenarioA && !scenarioB && (
                <>Adjust the slider to a different investment level, then click "Lock Scenario B" to compare.</>
              )}
              {!scenarioA && scenarioB && (
                <>Adjust the slider to a different investment level, then click "Lock Scenario A" to compare.</>
              )}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
