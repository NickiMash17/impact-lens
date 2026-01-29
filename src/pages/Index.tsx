import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { Footer } from '@/components/landing/Footer';
import { FloatingHeader } from '@/components/landing/FloatingHeader';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { EnhancedBackground } from '@/components/dashboard/EnhancedBackground';

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <EnhancedBackground />
      <div className="fixed top-6 right-6 z-30">
        <ThemeToggle />
      </div>
      <FloatingHeader />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

export default Index;
