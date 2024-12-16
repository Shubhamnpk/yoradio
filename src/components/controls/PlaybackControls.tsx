import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface PlaybackControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  disabled: boolean;
}

export function PlaybackControls({
  isPlaying,
  onTogglePlay,
  onPrevious,
  onNext,
  disabled,
}: PlaybackControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 hover:bg-primary/10 transition-colors"
        onClick={onPrevious}
        disabled={disabled || !onPrevious}
      >
        <SkipBack className="h-5 w-5" />
      </Button>

      <motion.div whileTap={{ scale: 0.95 }}>
        <Button
          variant="default"
          size="icon"
          className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
          onClick={onTogglePlay}
          disabled={disabled}
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </Button>
      </motion.div>

      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 hover:bg-primary/10 transition-colors"
        onClick={onNext}
        disabled={disabled || !onNext}
      >
        <SkipForward className="h-5 w-5" />
      </Button>
    </div>
  );
}