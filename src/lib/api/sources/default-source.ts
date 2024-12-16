import { BaseRadioSource } from './base';
import type { RadioStation } from '@/types/radio';

export class DefaultRadioSource extends BaseRadioSource {
  constructor() {
    super('default');
  }

  async fetchStations(): Promise<RadioStation[]> {
    try {
      const response = await fetch('https://shubhamnpk.github.io/yoradio-api/data/');
      if (!response.ok) throw new Error('Failed to fetch stations');
      
      const stations: RadioStation[] = await response.json();
      return stations;
    } catch (error) {
      console.error('Error fetching default stations:', error);
      return [];
    }
  }
}