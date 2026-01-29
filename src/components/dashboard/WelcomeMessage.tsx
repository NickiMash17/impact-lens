import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export function WelcomeMessage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has seen welcome message before
    const hasSeenWelcome = localStorage.getItem('impact-lens-welcome-seen');
    if (!hasSeenWelcome) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('impact-lens-welcome-seen', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-md w-full mx-4"
        >
          <div className="metric-card bg-primary/10 border-primary/30 shadow-xl">
            <div className="flex items-start gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                className="p-2 rounded-lg bg-primary/20 flex-shrink-0"
              >
                <Sparkles className="w-5 h-5 text-primary" />
              </motion.div>
              
              <div className="flex-1">
                <h3 className="font-serif text-lg text-foreground mb-2">
                  Welcome to Impact Lens
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  This is a decision trade-off simulator. Adjust the slider to see how one decision 
                  creates competing outcomes across multiple dimensions. Some metrics improve while others degrade—that's the reality of complex decisions.
                </p>
                <p className="text-xs text-muted-foreground/80 mb-3">
                  💡 Tip: Look for the help button (?) in the bottom right corner for a quick guide.
                </p>
                <Button
                  onClick={handleDismiss}
                  size="sm"
                  variant="outline"
                  className="w-full"
                >
                  Got it, let's explore
                </Button>
              </div>
              
              <Button
                onClick={handleDismiss}
                variant="ghost"
                size="sm"
                className="flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
