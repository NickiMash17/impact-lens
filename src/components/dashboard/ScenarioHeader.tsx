import { motion } from 'framer-motion';
import { Layers, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ScenarioHeader() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.4, type: "spring" }}
            >
              <Layers className="w-5 h-5 text-primary" />
            </motion.div>
            <motion.span
              className="font-serif text-lg"
              whileHover={{ color: 'hsl(var(--primary))' }}
              transition={{ duration: 0.2 }}
            >
              Impact Lens
            </motion.span>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <motion.div
              whileHover={{ scale: 1.05, borderColor: 'hsl(var(--primary) / 0.4)' }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Leaf className="w-4 h-4 text-primary" />
              </motion.div>
              <span className="text-sm font-medium text-primary">Energy Transition</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
