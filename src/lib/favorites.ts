import { RadioStation } from '@/types/radio';

export interface FavoriteStation extends RadioStation {
  addedAt: string;
  lastPlayedAt?: string;
  playCount: number;
}

export interface FavoritesStorage {
  version: number;
  stations: Record<string, FavoriteStation>;
}

const STORAGE_KEY = 'yoradio-favorites';
const CURRENT_VERSION = 1;

export function getFavoritesFromStorage(): FavoritesStorage {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return { version: CURRENT_VERSION, stations: {} };
    }

    const parsed = JSON.parse(saved);
    
    // Handle version migrations if needed
    if (!parsed.version || parsed.version < CURRENT_VERSION) {
      // Migrate old format to new format
      if (Array.isArray(parsed)) {
        return {
          version: CURRENT_VERSION,
          stations: parsed.reduce((acc, id) => ({
            ...acc,
            [id]: {
              addedAt: new Date().toISOString(),
              playCount: 0,
            },
          }), {}),
        };
      }
    }

    return parsed;
  } catch (error) {
    console.error('Error loading favorites:', error);
    return { version: CURRENT_VERSION, stations: {} };
  }
}

export function saveFavoritesToStorage(favorites: FavoritesStorage): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
}