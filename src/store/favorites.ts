import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { RadioStation } from '@/types/radio';

export interface FavoriteStation extends RadioStation {
  addedAt: string;
  lastPlayedAt?: string;
  playCount: number;
}

interface FavoritesState {
  stations: Record<string, FavoriteStation>;
  addFavorite: (station: RadioStation) => void;
  removeFavorite: (stationId: string) => void;
  updatePlayCount: (stationId: string) => void;
  isFavorite: (stationId: string) => boolean;
  getFavoriteStations: (stations: RadioStation[]) => RadioStation[];
  getMostPlayed: (limit?: number) => string[];
  getRecentlyAdded: (limit?: number) => string[];
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      stations: {},

      addFavorite: (station) => set((state) => ({
        stations: {
          ...state.stations,
          [station.id]: {
            ...station,
            addedAt: new Date().toISOString(),
            playCount: 0,
          },
        },
      })),

      removeFavorite: (stationId) => set((state) => {
        const { [stationId]: removed, ...rest } = state.stations;
        return { stations: rest };
      }),

      updatePlayCount: (stationId) => set((state) => {
        const station = state.stations[stationId];
        if (!station) return state;

        return {
          stations: {
            ...state.stations,
            [stationId]: {
              ...station,
              lastPlayedAt: new Date().toISOString(),
              playCount: (station.playCount || 0) + 1,
            },
          },
        };
      }),

      isFavorite: (stationId) => {
        return stationId in get().stations;
      },

      getFavoriteStations: (stations) => {
        const favoriteIds = Object.keys(get().stations);
        return stations.filter(station => favoriteIds.includes(station.id));
      },

      getMostPlayed: (limit = 5) => {
        return Object.values(get().stations)
          .sort((a, b) => (b.playCount || 0) - (a.playCount || 0))
          .slice(0, limit)
          .map(station => station.id);
      },

      getRecentlyAdded: (limit = 5) => {
        return Object.values(get().stations)
          .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
          .slice(0, limit)
          .map(station => station.id);
      },
    }),
    {
      name: 'yoradio-favorites',
      version: 1,
    }
  )
);