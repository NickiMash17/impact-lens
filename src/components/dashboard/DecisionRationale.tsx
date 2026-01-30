import { motion, AnimatePresence } from 'framer-motion';
import { useSimulationStore } from '@/store/simulationStore';
import { FileText, Save, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export function DecisionRationale() {
  const { 
    investmentLevel, 
    metrics, 
    decisionRationale, 
    setDecisionRationale,
    showDecisionRationale,
    setShowDecisionRationale,
    addToast
  } = useSimulationStore();
  
  const handleExport = () => {
    const report = {
      scenario: `Renewable Energy Investment: ${investmentLevel}%`,
      date: new Date().toLocaleDateString(),
      metrics: {
        jobsCreated: metrics.jobsCreated,
        carbonReduction: `${metrics.carbonReduction}%`,
        energyCost: `$${metrics.energyCost.toFixed(2)}/kWh`,
        gdpImpact: `${metrics.gdpImpact > 0 ? '+' : ''}${metrics.gdpImpact}%`,
        gridStability: `${metrics.gridStability}%`,
        publicApproval: `${metrics.publicApproval}%`,
      },
      rationale: decisionRationale || 'No rationale provided.',
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `impact-lens-decision-${investmentLevel}percent-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Show success toast
    addToast('Decision report exported successfully!', 'success');
  };
  
  if (!showDecisionRationale) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6"
      >
        <Button
          onClick={() => setShowDecisionRationale(true)}
          variant="outline"
          size="sm"
          className="group hover:border-primary/40 hover:bg-primary/5"
        >
          <FileText className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
          Document Decision Rationale
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
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="font-serif text-lg text-foreground">
                Decision Rationale
              </h3>
            </div>
            <Button
              onClick={() => setShowDecisionRationale(false)}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
            >
              ×
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="rationale" className="text-sm font-medium text-foreground mb-2 block">
                Why did you choose {investmentLevel}% renewable investment?
              </Label>
              <p className="text-xs text-muted-foreground mb-3">
                Document your reasoning, trade-offs considered, and key factors that influenced this decision. This helps communicate your thinking to stakeholders.
              </p>
              <Textarea
                id="rationale"
                value={decisionRationale}
                onChange={(e) => setDecisionRationale(e.target.value)}
                placeholder="Example: I chose 45% because it balances job creation with manageable transition costs. The carbon reduction is significant, and while energy costs increase slightly, the long-term GDP benefits justify the short-term expense. Grid stability concerns are acceptable given the 10-year projection shows improvement..."
                className="min-h-[120px] resize-y"
              />
              <p className="text-xs text-muted-foreground mt-2">
                {decisionRationale.length} characters
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-border/40">
              <Button
                onClick={handleExport}
                variant="outline"
                size="sm"
                disabled={!decisionRationale.trim()}
                className="group"
              >
                <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Export Decision Report
              </Button>
              {decisionRationale && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 text-xs text-muted-foreground"
                >
                  <Save className="w-3 h-3 text-primary" />
                  <span>Saved automatically</span>
                </motion.div>
              )}
            </div>

            {decisionRationale && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-3 rounded-lg bg-primary/5 border border-primary/20"
              >
                <p className="text-xs font-medium text-foreground mb-1">Preview:</p>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {decisionRationale}
                </p>
              </motion.div>
            )}
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
