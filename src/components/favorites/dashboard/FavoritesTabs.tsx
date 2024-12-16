import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VirtualStationList } from './VirtualStationList';
import { FavoritesSearch } from '../search/FavoritesSearch';
import { useFavorites } from '@/hooks/useFavorites';
import { BarChart3, History, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { RadioStation } from '@/types/radio';

interface FavoritesTabsProps {
  stations: RadioStation[];
  currentStation: RadioStation | null;
  isPlaying: boolean;
  onPlay: (station: RadioStation) => void;
  onPause: () => void;
}

export function FavoritesTabs({
  stations,
  currentStation,
  isPlaying,
  onPlay,
  onPause,
}: FavoritesTabsProps) {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const {
    getFavoriteStations,
    getMostPlayed,
    getRecentlyAdded,
  } = useFavorites();

  const favoriteStations = getFavoriteStations(stations);
  const mostPlayedIds = getMostPlayed(50);
  const recentlyAddedIds = getRecentlyAdded(50);

  const filterStations = (stationList: RadioStation[]) => {
    if (!search) return stationList;
    const searchLower = search.toLowerCase();
    return stationList.filter(station => 
      station.name.toLowerCase().includes(searchLower) ||
      station.address.toLowerCase().includes(searchLower)
    );
  };

  const filteredFavorites = filterStations(favoriteStations);
  const filteredMostPlayed = filterStations(
    stations.filter(station => mostPlayedIds.includes(station.id))
  );
  const filteredRecent = filterStations(
    stations.filter(station => recentlyAddedIds.includes(station.id))
  );

  return (
    <Tabs 
      value={activeTab} 
      onValueChange={setActiveTab}
      className="h-full flex flex-col"
    >
      <div className="px-6 space-y-4">
        <TabsList className="grid w-full grid-cols-3 p-1 bg-muted/50">
          <TabsTrigger value="all" className="gap-2">
            <Star className="h-4 w-4" />
            All Favorites
          </TabsTrigger>
          <TabsTrigger value="recent" className="gap-2">
            <History className="h-4 w-4" />
            Recently Added
          </TabsTrigger>
          <TabsTrigger value="popular" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Most Played
          </TabsTrigger>
        </TabsList>

        <FavoritesSearch value={search} onChange={setSearch} />
      </div>

      <div className="flex-1 overflow-hidden px-6 pb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            <TabsContent value="all" className="h-full m-0">
              <VirtualStationList
                stations={filteredFavorites}
                currentStation={currentStation}
                isPlaying={isPlaying}
                onPlay={onPlay}
                onPause={onPause}
              />
            </TabsContent>

            <TabsContent value="recent" className="h-full m-0">
              <VirtualStationList
                stations={filteredRecent}
                currentStation={currentStation}
                isPlaying={isPlaying}
                onPlay={onPlay}
                onPause={onPause}
              />
            </TabsContent>

            <TabsContent value="popular" className="h-full m-0">
              <VirtualStationList
                stations={filteredMostPlayed}
                currentStation={currentStation}
                isPlaying={isPlaying}
                onPlay={onPlay}
                onPause={onPause}
              />
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </div>
    </Tabs>
  );
}