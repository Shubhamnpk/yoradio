import { Volume2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VolumeSlider } from './VolumeSlider';
import { PlaybackControls } from './PlaybackControls';
import type { RadioStation } from '@/types/radio';
import { motion } from 'framer-motion';
import { isMobile } from '@/lib/utils';

interface FullScreenControlsProps {
  currentStation: RadioStation | null;
  isPlaying: boolean;
  volume: number;
  onVolumeChange: (value: number) => void;
  onTogglePlay: () => void;
  onPreviousStation?: () => void;
  onNextStation?: () => void;
  stations?: RadioStation[];
  onStationSelect?: (station: RadioStation) => void;
  onExitFullscreen?: () => void;
}

export function FullScreenControls({
  currentStation,
  isPlaying,
  volume,
  onVolumeChange,
  onTogglePlay,
  onPreviousStation,
  onNextStation,
  stations = [],
  onStationSelect,
  onExitFullscreen,
}: FullScreenControlsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Top bar with exit button */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-foreground">
            {isPlaying ? 'Now Playing' : 'Paused'}
          </span>
        </div>

        {/* Prominent exit fullscreen button */}
        {onExitFullscreen && (
          <Button
            variant="outline"
            size="sm"
            className="bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary/10 transition-colors"
            onClick={onExitFullscreen}
          >
            <Minimize2 className="h-4 w-4 mr-2" />
            {isMobile() ? 'Minimize' : 'Exit Fullscreen'}
          </Button>
        )}
      </div>

      {/* Main playback controls */}
      <div className="flex items-center justify-center mb-8">
        <PlaybackControls
          isPlaying={isPlaying}
          onTogglePlay={onTogglePlay}
          onPrevious={onPreviousStation}
          onNext={onNextStation}
          disabled={!currentStation}
        />
      </div>

      {/* Volume control with better styling */}
      <div className="bg-card/30 backdrop-blur-sm rounded-lg p-4 border border-border/50 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 min-w-[60px]">
            <Volume2 className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Volume</span>
          </div>
          <div className="flex-1">
            <VolumeSlider
              volume={volume}
              onVolumeChange={onVolumeChange}
              disabled={!currentStation}
            />
          </div>
          <div className="text-sm text-muted-foreground min-w-[40px] text-right">
            {Math.round(volume * 100)}%
          </div>
        </div>
      </div>

      {/* Station selector with improved UI */}
      {stations.length > 1 && onStationSelect && (
        <div className="bg-card/30 backdrop-blur-sm rounded-lg p-4 border border-border/50">
          <div className="text-sm font-medium text-center mb-3">Quick Station Switch</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {stations.slice(0, 8).map((station) => (
              <Button
                key={station.id}
                variant={currentStation?.id === station.id ? "default" : "outline"}
                size="sm"
                className={`text-xs transition-all ${
                  currentStation?.id === station.id
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'hover:bg-primary/10'
                }`}
                onClick={() => onStationSelect(station)}
              >
                {station.name.length > 15 ? `${station.name.substring(0, 15)}...` : station.name}
              </Button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}