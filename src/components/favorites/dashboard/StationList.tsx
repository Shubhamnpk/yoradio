import { RadioCard } from '@/components/cards/RadioCard';
import { FavoriteStats } from '../stats/FavoriteStats';
import { useFavorites } from '@/hooks/useFavorites';
import type { RadioStation } from '@/types/radio';

interface StationListProps {
  stations: RadioStation[];
  currentStation: RadioStation | null;
  isPlaying: boolean;
  onPlay: (station: RadioStation) => void;
  onPause: () => void;
}

export function StationList({
  stations,
  currentStation,
  isPlaying,
  onPlay,
  onPause,
}: StationListProps) {
  const { getFavoriteDetails, isFavorite, toggleFavorite } = useFavorites();

  return (
    <div className="space-y-4">
      {stations.map(station => {
        const details = getFavoriteDetails(station.id);
        return (
          <div key={station.id} className="space-y-2">
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
        );
      })}
    </div>
  );
}