import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="max-w-md w-full bg-background rounded-lg shadow-lg p-6 border">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="rounded-full bg-destructive/10 p-3">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Something went wrong</h2>
            <p className="text-sm text-muted-foreground">{error.message}</p>
          </div>
          <Button
            variant="default"
            className="min-w-[200px]"
            onClick={resetErrorBoundary}
          >
            Try again
          </Button>
        </div>
      </div>
    </motion.div>
  );
}