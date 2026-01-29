import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

interface HelpTextProps {
  text: string;
  className?: string;
}

export function HelpText({ text, className = '' }: HelpTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex items-start gap-2 text-xs text-muted-foreground ${className}`}
    >
      <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
      <span>{text}</span>
    </motion.div>
  );
}
