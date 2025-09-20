import { Volume2, Music2 } from 'lucide-react';
import type { RadioStation } from '@/types/radio';
import { Card } from '@/components/ui/card';
import { AudioSpectrum } from './AudioSpectrum';
import { StationInfo } from './StationInfo';
import { SignalIndicator } from './SignalIndicator';
import { motion, AnimatePresence } from 'framer-motion';

interface RadioDisplayProps {
  currentStation: RadioStation | null;
  isPlaying: boolean;
}

export function RadioDisplay({ currentStation, isPlaying }: RadioDisplayProps) {
  if (!currentStation) {
    return (
      <Card className="bg-black/95 text-primary p-8 rounded-lg text-center">
        <Music2 className="w-12 h-12 mx-auto mb-4 animate-pulse" />
        <p className="text-lg font-mono">Select a station to begin</p>
        <p className="text-sm text-primary/60 mt-2">Browse and discover new stations</p>
      </Card>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="bg-gradient-to-br from-black/95 to-black/90 text-primary p-6 rounded-lg border-t border-white/10">
          <div className="flex items-center justify-between mb-4">
            <SignalIndicator strength={0.8} isPlaying={isPlaying} />
            <Volume2 className={`w-5 h-5 ${isPlaying ? '' : 'opacity-50'} transition-opacity`} />
          </div>
          
          <StationInfo station={currentStation} isPlaying={isPlaying} />

          <div className="relative">
            {isPlaying && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <AudioSpectrum className="mb-4" />
              </motion.div>
            )}
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}