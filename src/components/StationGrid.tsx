import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RadioCard } from '@/components/cards/RadioCard';
import type { RadioStation } from '@/types/radio';

interface StationGridProps {
  stations: RadioStation[];
  favoriteStations: RadioStation[];
  currentStation: RadioStation | null;
  isPlaying: boolean;
  onPlay: (station: RadioStation) => void;
  onPause: () => void;
  hasMore: boolean;
  onLoadMore: () => void;
  isFavorite: (station: RadioStation) => boolean;
  onToggleFavorite: (station: RadioStation) => void;
}

export function StationGrid({
  stations,
  currentStation,
  isPlaying,
  onPlay,
  onPause,
  hasMore,
  onLoadMore,
  isFavorite,
  onToggleFavorite,
}: StationGridProps) {
  if (stations.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16 glass-morphism rounded-xl"
      >
        <p className="text-lg text-muted-foreground">No stations found</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-gradient">
          All Stations
        </h2>
        <motion.div 
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {stations.map((station, index) => (
            <motion.div
              key={station.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-hover"
            >
              <RadioCard
                station={station}
                isPlaying={isPlaying}
                isCurrentStation={currentStation?.id === station.id}
                onPlay={onPlay}
                onPause={onPause}
                isFavorite={isFavorite(station)}
                onToggleFavorite={() => onToggleFavorite(station)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {hasMore && (
        <motion.div 
          className="flex justify-center py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Button
            variant="outline"
            size="lg"
            onClick={onLoadMore}
            className="min-w-[200px] glass-morphism hover:bg-background/50"
          >
            Load More Stations
          </Button>
        </motion.div>
      )}
    </div>
  );
}