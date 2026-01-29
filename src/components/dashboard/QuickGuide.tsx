import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function QuickGuide() {
  const [isOpen, setIsOpen] = useState(false);

  const steps = [
    {
      title: 'Adjust the slider',
      description: 'Move the renewable energy investment slider to see how your decision affects multiple dimensions.',
      icon: '🎚️',
    },
    {
      title: 'Watch metrics change',
      description: 'See how jobs, carbon reduction, costs, and other metrics respond in real time.',
      icon: '📊',
    },
    {
      title: 'Notice trade-offs',
      description: 'Some metrics improve while others may degrade—this is the reality of complex decisions.',
      icon: '⚖️',
    },
    {
      title: 'Read the insight',
      description: 'The AI explanation helps you understand what changed and why, highlighting the trade-offs.',
      icon: '💡',
    },
    {
      title: 'Compare scenarios',
      description: 'Use comparison mode to lock two different investment levels and see them side-by-side.',
      icon: '🔀',
    },
  ];

  return (
    <>
      {/* Help Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <HelpCircle className="w-6 h-6" />
        </Button>
      </motion.div>

      {/* Guide Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="metric-card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-2xl text-foreground">Quick Guide</h2>
                  <Button
                    onClick={() => setIsOpen(false)}
                    variant="ghost"
                    size="sm"
                    className="rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {steps.map((step, i) => (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4 p-4 rounded-lg bg-muted/30 border border-border/30 hover:border-border/50 transition-colors"
                    >
                      <div className="text-2xl flex-shrink-0">{step.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-serif text-lg text-foreground mb-1">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-border/40 space-y-3">
                  <div>
                    <p className="text-xs font-medium text-foreground mb-2">Keyboard Shortcuts:</p>
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <kbd className="px-2 py-1 bg-muted rounded text-xs">←</kbd>
                        <span>Decrease 5%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <kbd className="px-2 py-1 bg-muted rounded text-xs">→</kbd>
                        <span>Increase 5%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <kbd className="px-2 py-1 bg-muted rounded text-xs">1</kbd>
                        <span>15% preset</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <kbd className="px-2 py-1 bg-muted rounded text-xs">2</kbd>
                        <span>35% preset</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <kbd className="px-2 py-1 bg-muted rounded text-xs">3</kbd>
                        <span>55% preset</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <kbd className="px-2 py-1 bg-muted rounded text-xs">4</kbd>
                        <span>80% preset</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground text-center pt-2 border-t border-border/40">
                    💡 Tip: Hover over metrics and buttons for more information
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
