import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AudioSpectrumProps {
  className?: string;
}

export function AudioSpectrum({ className }: AudioSpectrumProps) {
  const bars = 12;
  const [heights, setHeights] = useState<number[]>(Array(bars).fill(50));
  const intervalRef = useRef<number>();

  useEffect(() => {
    const updateBars = () => {
      setHeights(prevHeights =>
        prevHeights.map(() => {
          const baseHeight = 30;
          const randomVariation = Math.random() * 70;
          return baseHeight + randomVariation;
        })
      );
    };

    intervalRef.current = window.setInterval(updateBars, 100);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className={cn("h-20 flex items-end justify-center gap-1", className)}>
      <AnimatePresence>
        {heights.map((height, i) => (
          <motion.div
            key={i}
            initial={{ height: '50%' }}
            animate={{ height: `${height}%` }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="w-2 bg-gradient-to-t from-primary/40 to-primary/80 rounded-t-sm"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}