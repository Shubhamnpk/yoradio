import { motion } from 'framer-motion';
import type { RadioStation } from '@/types/radio';
import { formatFrequency } from '@/lib/utils';

interface StationInfoProps {
  station: RadioStation;
  isPlaying: boolean;
}

export function StationInfo({ station, isPlaying }: StationInfoProps) {
  return (
    <div className="text-center mb-6 relative">
      <motion.h2
        key={station.name}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-mono text-2xl mb-2 truncate bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80"
      >
        {station.name}
      </motion.h2>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-center gap-2 mb-2"
      >
        <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500' : 'bg-primary/50'}`} />
        <p className="font-mono text-lg text-primary/80">
          {station.frequency ? formatFrequency(station.frequency) : 'Online'}
        </p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-sm font-mono text-primary/70"
      >
        {station.address}
      </motion.p>
    </div>
  );
}