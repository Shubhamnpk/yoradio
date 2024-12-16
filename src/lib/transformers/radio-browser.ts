import type { RadioBrowserStation, RadioStation } from '@/types/radio';

export function transformRadioBrowserStation(station: RadioBrowserStation): RadioStation {
  return {
    id: station.stationuuid,
    name: station.name,
    streamUrl: station.url_resolved || station.url,
    frequency: null, // Radio Browser stations are typically online-only
    address: station.state || station.country || 'Unknown Location',
    favicon: station.favicon,
    tags: station.tags ? station.tags.split(',').map(tag => tag.trim()) : [],
    language: station.language,
    country: station.country,
    state: station.state,
    codec: station.codec,
    bitrate: station.bitrate,
    votes: station.votes,
    homepage: station.homepage,
    lastChecked: station.lastchecktime,
    isOnline: station.lastcheckok === 1,
  };
}