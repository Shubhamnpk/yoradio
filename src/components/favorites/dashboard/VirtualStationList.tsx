import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import { RadioCard } from '@/components/cards/RadioCard';
import { FavoriteStats } from '../stats/FavoriteStats';
import { useFavorites } from '@/hooks/useFavorites';
import type { RadioStation } from '@/types/radio';
import { motion } from 'framer-motion';

interface VirtualStationListProps {
  stations: RadioStation[];
  currentStation: RadioStation | null;
  isPlaying: boolean;
  onPlay: (station: RadioStation) => void;
  onPause: () => void;
}

export function VirtualStationList({
  stations,
  currentStation,
  isPlaying,
  onPlay,
  onPause,
}: VirtualStationListProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const { getFavoriteDetails, isFavorite, toggleFavorite } = useFavorites();

  const rowVirtualizer = useVirtualizer({
    count: stations.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 180, // Estimated height of each row
    overscan: 5,
  });

  if (stations.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-full flex items-center justify-center"
      >
        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-muted-foreground">
            No stations found
          </p>
          <p className="text-sm text-muted-foreground/60">
            Try adjusting your search or add more stations to favorites
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div
      ref={parentRef}
      className="h-full overflow-auto"
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const station = stations[virtualRow.index];
          const details = getFavoriteDetails(station.id);

          return (
            <div
              key={virtualRow.index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
              className="p-2"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: virtualRow.index * 0.05 }}
                className="h-full"
              >
                <div className="space-y-2">
                  <RadioCard
                    station={station}
                    isPlaying={isPlaying}
                    isCurrentStation={currentStation?.id === station.id}
                    onPlay={onPlay}
                    onPause={onPause}
                    isFavorite={isFavorite(station)}
                    onToggleFavorite={() => toggleFavorite(station)}
                  />
                  {details && <FavoriteStats station={details} />}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}