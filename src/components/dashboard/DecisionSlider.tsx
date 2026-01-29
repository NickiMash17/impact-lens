import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { useSimulationStore } from '@/store/simulationStore';
import { Sun, Factory, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export function DecisionSlider() {
  const { investmentLevel, setInvestmentLevel } = useSimulationStore();
  
  const handleValueChange = async (value: number) => {
    await setInvestmentLevel(value);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="metric-card"
    >
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="font-serif text-xl text-foreground">
            Your Decision Lever
          </h2>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <Info className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs">
              <p className="text-xs">
                This slider controls one decision variable: renewable energy investment percentage. 
                Adjust it to see how this single change affects multiple dimensions simultaneously.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
        <p className="text-sm text-muted-foreground mb-2">
          Adjust the percentage of national energy budget allocated to renewable infrastructure. 
          Experiment safely—see what you gain and what you sacrifice.
        </p>
        <p className="text-xs text-muted-foreground/70">
          💡 Tip: Use arrow keys or number keys (1-4) for quick adjustments
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
            onValueChange={([value]) => handleValueChange(value)}
            min={0}
            max={100}
            step={1}
            className="cursor-pointer"
            aria-label="Renewable energy investment percentage"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={investmentLevel}
          />
          
          {/* Value indicator */}
          <motion.div 
            className="absolute -bottom-1 text-center"
            style={{ left: `${investmentLevel}%`, transform: 'translateX(-50%)' }}
            key={investmentLevel}
            initial={{ scale: 1.2, y: -5 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            whileHover={{ scale: 1.1 }}
          >
            <div className="inline-flex items-baseline gap-1 bg-card border border-border rounded-lg px-3 py-1.5 shadow-lg hover:shadow-xl hover:border-primary/40 transition-all duration-300">
              <span className="font-serif text-2xl text-foreground">{investmentLevel}</span>
              <span className="text-sm text-muted-foreground">%</span>
            </div>
          </motion.div>
        </div>
        
        {/* Quick presets */}
        <div className="pt-4">
          <p className="text-xs text-muted-foreground mb-2">Quick presets:</p>
          <div className="flex gap-2">
            {[15, 35, 55, 80].map((preset) => (
              <Tooltip key={preset}>
                <TooltipTrigger asChild>
                  <motion.button
                    onClick={() => handleValueChange(preset)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm border transition-all duration-300 ${
                      investmentLevel === preset
                        ? 'bg-primary/20 border-primary/40 text-foreground shadow-md'
                        : 'border-border/40 text-muted-foreground hover:border-border hover:text-foreground hover:bg-card/50 hover:shadow-sm'
                    }`}
                  >
                    {preset}%
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">
                    {preset === 15 && 'Conservative approach'}
                    {preset === 35 && 'Moderate transition'}
                    {preset === 55 && 'Accelerated shift'}
                    {preset === 80 && 'Aggressive transformation'}
                  </p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
