import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface AnimatedMetricProps {
  label: string;
  value: string;
  change: string;
  index: number;
}

function parseValue(value: string): { prefix: string; number: number; suffix: string } {
  const match = value.match(/^([+-]?)(\d+\.?\d*)(.*)$/);
  if (match) {
    return {
      prefix: match[1],
      number: parseFloat(match[2]),
      suffix: match[3],
    };
  }
  return { prefix: '', number: 0, suffix: value };
}

export function AnimatedMetric({ label, value, change, index }: AnimatedMetricProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const { prefix, number, suffix } = parseValue(value);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          const duration = 2000;
          const startTime = performance.now();
          
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing: easeOutQuart
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(eased * number);
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [number, hasAnimated]);

  const displayValue = suffix.includes('K') 
    ? `${prefix}${Math.round(count)}${suffix}`
    : `${prefix}${count.toFixed(1)}${suffix}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 + index * 0.15, duration: 0.5 }}
      whileHover={{ 
        scale: 1.05,
        y: -8,
      }}
      className="text-center cursor-default group relative"
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 bg-primary/10 rounded-xl blur-xl opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="relative z-10">
        <motion.p 
          className="text-xs sm:text-sm text-muted-foreground mb-2 group-hover:text-foreground/70 transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 + index * 0.15 }}
        >
          {label}
        </motion.p>
        
        <motion.div
          className="font-serif text-2xl sm:text-4xl text-foreground relative overflow-hidden"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Number with tick animation */}
          <motion.span
            key={Math.round(count)}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.1 }}
          >
            {displayValue}
          </motion.span>
        </motion.div>
        
        <motion.p 
          className="text-xs text-primary mt-1 group-hover:text-primary/80 transition-colors"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 + index * 0.15 }}
        >
          {change}
        </motion.p>
        
        {/* Subtle pulse indicator */}
        <motion.div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          animate={{ 
            opacity: [0.3, 0.7, 0.3],
            scaleX: [0.8, 1, 0.8],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
