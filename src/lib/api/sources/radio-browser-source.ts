import { BaseRadioSource } from './base';
import type { RadioStation, RadioBrowserStation, FilterState } from '@/types/radio';
import { transformRadioBrowserStation } from '@/lib/transformers/radio-browser';

const RADIO_BROWSER_BASE_URL = 'https://de2.api.radio-browser.info/json';

export class RadioBrowserSource extends BaseRadioSource {
  constructor() {
    super('radio-browser');
  }

  async fetchStations(filters?: Partial<FilterState>): Promise<RadioStation[]> {
    try {
      let url = `${RADIO_BROWSER_BASE_URL}/stations`;
      if (filters?.country) {
        url = `${RADIO_BROWSER_BASE_URL}/stations/bycountry/${encodeURIComponent(filters.country)}`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch stations');

      const stations: RadioBrowserStation[] = await response.json();
      return stations
        .filter(station => station.lastcheckok === 1)
        .map(transformRadioBrowserStation);
    } catch (error) {
      console.error('Error fetching Radio Browser stations:', error);
      return [];
    }
  }

  async searchStations(query: string): Promise<RadioStation[]> {
    try {
      const response = await fetch(
        `${RADIO_BROWSER_BASE_URL}/stations/search?name=${encodeURIComponent(query)}`
      );
      if (!response.ok) throw new Error('Failed to search stations');

      const stations: RadioBrowserStation[] = await response.json();
      return stations
        .filter(station => station.lastcheckok === 1)
        .map(transformRadioBrowserStation);
    } catch (error) {
      console.error('Error searching Radio Browser stations:', error);
      return [];
    }
  }

  async fetchCountries(): Promise<string[]> {
    // Return popular countries for better performance
    return [
      'United States',
      'United Kingdom',
      'India',
      'Nepal',
      'Canada',
      'Australia',
      'Germany',
      'France',
      'Italy',
      'Spain',
      'Netherlands',
      'Sweden',
      'Norway',
      'Denmark',
      'Finland',
      'Japan',
      'South Korea',
      'Brazil',
      'Mexico',
      'Argentina'
    ];
  }
}