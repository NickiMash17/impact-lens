import { Info } from 'lucide-react';

export function Disclaimer() {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border/30">
      <Info className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
      <p className="text-xs text-muted-foreground leading-relaxed">
        <strong className="text-foreground/80">This is a simulation, not a prediction.</strong>{' '}
        Values are modeled approximations designed to illustrate trade-offs and systemic relationships. 
        Real-world outcomes depend on countless factors not captured here.
      </p>
    </div>
  );
}
