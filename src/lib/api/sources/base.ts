import type { RadioStation, FilterState } from '@/types/radio';

export interface RadioSource {
  id: string;
  fetchStations(filters?: Partial<FilterState>): Promise<RadioStation[]>;
  searchStations?(query: string): Promise<RadioStation[]>;
  fetchCountries?(): Promise<string[]>;
}

export class BaseRadioSource implements RadioSource {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  async fetchStations(_filters?: Partial<FilterState>): Promise<RadioStation[]> {
    throw new Error('Method not implemented');
  }
}