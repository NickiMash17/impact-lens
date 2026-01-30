import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useThemeStore } from '@/store/themeStore';

interface GridLine {
  id: number;
  x: number;
  y: number;
  opacity: number;
}

export function EnhancedBackground() {
  const { theme } = useThemeStore();
  const [gridLines, setGridLines] = useState<GridLine[]>([]);

  useEffect(() => {
    // Generate subtle grid pattern
    const lines: GridLine[] = [];
    for (let i = 0; i < 20; i++) {
      lines.push({
        id: i,
        x: (i * 5) % 100,
        y: Math.floor(i / 4) * 25,
        opacity: 0.02 + Math.random() * 0.03,
      });
    }
    setGridLines(lines);
  }, []);

  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-35"
        style={{
          background: isDark
            ? 'radial-gradient(circle, hsl(158 35% 42% / 0.3) 0%, transparent 70%)'
            : 'radial-gradient(circle, hsl(158 40% 35% / 0.4) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-30"
        style={{
          background: isDark
            ? 'radial-gradient(circle, hsl(18 45% 52% / 0.3) 0%, transparent 70%)'
            : 'radial-gradient(circle, hsl(18 50% 45% / 0.3) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
        style={{
          background: isDark
            ? 'radial-gradient(circle, hsl(220 25% 15% / 0.5) 0%, transparent 70%)'
            : 'radial-gradient(circle, hsl(40 20% 95% / 0.5) 0%, transparent 70%)',
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Subtle grid pattern */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: isDark ? 0.08 : 0.12 }}>
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
            style={{
              stroke: isDark ? 'hsl(220 15% 20%)' : 'hsl(220 15% 80%)',
              strokeWidth: 0.5,
            }}
          >
            <path d="M 40 0 L 0 0 0 40" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Animated mesh gradient overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at top left, hsl(158 35% 42% / 0.12) 0%, transparent 50%), radial-gradient(ellipse at bottom right, hsl(18 45% 52% / 0.10) 0%, transparent 50%)'
            : 'radial-gradient(ellipse at top left, hsl(158 40% 35% / 0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom right, hsl(18 50% 45% / 0.12) 0%, transparent 50%)',
        }}
        animate={{
          opacity: [0.6, 0.9, 0.6],
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
