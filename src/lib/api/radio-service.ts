import { DefaultRadioSource } from './sources/default-source';
import { RadioBrowserSource } from './sources/radio-browser-source';
import type { RadioSource } from './sources/base';
import type { RadioStation } from '@/types/radio';
import { useSourceSettings } from '@/hooks/useSourceSettings';

export class RadioService {
  private sources: Map<string, RadioSource>;

  constructor() {
    this.sources = new Map([
      ['default', new DefaultRadioSource()],
      ['radio-browser', new RadioBrowserSource()],
    ]);
  }

  private getEnabledSources(): RadioSource[] {
    const { enabledSources } = useSourceSettings.getState();
    return Array.from(this.sources.entries())
      .filter(([id]) => enabledSources.includes(id))
      .map(([, source]) => source);
  }

  async fetchAllStations(): Promise<RadioStation[]> {
    try {
      const enabledSources = this.getEnabledSources();
      
      if (enabledSources.length === 0) {
        console.warn('No radio sources enabled');
        return [];
      }

      const stationsArrays = await Promise.all(
        enabledSources.map(source => source.fetchStations())
      );

      // Merge and deduplicate stations
      const mergedStations = stationsArrays.flat();
      const uniqueStations = Array.from(
        new Map(mergedStations.map(station => [station.id, station])).values()
      );

      return uniqueStations;
    } catch (error) {
      console.error('Error fetching stations:', error);
      return [];
    }
  }

  async searchStations(query: string): Promise<RadioStation[]> {
    try {
      const enabledSources = this.getEnabledSources();
      const searchResults = await Promise.all(
        enabledSources.map(async (source) => {
          if (source.searchStations) {
            return source.searchStations(query);
          }
          // For sources without search, filter locally
          const stations = await source.fetchStations();
          return stations.filter(station => 
            station.name.toLowerCase().includes(query.toLowerCase())
          );
        })
      );

      return Array.from(
        new Map(searchResults.flat().map(station => [station.id, station])).values()
      );
    } catch (error) {
      console.error('Error searching stations:', error);
      return [];
    }
  }
}

export const radioService = new RadioService();