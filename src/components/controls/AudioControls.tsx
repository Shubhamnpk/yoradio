import { VolumeSlider } from './VolumeSlider';
import { PlaybackControls } from './PlaybackControls';
import type { RadioStation } from '@/types/radio';
import { motion } from 'framer-motion';

interface AudioControlsProps {
  currentStation: RadioStation | null;
  isPlaying: boolean;
  volume: number;
  onVolumeChange: (value: number) => void;
  onTogglePlay: () => void;
  onPreviousStation?: () => void;
  onNextStation?: () => void;
}

export function AudioControls({
  currentStation,
  isPlaying,
  volume,
  onVolumeChange,
  onTogglePlay,
  onPreviousStation,
  onNextStation,
}: AudioControlsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-4 p-4 bg-background/95 rounded-lg shadow-lg backdrop-blur-sm border border-primary/10"
    >
      <PlaybackControls
        isPlaying={isPlaying}
        onTogglePlay={onTogglePlay}
        onPrevious={onPreviousStation}
        onNext={onNextStation}
        disabled={!currentStation}
      />

      <VolumeSlider
        volume={volume}
        onVolumeChange={onVolumeChange}
        disabled={!currentStation}
      />
    </motion.div>
  );
}