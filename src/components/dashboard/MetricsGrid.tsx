import { motion } from 'framer-motion';
import { useSimulationStore } from '@/store/simulationStore';
import { ImpactMetric } from './ImpactMetric';
import { Briefcase, Leaf, DollarSign, TrendingUp, Zap, Users } from 'lucide-react';

export function MetricsGrid() {
  const { metrics, previousMetrics } = useSimulationStore();
  
  const metricsConfig = [
    {
      key: 'jobsCreated',
      label: 'Jobs Created',
      icon: Briefcase,
      unit: 'positions',
      format: 'number' as const,
      description: 'New employment opportunities in renewable sector',
      inverseColor: false,
    },
    {
      key: 'carbonReduction',
      label: 'Carbon Reduction',
      icon: Leaf,
      unit: 'vs baseline',
      format: 'percent' as const,
      description: 'Decrease in annual carbon emissions',
      inverseColor: false,
    },
    {
      key: 'energyCost',
      label: 'Energy Cost',
      icon: DollarSign,
      unit: 'per kWh',
      format: 'currency' as const,
      description: 'Average cost to consumers',
      inverseColor: true, // Lower is better
    },
    {
      key: 'gdpImpact',
      label: 'GDP Impact',
      icon: TrendingUp,
      unit: 'growth',
      format: 'decimal' as const,
      description: 'Effect on gross domestic product',
      inverseColor: false,
    },
    {
      key: 'gridStability',
      label: 'Grid Stability',
      icon: Zap,
      unit: 'reliability',
      format: 'percent' as const,
      description: 'Power grid uptime and consistency',
      inverseColor: false,
    },
    {
      key: 'publicApproval',
      label: 'Public Approval',
      icon: Users,
      unit: 'support',
      format: 'percent' as const,
      description: 'Citizen sentiment toward policy',
      inverseColor: false,
    },
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {metricsConfig.map((config, i) => (
        <motion.div
          key={config.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
        >
          <ImpactMetric
            label={config.label}
            value={metrics[config.key as keyof typeof metrics]}
            previousValue={previousMetrics[config.key as keyof typeof previousMetrics]}
            unit={config.unit}
            format={config.format}
            icon={config.icon}
            description={config.description}
            inverseColor={config.inverseColor}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
