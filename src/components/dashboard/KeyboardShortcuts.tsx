import { useEffect } from 'react';
import { useSimulationStore } from '@/store/simulationStore';

/**
 * Keyboard shortcuts for better accessibility and power users
 */
export function KeyboardShortcuts() {
  const { investmentLevel, setInvestmentLevel } = useSimulationStore();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only activate if not typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      // Arrow keys to adjust slider
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        const newValue = Math.max(0, investmentLevel - 5);
        setInvestmentLevel(newValue);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        const newValue = Math.min(100, investmentLevel + 5);
        setInvestmentLevel(newValue);
      }

      // Number keys for quick presets
      if (e.key === '1') {
        e.preventDefault();
        setInvestmentLevel(15);
      } else if (e.key === '2') {
        e.preventDefault();
        setInvestmentLevel(35);
      } else if (e.key === '3') {
        e.preventDefault();
        setInvestmentLevel(55);
      } else if (e.key === '4') {
        e.preventDefault();
        setInvestmentLevel(80);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [investmentLevel, setInvestmentLevel]);

  return null;
}
