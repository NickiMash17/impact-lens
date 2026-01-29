import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function Disclaimer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border/30 hover:border-border/50 transition-colors duration-300"
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      >
        <Info className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
      </motion.div>
      <div className="text-xs text-muted-foreground leading-relaxed space-y-2">
        <p>
          <strong className="text-foreground/80">This is a decision-support simulation, not a prediction or recommendation.</strong>{' '}
          Values are modeled approximations designed to help you explore trade-offs and understand systemic relationships.
        </p>
        <p>
          The goal is <strong className="text-foreground/80">insight</strong>, not certainty. Real-world outcomes depend on countless factors not captured here. 
          Use this tool to think, not to decide.
        </p>
      </div>
    </motion.div>
  );
}
