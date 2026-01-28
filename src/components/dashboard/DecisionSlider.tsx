import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { useSimulationStore } from '@/store/simulationStore';
import { Sun, Factory } from 'lucide-react';

export function DecisionSlider() {
  const { investmentLevel, setInvestmentLevel } = useSimulationStore();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="metric-card"
    >
      <div className="mb-6">
        <h2 className="font-serif text-xl text-foreground mb-2">
          Renewable Energy Investment
        </h2>
        <p className="text-sm text-muted-foreground">
          Adjust the percentage of national energy budget allocated to renewable infrastructure
        </p>
      </div>
      
      <div className="space-y-6">
        {/* Slider track with labels */}
        <div className="relative pt-2 pb-8">
          <div className="flex justify-between text-xs text-muted-foreground mb-4">
            <div className="flex items-center gap-1.5">
              <Factory className="w-4 h-4" />
              <span>Fossil-heavy</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-primary" />
              <span>Renewables-first</span>
            </div>
          </div>
          
          <Slider
            value={[investmentLevel]}
            onValueChange={([value]) => setInvestmentLevel(value)}
            min={0}
            max={100}
            step={1}
            className="cursor-pointer"
          />
          
          {/* Value indicator */}
          <motion.div 
            className="absolute -bottom-1 text-center"
            style={{ left: `${investmentLevel}%`, transform: 'translateX(-50%)' }}
            key={investmentLevel}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.15 }}
          >
            <div className="inline-flex items-baseline gap-1 bg-card border border-border rounded-lg px-3 py-1.5">
              <span className="font-serif text-2xl text-foreground">{investmentLevel}</span>
              <span className="text-sm text-muted-foreground">%</span>
            </div>
          </motion.div>
        </div>
        
        {/* Quick presets */}
        <div className="flex gap-2 pt-4">
          {[15, 35, 55, 80].map((preset) => (
            <button
              key={preset}
              onClick={() => setInvestmentLevel(preset)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm border transition-all ${
                investmentLevel === preset
                  ? 'bg-primary/20 border-primary/40 text-foreground'
                  : 'border-border/40 text-muted-foreground hover:border-border hover:text-foreground'
              }`}
            >
              {preset}%
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
