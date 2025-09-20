import { toast } from 'sonner';
import type { RadioStation } from '@/types/radio';
import { useFavoritesStore } from '@/store/favorites';

export function useFavorites() {
  const {
    stations,
    addFavorite: addToStore,
    removeFavorite: removeFromStore,
    updatePlayCount,
    isFavorite,
    getFavoriteStations,
    getMostPlayed,
    getRecentlyAdded,
  } = useFavoritesStore();

  const addFavorite = (station: RadioStation) => {
    addToStore(station);
    toast.success('Added to favorites');
  };

  const removeFavorite = (station: RadioStation) => {
    removeFromStore(station.id);
    toast.success('Removed from favorites');
  };

  const toggleFavorite = (station: RadioStation) => {
    if (isFavorite(station.id)) {
      removeFavorite(station);
    } else {
      addFavorite(station);
    }
  };

  const getRecentlyPlayed = (limit = 5) => {
    return Object.values(stations)
      .filter(station => station.lastPlayedAt)
      .sort((a, b) => new Date(b.lastPlayedAt!).getTime() - new Date(a.lastPlayedAt!).getTime())
      .slice(0, limit)
      .map(station => station.id);
  };

  return {
    favorites: stations,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    updatePlayCount,
    isFavorite: (station: RadioStation) => isFavorite(station.id),
    getFavoriteStations,
    getFavoriteDetails: (stationId: string) => stations[stationId] || null,
    getMostPlayed,
    getRecentlyAdded,
    getRecentlyPlayed,
  };
}