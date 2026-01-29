import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AnimatedMetric } from './AnimatedMetric';
import { useRef } from 'react';

const metrics = [
  { label: 'Economic Impact', value: '+2.4%', change: 'GDP growth' },
  { label: 'Carbon Reduction', value: '-47%', change: 'emissions' },
  { label: 'Jobs Created', value: '85K', change: 'new positions' },
];

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const previewY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle gradient background with parallax */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/30"
        style={{ y: backgroundY }}
      />
      
      {/* Subtle grid pattern with parallax */}
      <motion.div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          y: gridY,
        }}
      />
      
      {/* Accent glow with parallax */}
      <motion.div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full"
        style={{ y: glowY }}
      />
      
      <motion.div 
        className="relative z-10 container mx-auto px-6 py-20"
        style={{ y: contentY, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge with hover micro-interaction */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 0 30px hsl(var(--primary) / 0.2)',
              borderColor: 'hsl(var(--primary) / 0.5)'
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/60 bg-card/50 backdrop-blur-sm mb-8 cursor-default transition-colors"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Layers className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="text-sm text-muted-foreground">Decision Intelligence Platform</span>
          </motion.div>
          
          {/* Main headline with staggered letter animation */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.1] tracking-tight mb-6">
            <motion.span 
              className="text-gradient inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              See the ripple effects
            </motion.span>
            <br />
            <motion.span 
              className="text-foreground/90 inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              before you decide
            </motion.span>
          </h1>
          
          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-xl sm:text-2xl text-muted-foreground font-light max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Simulate one decision. Watch the consequences unfold across 
            economic, social, and environmental dimensions—in real time.
          </motion.p>
          
          {/* CTA with enhanced hover */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/dashboard">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="lg" 
                  className="group text-base px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl glow-accent relative overflow-hidden"
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10 flex items-center">
                    Explore the Dashboard
                    <motion.span
                      className="ml-2"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.span>
                  </span>
                </Button>
              </motion.div>
            </Link>
            <motion.p 
              className="text-sm text-muted-foreground"
              whileHover={{ color: 'hsl(var(--foreground))' }}
              transition={{ duration: 0.2 }}
            >
              No signup required
            </motion.p>
          </motion.div>
        </motion.div>
        
        {/* Visual preview hint with parallax */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          style={{ y: previewY }}
          className="mt-20 max-w-5xl mx-auto"
        >
          <motion.div 
            className="relative rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm p-1 shadow-2xl"
            whileHover={{ 
              borderColor: 'hsl(var(--primary) / 0.3)',
              boxShadow: '0 25px 50px -12px hsl(var(--primary) / 0.15)'
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="rounded-xl bg-gradient-to-b from-card to-background p-8 sm:p-12">
              <div className="grid grid-cols-3 gap-6 sm:gap-8">
                {metrics.map((metric, i) => (
                  <AnimatedMetric
                    key={metric.label}
                    label={metric.label}
                    value={metric.value}
                    change={metric.change}
                    index={i}
                  />
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Reflection effect */}
          <div className="h-32 bg-gradient-to-b from-card/20 to-transparent rounded-b-2xl -mt-1 blur-sm" />
        </motion.div>
      </motion.div>
    </section>
  );
}
