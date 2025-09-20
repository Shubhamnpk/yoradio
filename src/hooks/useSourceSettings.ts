import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { radioSources } from '@/config/sources';

interface SourceSettings {
  enabledSources: string[];
  selectedCountry: string | null;
  toggleSource: (sourceId: string) => void;
  isSourceEnabled: (sourceId: string) => boolean;
  setSelectedCountry: (country: string | null) => void;
}

export const useSourceSettings = create<SourceSettings>()(
  persist(
    (set, get) => ({
      enabledSources: radioSources.filter(s => s.isDefault).map(s => s.id),
      selectedCountry: 'Nepal',

      toggleSource: (sourceId) => set((state) => ({
        enabledSources: state.enabledSources.includes(sourceId)
          ? state.enabledSources.filter(id => id !== sourceId)
          : [...state.enabledSources, sourceId]
      })),

      isSourceEnabled: (sourceId) => get().enabledSources.includes(sourceId),

      setSelectedCountry: (country) => set({ selectedCountry: country }),
    }),
    {
      name: 'yoradio-source-settings',
    }
  )
);