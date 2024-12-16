import type { RadioStation } from '@/types/radio';

export interface RadioSource {
  id: string;
  fetchStations(): Promise<RadioStation[]>;
  searchStations?(query: string): Promise<RadioStation[]>;
}

export class BaseRadioSource implements RadioSource {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  async fetchStations(): Promise<RadioStation[]> {
    throw new Error('Method not implemented');
  }
}