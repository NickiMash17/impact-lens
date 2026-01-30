import { motion, AnimatePresence } from 'framer-motion';
import { useSimulationStore } from '@/store/simulationStore';
import { Globe, Info, TrendingUp } from 'lucide-react';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Benchmark {
  country: string;
  investment: number;
  year: string;
  context: string;
  metrics: {
    jobs?: string;
    carbon?: string;
    cost?: string;
  };
}

const benchmarks: Benchmark[] = [
  {
    country: 'Germany',
    investment: 42,
    year: '2023',
    context: 'Leading European transition',
    metrics: {
      jobs: '~400K jobs',
      carbon: '46% reduction',
      cost: '$0.14/kWh',
    },
  },
  {
    country: 'Denmark',
    investment: 55,
    year: '2023',
    context: 'Wind energy pioneer',
    metrics: {
      jobs: '~85K jobs',
      carbon: '52% reduction',
      cost: '$0.13/kWh',
    },
  },
  {
    country: 'United States',
    investment: 22,
    year: '2023',
    context: 'Gradual transition',
    metrics: {
      jobs: '~500K jobs',
      carbon: '28% reduction',
      cost: '$0.12/kWh',
    },
  },
  {
    country: 'Costa Rica',
    investment: 98,
    year: '2023',
    context: 'Near 100% renewable',
    metrics: {
      jobs: '~25K jobs',
      carbon: '95% reduction',
      cost: '$0.11/kWh',
    },
  },
];

export function RealWorldContext() {
  const { investmentLevel, showRealWorldContext, setShowRealWorldContext } = useSimulationStore();
  
  const closestBenchmark = useMemo(() => {
    return benchmarks.reduce((closest, benchmark) => {
      const currentDiff = Math.abs(investmentLevel - closest.investment);
      const benchmarkDiff = Math.abs(investmentLevel - benchmark.investment);
      return benchmarkDiff < currentDiff ? benchmark : closest;
    }, benchmarks[0]);
  }, [investmentLevel]);

  const similarity = useMemo(() => {
    const diff = Math.abs(investmentLevel - closestBenchmark.investment);
    if (diff < 5) return 'Very similar';
    if (diff < 10) return 'Similar';
    if (diff < 20) return 'Somewhat similar';
    return 'Different';
  }, [investmentLevel, closestBenchmark]);

  if (!showRealWorldContext) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6"
      >
        <Button
          onClick={() => setShowRealWorldContext(true)}
          variant="outline"
          size="sm"
          className="group hover:border-primary/40 hover:bg-primary/5"
        >
          <Globe className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
          Show Real-World Context
        </Button>
      </motion.div>
    );
  }

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
              <Globe className="w-5 h-5 text-primary" />
              <h3 className="font-serif text-lg text-foreground">
                Real-World Context
              </h3>
            </div>
            <Button
              onClick={() => setShowRealWorldContext(false)}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
            >
              ×
            </Button>
          </div>

          <div className="space-y-4">
            {/* Closest benchmark */}
            <div className="p-4 rounded-lg bg-background/50 border border-border/40">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Your scenario ({investmentLevel}%) is {similarity.toLowerCase()} to:
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-xl text-foreground">
                    {closestBenchmark.country}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ({closestBenchmark.investment}% in {closestBenchmark.year})
                  </span>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  {closestBenchmark.context}
                </p>
                <div className="flex flex-wrap gap-4 mt-3 pt-3 border-t border-border/40">
                  {closestBenchmark.metrics.jobs && (
                    <div className="text-xs">
                      <span className="text-muted-foreground">Jobs: </span>
                      <span className="text-foreground font-medium">
                        {closestBenchmark.metrics.jobs}
                      </span>
                    </div>
                  )}
                  {closestBenchmark.metrics.carbon && (
                    <div className="text-xs">
                      <span className="text-muted-foreground">Carbon: </span>
                      <span className="text-foreground font-medium">
                        {closestBenchmark.metrics.carbon}
                      </span>
                    </div>
                  )}
                  {closestBenchmark.metrics.cost && (
                    <div className="text-xs">
                      <span className="text-muted-foreground">Cost: </span>
                      <span className="text-foreground font-medium">
                        {closestBenchmark.metrics.cost}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* All benchmarks */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">
                  Global Benchmarks
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {benchmarks.map((benchmark) => {
                  const isClosest = benchmark.country === closestBenchmark.country;
                  return (
                    <motion.div
                      key={benchmark.country}
                      whileHover={{ scale: 1.02 }}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        isClosest
                          ? 'bg-primary/10 border-primary/40'
                          : 'bg-background/30 border-border/40'
                      }`}
                    >
                      <div className="font-medium text-sm text-foreground mb-1">
                        {benchmark.country}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {benchmark.investment}%
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <p className="text-xs text-muted-foreground/70 italic pt-2 border-t border-border/40">
              Note: These are approximate real-world benchmarks for context. Actual outcomes depend on many factors including geography, existing infrastructure, and policy implementation.
            </p>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
