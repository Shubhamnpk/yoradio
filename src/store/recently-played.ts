import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { RadioStation } from '@/types/radio';

interface RecentlyPlayedState {
  stations: RadioStation[];
  addRecentlyPlayed: (station: RadioStation) => void;
  getRecentlyPlayed: (limit?: number) => RadioStation[];
  clearRecentlyPlayed: () => void;
}

export const useRecentlyPlayedStore = create<RecentlyPlayedState>()(
  persist(
    (set, get) => ({
      stations: [],

      addRecentlyPlayed: (station) => set((state) => {
        // Remove if already exists
        const filtered = state.stations.filter(s => s.id !== station.id);
        // Add to beginning
        const updated = [station, ...filtered];
        // Keep only last 20
        return { stations: updated.slice(0, 20) };
      }),

      getRecentlyPlayed: (limit = 10) => {
        return get().stations.slice(0, limit);
      },

      clearRecentlyPlayed: () => set({ stations: [] }),
    }),
    {
      name: 'yoradio-recently-played',
      version: 1,
    }
  )
);