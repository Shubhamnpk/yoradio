import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { motion } from 'framer-motion';

interface VolumeSliderProps {
  volume: number;
  onVolumeChange: (value: number) => void;
  disabled: boolean;
}

export function VolumeSlider({ volume, onVolumeChange, disabled }: VolumeSliderProps) {
  const toggleMute = () => {
    onVolumeChange(volume === 0 ? 0.5 : 0);
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 shrink-0 hover:bg-primary/10 transition-colors"
        onClick={toggleMute}
        disabled={disabled}
      >
        {volume === 0 ? (
          <VolumeX className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
      </Button>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full"
      >
        <Slider
          value={[volume]}
          max={1}
          step={0.01}
          onValueChange={(value) => onVolumeChange(value[0])}
          disabled={disabled}
          className={`${disabled ? 'opacity-50' : ''}`}
        />
      </motion.div>
    </div>
  );
}