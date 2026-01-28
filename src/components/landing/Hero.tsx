import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle gradient background - parallax */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/30" 
      />
      
      {/* Subtle grid pattern - parallax */}
      <motion.div 
        style={{ 
          y: y2,
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
        className="absolute inset-0 opacity-[0.03]"
      />
      
      {/* Accent glow - parallax */}
      <motion.div 
        style={{ y: y3 }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full" 
      />
      
      <motion.div 
        style={{ opacity }}
        className="relative z-10 container mx-auto px-6 py-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/60 bg-card/50 backdrop-blur-sm mb-8"
          >
            <Layers className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Decision Intelligence Platform</span>
          </motion.div>
          
          {/* Main headline */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.1] tracking-tight mb-6">
            <span className="text-gradient">See the ripple effects</span>
            <br />
            <span className="text-foreground/90">before you decide</span>
          </h1>
          
          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl sm:text-2xl text-muted-foreground font-light max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Simulate one decision. Watch the consequences unfold across 
            economic, social, and environmental dimensions—in real time.
          </motion.p>
          
          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/dashboard">
              <Button 
                size="lg" 
                className="group text-base px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl glow-accent hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              >
                Explore the Dashboard
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground">
              No signup required
            </p>
          </motion.div>
        </motion.div>
        
        {/* Visual preview hint */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-20 max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm p-1 shadow-2xl">
            <div className="rounded-xl bg-gradient-to-b from-card to-background p-8 sm:p-12">
              <div className="grid grid-cols-3 gap-6 sm:gap-8">
                {[
                  { label: 'Economic Impact', value: '+2.4%', change: 'GDP growth' },
                  { label: 'Carbon Reduction', value: '-47%', change: 'emissions' },
                  { label: 'Jobs Created', value: '85K', change: 'new positions' },
                ].map((metric, i) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
                    className="text-center"
                  >
                    <p className="text-xs sm:text-sm text-muted-foreground mb-2">{metric.label}</p>
                    <p className="font-serif text-2xl sm:text-4xl text-foreground">{metric.value}</p>
                    <p className="text-xs text-primary mt-1">{metric.change}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Reflection effect */}
          <div className="h-32 bg-gradient-to-b from-card/20 to-transparent rounded-b-2xl -mt-1 blur-sm" />
        </motion.div>
      </motion.div>
    </section>
  );
}
