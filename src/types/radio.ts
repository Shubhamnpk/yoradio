// Base Radio Station interface
export interface RadioStation {
  id: string;
  name: string;
  streamUrl: string;
  frequency: number | null;
  address: string;
  province?: number;
  favicon?: string;
  tags?: string[];
  language?: string;
  country?: string;
  state?: string;
  codec?: string;
  bitrate?: number;
  votes?: number;
  homepage?: string;
  lastChecked?: string;
  isOnline?: boolean;
}

// Radio Browser specific interface
export interface RadioBrowserStation {
  changeuuid: string;
  stationuuid: string;
  name: string;
  url: string;
  url_resolved: string;
  homepage: string;
  favicon: string;
  tags: string;
  country: string;
  countrycode: string;
  state: string;
  language: string;
  languagecodes: string;
  votes: number;
  codec: string;
  bitrate: number;
  lastcheckok: number;
  lastchecktime: string;
  clickcount: number;
  clicktrend: number;
  ssl_error: number;
  geo_lat: number | null;
  geo_long: number | null;
  has_extended_info: boolean;
}

export type SortOption = 'name' | 'frequency' | 'votes' | 'bitrate';

export interface FilterState {
  search: string;
  province: number | null;
  sortBy: SortOption;
  language?: string;
  codec?: string;
}