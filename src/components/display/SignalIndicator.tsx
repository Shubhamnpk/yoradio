import { motion } from 'framer-motion';

interface SignalIndicatorProps {
  strength: number;
  isPlaying: boolean;
}

export function SignalIndicator({ strength, isPlaying }: SignalIndicatorProps) {
  const bars = 4;
  const activeBarCount = Math.floor(strength * bars);

  return (
    <div className="flex items-end gap-0.5 h-5">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ height: '20%' }}
          animate={{
            height: i < activeBarCount ? '100%' : '20%',
            opacity: isPlaying ? 1 : 0.5,
          }}
          transition={{
            duration: 0.3,
            delay: i * 0.1,
          }}
          className={`w-1 bg-primary rounded-sm`}
          style={{
            height: `${((i + 1) / bars) * 100}%`,
          }}
        />
      ))}
    </div>
  );
}