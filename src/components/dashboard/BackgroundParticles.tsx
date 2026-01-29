import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useThemeStore } from '@/store/themeStore';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
}

export function BackgroundParticles() {
  const { theme } = useThemeStore();
  const [particles, setParticles] = useState<Particle[]>([]);
  const isDark = theme === 'dark';

  useEffect(() => {
    // Generate subtle background particles
    const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 20 + 15,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    // Regenerate particles when theme changes
    const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 20 + 15,
    }));
    setParticles(newParticles);
  }, [theme]);

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${isDark ? 'opacity-[0.03]' : 'opacity-[0.08]'}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: isDark ? [0.3, 0.6, 0.3] : [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}
