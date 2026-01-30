import { motion } from 'framer-motion';
import { TrendingUp, Shield, Zap, Target, Clock, BarChart3, Lightbulb, Eye, Users } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'Single-Decision Focus',
    description: 'Explore one decision variable at a time. Eliminates noise and forces clarity—encourages deliberate thinking.',
  },
  {
    icon: TrendingUp,
    title: 'Trade-Off-Aware Modeling',
    description: 'See competing outcomes across environmental, economic, social, and infrastructure dimensions. Some metrics improve while others degrade—real-world complexity.',
  },
  {
    icon: Zap,
    title: 'Real-Time Recalculation',
    description: 'All impacts update instantly as you adjust the decision. See cause-and-effect relationships in motion.',
  },
  {
    icon: BarChart3,
    title: 'Multi-Dimensional Dashboard',
    description: 'Visualize outcomes simultaneously with key metrics, comparative indicators, and minimal charts. Highlights interdependencies.',
  },
  {
    icon: Clock,
    title: 'Time-Horizon Projection',
    description: '10-year trajectory shows short-term costs, medium-term instability, and long-term gains. Weigh immediate pain against long-term benefit.',
  },
  {
    icon: Lightbulb,
    title: 'AI-Generated Insight',
    description: 'Contextual explanations translate numeric changes into plain language. Highlights what changed, why, and where trade-offs exist—without automating decisions.',
  },
  {
    icon: Shield,
    title: 'Transparent Boundaries',
    description: 'Clear messaging: this is a simulation, not a prediction. Values are modeled approximations. Results illustrate relationships, not certainty.',
  },
  {
    icon: Eye,
    title: 'Interpretability-First',
    description: 'Every visual element answers: "What changed because of my decision?" Not: "How much data can we show?" Ensures clarity over complexity.',
  },
  {
    icon: Users,
    title: 'Stakeholder-Ready',
    description: 'Supports policy discussion, executive briefings, and educational use. Makes trade-offs visible and explainable to teams and organizations.',
  },
];

export function Features() {
  return (
    <section className="py-16 sm:py-24 md:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-3 sm:mb-4">
            Explore consequences, not answers
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto px-2">
            One decision lever. Multiple dimensions. Clear trade-offs. No overconfidence.
          </p>
        </motion.div>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="glass-card p-6 sm:p-8 text-center group hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/10 cursor-pointer"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-6 group-hover:bg-primary/20 transition-colors duration-300"
              >
                <feature.icon className="w-6 h-6" />
              </motion.div>
              <h3 className="font-serif text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
