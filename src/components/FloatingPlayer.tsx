import { useState } from 'react';
import { Minimize2, X, Radio as RadioIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RadioDisplay } from '@/components/display/RadioDisplay';
import { AudioControls } from '@/components/controls/AudioControls';
import type { RadioStation } from '@/types/radio';
import { useFloatingPlayer } from '@/hooks/useFloatingPlayer';

interface FloatingPlayerProps {
  currentStation: RadioStation | null;
  isPlaying: boolean;
  volume: number;
  onVolumeChange: (value: number) => void;
  onTogglePlay: () => void;
  onPreviousStation?: () => void;
  onNextStation?: () => void;
}

export function FloatingPlayer({
  currentStation,
  isPlaying,
  volume,
  onVolumeChange,
  onTogglePlay,
  onPreviousStation,
  onNextStation,
}: FloatingPlayerProps) {
  const {
    isVisible,
    isMinimized,
    show,
    hide,
    minimize,
    maximize,
  } = useFloatingPlayer();

  // Show player when a station starts playing
  if (currentStation && isPlaying && !isVisible) {
    show();
  }

  if (!currentStation?.frequency || !isVisible) {
    return null;
  }

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
              onClick={maximize}
            >
              <RadioIcon className={`w-6 h-6 ${isPlaying ? 'animate-pulse' : ''}`} />
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