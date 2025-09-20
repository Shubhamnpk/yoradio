import { motion, AnimatePresence } from 'framer-motion';
import { Music, Wifi, WifiOff, Volume2, Signal } from 'lucide-react';
import type { RadioStation } from '@/types/radio';
import { AudioSpectrum } from './AudioSpectrum';
import { FullScreenControls } from '../controls/FullScreenControls';
import { formatFrequency } from '@/lib/utils';

interface FullScreenDisplayProps {
  currentStation: RadioStation | null;
  isPlaying: boolean;
  isOnline: boolean;
  volume: number;
  onVolumeChange: (value: number) => void;
  onTogglePlay: () => void;
  onPreviousStation?: () => void;
  onNextStation?: () => void;
  stations?: RadioStation[];
  onStationSelect?: (station: RadioStation) => void;
  onExitFullscreen?: () => void;
}

export function FullScreenDisplay({
  currentStation,
  isPlaying,
  isOnline,
  volume,
  onVolumeChange,
  onTogglePlay,
  onPreviousStation,
  onNextStation,
  stations = [],
  onStationSelect,
  onExitFullscreen
}: FullScreenDisplayProps) {
  if (!currentStation) {
    return (
      <div className="relative flex flex-col items-center justify-center h-full bg-background overflow-hidden">
        {/* Geometric pattern background */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px),
              linear-gradient(0deg, hsl(var(--primary)) 1px, transparent 1px),
              linear-gradient(45deg, transparent 35%, hsl(var(--primary)) 35%, hsl(var(--primary)) 65%, transparent 65%),
              linear-gradient(-45deg, transparent 35%, hsl(var(--primary)) 35%, hsl(var(--primary)) 65%, transparent 65%)
            `,
            backgroundSize: '30px 30px, 30px 30px, 60px 60px, 60px 60px',
          }} />
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute opacity-5"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-10, -30, -10],
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            >
              {i % 3 === 0 ? (
                <div className="w-8 h-8 bg-primary rotate-45" />
              ) : i % 3 === 1 ? (
                <div className="w-6 h-6 bg-primary rounded-full" />
              ) : (
                <div className="w-10 h-2 bg-primary" />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center space-y-8 relative z-10 px-6 max-w-lg"
        >
          {/* Compact radio icon */}
          <div className="relative mx-auto w-20 h-20">
            <div className="w-full h-full rounded-2xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center backdrop-blur-sm">
              <Music className="w-10 h-10 text-primary" />
            </div>

            {/* Geometric pulse rings */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
                className="absolute inset-0 border-2 border-primary/30 rounded-2xl"
              />
            ))}
          </div>

          {/* Compact content */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">
              Select a Station
            </h2>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Choose your favorite radio station to begin listening
            </p>

            {/* Status */}
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              {isOnline ? (
                <>
                  <Wifi className="w-4 h-4 text-green-500" />
                  <span>Ready to connect</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-4 h-4 text-destructive" />
                  <span>Connection unavailable</span>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Corner accent shapes */}
        <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-primary/10 opacity-50" />
        <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-primary/10 opacity-50" />
      </div>
    );
  }

  return (
    <div className="relative h-full bg-background overflow-hidden">
      {/* Geometric pattern background */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08]">
        <motion.div
          animate={{
            backgroundPosition: ['0px 0px', '60px 60px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(30deg, transparent 30%, hsl(var(--primary)) 30%, hsl(var(--primary)) 70%, transparent 70%),
              linear-gradient(150deg, transparent 30%, hsl(var(--primary)) 30%, hsl(var(--primary)) 70%, transparent 70%),
              linear-gradient(90deg, hsl(var(--primary)/0.1) 1px, transparent 1px),
              linear-gradient(0deg, hsl(var(--primary)/0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px, 80px 80px, 20px 20px, 20px 20px',
          }}
        />
      </div>

      {/* Main content - more compact */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 py-8 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-8 w-full"
          >

            {/* Station info - compact */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                  {currentStation.name}
                </h1>

                {/* Status bar */}
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${
                      isPlaying ? 'bg-green-500' : 'bg-muted-foreground/50'
                    }`} />
                    <span>{isPlaying ? 'Live' : 'Stopped'}</span>
                  </div>

                  <div className="w-px h-4 bg-border" />

                  <div className="flex items-center gap-1.5">
                    <Signal className="w-3.5 h-3.5" />
                    <span className="font-mono">
                      {currentStation.frequency ? formatFrequency(currentStation.frequency) : 'Online'}
                    </span>
                  </div>

                  {currentStation.country && (
                    <>
                      <div className="w-px h-4 bg-border" />
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-foreground">
                          {currentStation.country}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Compact spectrum */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="w-full max-w-4xl mx-auto"
              >
                {isPlaying ? (
                  <div className="relative p-6">
                    <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50">
                      <AudioSpectrum className="scale-125" />
                    </div>

                    {/* Subtle glow */}
                    <div className="absolute inset-0 bg-primary/5 rounded-xl blur-xl scale-125" />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-20 text-muted-foreground">
                    <div className="flex items-center gap-2 text-sm">
                      <Volume2 className="w-4 h-4" />
                      <span>Audio ready</span>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Enhanced controls section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 w-full max-w-4xl px-4"
        >
          <FullScreenControls
            currentStation={currentStation}
            isPlaying={isPlaying}
            volume={volume}
            onVolumeChange={onVolumeChange}
            onTogglePlay={onTogglePlay}
            onPreviousStation={onPreviousStation}
            onNextStation={onNextStation}
            stations={stations}
            onStationSelect={onStationSelect}
            onExitFullscreen={onExitFullscreen}
          />
        </motion.div>

      </div>

      {/* Geometric corner accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-6 right-6 w-20 h-20">
          <div className="absolute top-0 right-0 w-8 h-1 bg-primary/20" />
          <div className="absolute top-0 right-0 w-1 h-8 bg-primary/20" />
          <div className="absolute top-3 right-3 w-4 h-4 border border-primary/10 rotate-45" />
        </div>

        <div className="absolute bottom-6 left-6 w-20 h-20">
          <div className="absolute bottom-0 left-0 w-8 h-1 bg-primary/20" />
          <div className="absolute bottom-0 left-0 w-1 h-8 bg-primary/20" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border border-primary/10 rotate-45" />
        </div>

        {/* Subtle ambient shapes */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.02, 0.05, 0.02],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 right-1/4 w-32 h-32 bg-primary rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.01, 0.03, 0.01],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-primary rounded-full blur-3xl"
        />
      </div>
    </div>
  );
}