import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioCard } from '@/components/cards/RadioCard';
import { FavoriteStats } from '../stats/FavoriteStats';
import { FavoritesDashboard } from '../dashboard/FavoritesDashboard';
import { EmptyState } from './EmptyState';
import { PreviewHeader } from './PreviewHeader';
import type { RadioStation } from '@/types/radio';
import { useFavorites } from '@/hooks/useFavorites';
import { useState } from 'react';

interface FavoritesListProps {
  stations: RadioStation[];
  currentStation: RadioStation | null;
  isPlaying: boolean;
  onPlay: (station: RadioStation) => void;
  onPause: () => void;
  allStations: RadioStation[]; // Add this prop
}

export function FavoritesList({
  stations,
  currentStation,
  isPlaying,
  onPlay,
  onPause,
  allStations, // Use this instead of the filtered stations
}: FavoritesListProps) {
  const { getFavoriteDetails, getFavoriteStations, isFavorite, toggleFavorite } = useFavorites();
  const [showDashboard, setShowDashboard] = useState(false);
  
  const favoriteStations = getFavoriteStations(allStations); // Use allStations here
  const previewStations = favoriteStations.slice(0, 3);

  if (favoriteStations.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="mb-8 space-y-6">
      <PreviewHeader
        stationCount={favoriteStations.length}
        onViewDashboard={() => setShowDashboard(true)}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {previewStations.map((station) => {
            const details = getFavoriteDetails(station.id);
            
            return (
              <motion.div
                key={station.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                layout
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
            );
          })}
        </AnimatePresence>
      </div>

      {favoriteStations.length > 3 && (
        <div className="text-center">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => setShowDashboard(true)}
          >
            View All {favoriteStations.length} Favorites
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      <FavoritesDashboard
        {...{ currentStation, isPlaying, onPlay, onPause }}
        stations={allStations} // Pass allStations here
        open={showDashboard}
        onOpenChange={setShowDashboard}
      />
    </div>
  );
}