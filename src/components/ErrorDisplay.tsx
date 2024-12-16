import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { motion, AnimatePresence } from 'framer-motion';

interface ErrorDisplayProps {
  message: string | null;
}

export function ErrorDisplay({ message }: ErrorDisplayProps) {
  if (!message) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4"
      >
        <Alert variant="destructive" className="border-destructive/50 shadow-lg">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="ml-2">{message}</AlertDescription>
        </Alert>
      </motion.div>
    </AnimatePresence>
  );
}