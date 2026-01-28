import { Info } from 'lucide-react';

export function Disclaimer() {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border/30">
      <Info className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
      <div className="text-xs text-muted-foreground leading-relaxed space-y-2">
        <p>
          <strong className="text-foreground/80">This is a decision-support simulation, not a prediction or recommendation.</strong>{' '}
          Values are modeled approximations designed to help you explore trade-offs and understand systemic relationships.
        </p>
        <p>
          The goal is <strong className="text-foreground/80">insight</strong>, not certainty. Real-world outcomes depend on countless factors not captured here. 
          Use this tool to think, not to decide.
        </p>
      </div>
    </div>
  );
}
