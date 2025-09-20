import { BaseRadioSource } from './base';
import type { RadioStation, FilterState } from '@/types/radio';

export class DefaultRadioSource extends BaseRadioSource {
  constructor() {
    super('default');
  }

  async fetchStations(filters?: Partial<FilterState>): Promise<RadioStation[]> {
    try {
      console.log('DefaultRadioSource: Fetching stations with filters:', filters);
      const response = await fetch('https://shubhamnpk.github.io/yoradio-api/data/');
      if (!response.ok) throw new Error(`Failed to fetch stations: ${response.status}`);

      const stations: RadioStation[] = await response.json();
      console.log('DefaultRadioSource: Fetched stations:', stations.length);

      // Filter stations based on country - since all default stations are Nepali
      if (filters?.country && filters.country !== 'Nepal') {
        console.log('DefaultRadioSource: Filtering for non-Nepal country, returning empty');
        return []; // Return empty if filtering for non-Nepal countries
      }

      console.log('DefaultRadioSource: Returning stations:', stations.length);
      return stations;
    } catch (error) {
      console.error('Error fetching default stations:', error);
      return [];
    }
  }
}