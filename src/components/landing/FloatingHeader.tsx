import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Layers, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export function FloatingHeader() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  
  const headerOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const headerY = useTransform(scrollY, [0, 100], [-20, 0]);

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsVisible(latest > 100);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
        >
          <motion.div 
            className="max-w-6xl mx-auto rounded-2xl border border-border/40 bg-background/70 backdrop-blur-xl shadow-2xl"
            style={{ opacity: headerOpacity, y: headerY }}
            whileHover={{ borderColor: 'hsl(var(--primary) / 0.3)' }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between px-6 py-3">
              {/* Logo */}
              <Link to="/">
                <motion.div 
                  className="flex items-center gap-2 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Layers className="w-5 h-5 text-primary" />
                  </motion.div>
                  <span className="font-serif text-lg text-foreground">Impact Lens</span>
                </motion.div>
              </Link>

              {/* Navigation Links */}
              <nav className="hidden sm:flex items-center gap-6">
                {['Features', 'Dashboard', 'About'].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link 
                      to={item === 'Dashboard' ? '/dashboard' : '#'}
                      className="relative text-sm text-muted-foreground hover:text-foreground transition-colors group"
                    >
                      {item}
                      <motion.span
                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary origin-left"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA Button */}
              <Link to="/dashboard">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    size="sm" 
                    className="group bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl relative overflow-hidden"
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative z-10 flex items-center text-xs">
                      Explore
                      <ArrowRight className="ml-1 w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
