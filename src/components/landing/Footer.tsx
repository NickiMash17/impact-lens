import { Layers } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            <span className="font-serif text-lg">Impact Lens</span>
          </div>
          <p className="text-sm text-muted-foreground">
            A decision intelligence prototype. Data is simulated.
          </p>
        </div>
      </div>
    </footer>
  );
}
