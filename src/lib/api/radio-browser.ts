import type { RadioStation, RadioBrowserStation } from '@/types/radio';
import { transformRadioBrowserStation } from '@/lib/transformers/radio-browser';

const RADIO_BROWSER_BASE_URL = 'https://de1.api.radio-browser.info/json';

export async function fetchRadioBrowserStations(country: string = 'bangladesh'): Promise<RadioStation[]> {
  try {
    const response = await fetch(`${RADIO_BROWSER_BASE_URL}/stations/bycountry/${country}`);
    if (!response.ok) throw new Error('Failed to fetch stations');
    
    const stations: RadioBrowserStation[] = await response.json();
    
    return stations
      .filter(station => station.lastcheckok === 1) // Only return online stations
      .map(transformRadioBrowserStation);
  } catch (error) {
    console.error('Error fetching Radio Browser stations:', error);
    return [];
  }
}

export async function searchRadioBrowserStations(query: string): Promise<RadioStation[]> {
  try {
    const response = await fetch(`${RADIO_BROWSER_BASE_URL}/stations/search?name=${encodeURIComponent(query)}`);
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