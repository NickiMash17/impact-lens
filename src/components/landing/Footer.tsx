import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="border-t border-border/40 py-12 relative overflow-hidden"
    >
      {/* Subtle background effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-50" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Layers className="w-5 h-5 text-primary" />
            </motion.div>
            <span className="font-serif text-lg">Impact Lens</span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-sm text-muted-foreground"
          >
            A decision intelligence prototype. Data is simulated.
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
