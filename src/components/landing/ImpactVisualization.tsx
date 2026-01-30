import { motion } from 'framer-motion';
import { useThemeStore } from '@/store/themeStore';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function ImpactVisualization() {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-70 dark:opacity-60">
      {/* Central decision point */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.7, 0.9, 0.7],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="w-32 h-32 rounded-full border-2 border-primary/50 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-primary/30" />
          </div>
        </div>
      </motion.div>

      {/* Impact rays radiating outward */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const length = 200;
        const x = Math.cos(rad) * length;
        const y = Math.sin(rad) * length;

        return (
          <motion.div
            key={angle}
            className="absolute top-1/2 left-1/2"
            style={{
              transformOrigin: '0 0',
              transform: `rotate(${angle}deg)`,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          >
            <div
              className="h-0.5 bg-gradient-to-r from-primary/60 via-primary/40 to-transparent"
              style={{ width: `${length}px` }}
            />
            {/* Impact indicators */}
            <motion.div
              className="absolute top-0"
              style={{ left: `${length * 0.7}px` }}
              animate={{
                y: [-5, 5, -5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeInOut',
              }}
            >
              {i % 3 === 0 ? (
                <TrendingUp className="w-4 h-4 text-primary/60" />
              ) : i % 3 === 1 ? (
                <TrendingDown className="w-4 h-4 text-primary/60" />
              ) : (
                <Minus className="w-4 h-4 text-primary/60" />
              )}
            </motion.div>
          </motion.div>
        );
      })}

      {/* Floating impact nodes */}
      {[
        { x: '20%', y: '20%', label: 'Economic' },
        { x: '80%', y: '20%', label: 'Social' },
        { x: '20%', y: '80%', label: 'Environmental' },
        { x: '80%', y: '80%', label: 'Infrastructure' },
      ].map((node, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: node.x, top: node.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeInOut',
          }}
        >
          <div className="w-16 h-16 rounded-full border border-primary/40 bg-primary/15 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-primary/25" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
