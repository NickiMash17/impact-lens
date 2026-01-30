import { motion } from 'framer-motion';
import { useThemeStore } from '@/store/themeStore';

export function PatternBackground() {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 opacity-60 dark:opacity-50">
      {/* Decision tree pattern */}
      <div 
        className="absolute top-20 left-10 w-64 h-64"
        style={{
          backgroundImage: `url('/patterns/decision-tree.svg')`,
          backgroundRepeat: 'repeat',
          backgroundSize: '100px 100px',
        }}
      />
      
      {/* Ripple effect pattern */}
      <div 
        className="absolute top-1/2 right-20 w-96 h-96"
        style={{
          backgroundImage: `url('/patterns/ripple-effect.svg')`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />
      
      {/* Trade-off balance pattern */}
      <div 
        className="absolute bottom-32 left-1/4 w-48 h-48"
        style={{
          backgroundImage: `url('/patterns/trade-off-balance.svg')`,
          backgroundRepeat: 'repeat',
          backgroundSize: '120px 120px',
        }}
      />
      
      {/* Network connections pattern */}
      <div 
        className="absolute top-1/3 left-1/2 w-72 h-72"
        style={{
          backgroundImage: `url('/patterns/network-connections.svg')`,
          backgroundRepeat: 'repeat',
          backgroundSize: '150px 150px',
        }}
      />
      
      {/* Animated overlay for depth */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at 30% 20%, transparent 0%, transparent 60%, hsl(var(--primary) / 0.08) 100%)'
            : 'radial-gradient(ellipse at 30% 20%, transparent 0%, transparent 60%, hsl(var(--primary) / 0.12) 100%)',
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
