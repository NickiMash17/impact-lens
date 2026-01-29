import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { Footer } from '@/components/landing/Footer';
import { FloatingHeader } from '@/components/landing/FloatingHeader';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <FloatingHeader />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

export default Index;
