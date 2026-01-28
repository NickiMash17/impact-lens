import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useSimulationStore } from '@/store/simulationStore';

// Generate 10-year projection data based on investment level
const generateProjectionData = (investment: number) => {
  const years = [];
  
  for (let year = 0; year <= 10; year++) {
    // Growth curves that depend on investment level
    const investmentFactor = investment / 100;
    
    // Carbon reduction: accelerates over time with higher investment
    const carbonReduction = Math.min(
      100,
      (investmentFactor * 8.5) * (1 + year * 0.12 * investmentFactor)
    );
    
    // Jobs: initial surge then stabilization
    const jobGrowth = 
      (investment * 1500 - investment * investment * 3) * 
      (0.3 + year * 0.07) / 50;
    
    // Energy cost: transition costs early, savings later
    const costImpact = investment < 50
      ? (year < 4 ? 5 + year * 2 * investmentFactor : 12 - (year - 4) * 3 * investmentFactor)
      : (year < 3 ? 8 + year * 3 * investmentFactor : 15 - (year - 3) * 4 * investmentFactor);
    
    // GDP: dip early, growth later
    const gdpImpact = investment < 30
      ? -0.5 + year * 0.15 * investmentFactor
      : -0.8 + year * 0.35 * investmentFactor;
    
    years.push({
      year: 2025 + year,
      yearLabel: year === 0 ? 'Now' : `${year}y`,
      carbonReduction: Math.max(0, Math.round(carbonReduction * 10) / 10),
      jobsCreated: Math.max(0, Math.round(jobGrowth)),
      energySavings: Math.round(Math.max(-15, Math.min(25, costImpact)) * 10) / 10,
      gdpGrowth: Math.round(Math.max(-1, Math.min(4, gdpImpact)) * 10) / 10,
    });
  }
  
  return years;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="font-serif text-sm text-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-xs">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="text-foreground font-medium">
              {entry.name.includes('Carbon') || entry.name.includes('GDP') 
                ? `${entry.value}%` 
                : entry.name.includes('Jobs')
                ? `${entry.value}K`
                : `${entry.value > 0 ? '+' : ''}${entry.value}%`
              }
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function TimelineChart() {
  const { investmentLevel } = useSimulationStore();
  
  const data = useMemo(
    () => generateProjectionData(investmentLevel),
    [investmentLevel]
  );
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="metric-card"
    >
      <div className="mb-6">
        <h3 className="font-serif text-xl text-foreground mb-2">
          10-Year Impact Trajectory
        </h3>
        <p className="text-sm text-muted-foreground">
          Projected outcomes based on {investmentLevel}% renewable investment
        </p>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="carbonGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(158, 45%, 45%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(158, 45%, 45%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="jobsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(220, 70%, 55%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(220, 70%, 55%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gdpGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(18, 45%, 52%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(18, 45%, 52%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(220, 15%, 20%)" 
              vertical={false}
            />
            
            <XAxis
              dataKey="yearLabel"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(220, 10%, 55%)', fontSize: 11 }}
              dy={10}
            />
            
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(220, 10%, 55%)', fontSize: 11 }}
              tickFormatter={(value) => `${value}`}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            <Legend
              verticalAlign="top"
              height={36}
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: '11px' }}
              formatter={(value) => (
                <span style={{ color: 'hsl(40, 15%, 75%)' }}>{value}</span>
              )}
            />
            
            <Area
              type="monotone"
              dataKey="carbonReduction"
              name="Carbon Reduction"
              stroke="hsl(158, 45%, 45%)"
              strokeWidth={2}
              fill="url(#carbonGradient)"
              animationDuration={800}
              animationEasing="ease-out"
            />
            
            <Area
              type="monotone"
              dataKey="jobsCreated"
              name="Jobs (thousands)"
              stroke="hsl(220, 70%, 55%)"
              strokeWidth={2}
              fill="url(#jobsGradient)"
              animationDuration={800}
              animationEasing="ease-out"
            />
            
            <Area
              type="monotone"
              dataKey="gdpGrowth"
              name="GDP Growth"
              stroke="hsl(18, 45%, 52%)"
              strokeWidth={2}
              fill="url(#gdpGradient)"
              animationDuration={800}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      {/* Key insight */}
      <motion.div
        key={investmentLevel}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-4 pt-4 border-t border-border/40"
      >
        <p className="text-xs text-muted-foreground">
          {investmentLevel < 30 && "Low investment shows gradual gains. Significant acceleration requires higher commitment."}
          {investmentLevel >= 30 && investmentLevel < 60 && "Moderate trajectory with balanced trade-offs. Peak transition costs occur around year 3-4."}
          {investmentLevel >= 60 && "Aggressive curve shows strong long-term gains after initial transition period."}
        </p>
      </motion.div>
    </motion.div>
  );
}
