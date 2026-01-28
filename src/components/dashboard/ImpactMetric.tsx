import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ImpactMetricProps {
  label: string;
  value: number;
  previousValue: number;
  unit: string;
  format?: 'number' | 'percent' | 'currency' | 'decimal';
  icon: LucideIcon;
  description: string;
  inverseColor?: boolean; // For metrics where lower is better
}

export function ImpactMetric({
  label,
  value,
  previousValue,
  unit,
  format = 'number',
  icon: Icon,
  description,
  inverseColor = false,
}: ImpactMetricProps) {
  // Animated value using spring
  const springValue = useSpring(previousValue, {
    stiffness: 100,
    damping: 30,
  });
  
  useEffect(() => {
    springValue.set(value);
  }, [value, springValue]);
  
  const displayValue = useTransform(springValue, (latest) => {
    switch (format) {
      case 'percent':
        return `${Math.round(latest)}%`;
      case 'currency':
        return `$${latest.toFixed(2)}`;
      case 'decimal':
        return latest > 0 ? `+${latest.toFixed(1)}%` : `${latest.toFixed(1)}%`;
      default:
        return latest >= 1000 
          ? `${(latest / 1000).toFixed(0)}K`
          : Math.round(latest).toString();
    }
  });
  
  const change = value - previousValue;
  const changePercent = previousValue !== 0 ? ((change / previousValue) * 100) : 0;
  
  // Determine if change is positive (considering inverseColor)
  const isPositive = inverseColor ? change < 0 : change > 0;
  const isNeutral = Math.abs(changePercent) < 0.5;
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.3 }}
      className="metric-card group relative overflow-hidden cursor-pointer"
    >
      {/* Subtle gradient overlay on hover */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
      />
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-2 rounded-lg bg-secondary group-hover:bg-primary/10 transition-colors duration-300"
            >
              <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
            </motion.div>
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">{label}</span>
          </div>
          
          {/* Change indicator */}
          {!isNeutral && (
            <motion.div
              initial={{ opacity: 0, x: 5 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                isPositive 
                  ? 'bg-metric-positive/10 text-metric-positive' 
                  : 'bg-metric-negative/10 text-metric-negative'
              }`}
            >
              {isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>{Math.abs(changePercent).toFixed(1)}%</span>
            </motion.div>
          )}
          
          {isNeutral && Math.abs(change) > 0.01 && (
            <div className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
              <Minus className="w-3 h-3" />
              <span>stable</span>
            </div>
          )}
        </div>
        
        {/* Value */}
        <div className="flex items-baseline gap-2 mb-2">
          <motion.span className="font-serif text-4xl text-foreground">
            {displayValue}
          </motion.span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
        
        {/* Description */}
        <p className="text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
