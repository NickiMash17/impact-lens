import { motion } from 'framer-motion';
import { TrendingUp, Shield, Zap } from 'lucide-react';

const features = [
  {
    icon: TrendingUp,
    title: 'Visible Trade-offs',
    description: 'Every decision has consequences. See what improves and what degrades, side by side—no hidden costs.',
  },
  {
    icon: Zap,
    title: 'Safe Experimentation',
    description: 'Adjust a single lever and watch impacts unfold in real time. Explore scenarios without risk.',
  },
  {
    icon: Shield,
    title: 'Transparent Insight',
    description: 'Understand the why behind every outcome. The goal is insight, not certainty—helping you think, not telling you what to do.',
  },
];

export function Features() {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-4">
            Explore consequences, not answers
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            One decision lever. Multiple dimensions. Clear trade-offs. No overconfidence.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="glass-card p-8 text-center group hover:border-primary/30 transition-colors"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
