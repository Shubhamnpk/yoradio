import { useState, useEffect } from 'react';
import { Minimize2, X, Radio as RadioIcon, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RadioDisplay } from '@/components/display/RadioDisplay';
import { AudioControls } from '@/components/controls/AudioControls';
import { FullScreenDisplay } from '@/components/display/FullScreenDisplay';
import type { RadioStation } from '@/types/radio';
import { useFloatingPlayer } from '@/hooks/useFloatingPlayer';
import { isMobile } from '@/lib/utils';

interface FloatingPlayerProps {
  currentStation: RadioStation | null;
  isPlaying: boolean;
  volume: number;
  onVolumeChange: (value: number) => void;
  onTogglePlay: () => void;
  onPreviousStation?: () => void;
  onNextStation?: () => void;
  stations?: RadioStation[];
  onStationSelect?: (station: RadioStation) => void;
  isOnline?: boolean;
}

export function FloatingPlayer({
  currentStation,
  isPlaying,
  volume,
  onVolumeChange,
  onTogglePlay,
  onPreviousStation,
  onNextStation,
  stations = [],
  onStationSelect,
  isOnline = true,
}: FloatingPlayerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const {
    isVisible,
    isMinimized,
    show,
    hide,
    minimize,
    maximize,
  } = useFloatingPlayer();

  // Auto fullscreen on mobile when playing
  useEffect(() => {
    if (isMobile()) {
      setIsFullscreen(isPlaying && !!currentStation);
    }
  }, [isPlaying, currentStation]);

  // Handle exit fullscreen - different behavior on mobile vs desktop
  const handleExitFullscreen = () => {
    if (isMobile()) {
      // On mobile, show minimized floating player
      setIsFullscreen(false);
      show();
      minimize();
    } else {
      // On desktop, exit to normal floating state
      setIsFullscreen(false);
    }
  };

  // Fullscreen mode
  if (isFullscreen && currentStation) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] bg-background"
        >
          <FullScreenDisplay
            currentStation={currentStation}
            isPlaying={isPlaying}
            isOnline={isOnline}
            volume={volume}
            onVolumeChange={onVolumeChange}
            onTogglePlay={onTogglePlay}
            onPreviousStation={onPreviousStation}
            onNextStation={onNextStation}
            stations={stations}
            onStationSelect={onStationSelect}
            onExitFullscreen={handleExitFullscreen}
          />
        </motion.div>
      </AnimatePresence>
    );
  }

  if (!currentStation || (!isVisible && !(isMobile() && isMinimized))) {
    return null;
  }

  // Normal floating player mode
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed inset-0 pointer-events-none z-[9999]"
      >
        <div className="absolute bottom-6 right-6 pointer-events-auto">
          {isMinimized ? (
            <Button
              variant="default"
              size="lg"
              className="rounded-full p-6 shadow-lg hover:shadow-xl transition-shadow glass-morphism"
              onClick={() => isMobile() ? setIsFullscreen(true) : maximize()}
            >
              <RadioIcon className={`w-6 h-6 text-foreground ${isPlaying ? 'animate-pulse' : ''}`} />
            </Button>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-[380px] glass-morphism rounded-xl shadow-2xl"
            >
              <div className="flex items-center justify-between p-3 border-b border-border/10">
                <div className="flex items-center gap-2">
                  <RadioIcon className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-gradient">FM Radio</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-background/50 rounded-lg"
                    onClick={() => setIsFullscreen(true)}
                    title="Fullscreen"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-background/50 rounded-lg"
                    onClick={minimize}
                  >
                    <Minimize2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-background/50 rounded-lg"
                    onClick={hide}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="p-4 space-y-4">
                <RadioDisplay
                  currentStation={currentStation}
                  isPlaying={isPlaying}
                />
                <AudioControls
                  currentStation={currentStation}
                  isPlaying={isPlaying}
                  volume={volume}
                  onVolumeChange={onVolumeChange}
                  onTogglePlay={onTogglePlay}
                  onPreviousStation={onPreviousStation}
                  onNextStation={onNextStation}
                />
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}