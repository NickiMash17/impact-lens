import { motion } from 'framer-motion';
import { Layers, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ScenarioHeader() {
  return (
    <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Layers className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
            <span className="font-serif text-lg">Impact Lens</span>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
              <Leaf className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Energy Transition</span>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
