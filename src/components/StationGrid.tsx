import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RadioCard } from '@/components/cards/RadioCard';
import { RadioCardSkeleton } from '@/components/cards/RadioCardSkeleton';
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
  loading?: boolean;
  loadingMore?: boolean;
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
  loading = false,
  loadingMore = false,
}: StationGridProps) {
  if (stations.length === 0 && !loading) {
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
          className="grid gap-4 grid-cols-1 lg:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {loading
            ? Array.from({ length: 8 }, (_, index) => (
                <RadioCardSkeleton key={`skeleton-${index}`} />
              ))
            : stations.map((station, index) => (
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
            disabled={loadingMore}
            className="min-w-[200px] glass-morphism hover:bg-background/50"
          >
            {loadingMore ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Loading...
              </div>
            ) : (
              'Load More Stations'
            )}
          </Button>
        </motion.div>
      )}
    </div>
  );
}