import { useSimulationStore } from '@/store/simulationStore';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

export function ToastNotifications() {
  const { toasts, removeToast } = useSimulationStore();
  
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-[calc(100vw-2rem)] sm:max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="pointer-events-auto"
          >
            <div className={`
              flex items-center gap-3 p-4 rounded-lg shadow-lg border backdrop-blur-sm
              ${toast.type === 'success' ? 'bg-primary/10 border-primary/30 text-primary' : ''}
              ${toast.type === 'info' ? 'bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400' : ''}
              ${toast.type === 'warning' ? 'bg-accent/10 border-accent/30 text-accent' : ''}
            `}>
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 flex-shrink-0" />}
              {toast.type === 'info' && <Info className="w-5 h-5 flex-shrink-0" />}
              {toast.type === 'warning' && <AlertCircle className="w-5 h-5 flex-shrink-0" />}
              <p className="text-sm font-medium flex-1">{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
