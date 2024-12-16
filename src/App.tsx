import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { useStations } from '@/hooks/useStations';
import { useFavorites } from '@/hooks/useFavorites';
import { StationGrid } from '@/components/StationGrid';
import { SearchBar } from '@/components/SearchBar';
import { FilterBar } from '@/components/FilterBar';
import { SettingsDialog } from '@/components/SettingsDialog';
import { FloatingPlayer } from '@/components/FloatingPlayer';
import { FavoritesList } from '@/components/favorites/preview/FavoritesList';
import { Radio } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const {
    stations,
    allStations,
    loading,
    filters,
    setFilters,
    provinces,
    hasMore,
    loadMore,
  } = useStations();

  const {
    isPlaying,
    currentStation,
    volume,
    play,
    pause,
    togglePlay,
    adjustVolume,
  } = useAudioPlayer();

  const {
    getFavoriteStations,
    isFavorite,
    toggleFavorite,
    updatePlayCount,
  } = useFavorites();

  const handlePlay = (station: RadioStation) => {
    play(station);
    if (isFavorite(station)) {
      updatePlayCount(station.id);
    }
  };

  const currentIndex = currentStation
    ? stations.findIndex((s) => s.id === currentStation.id)
    : -1;

  const handlePreviousStation = () => {
    if (currentIndex > 0) {
      handlePlay(stations[currentIndex - 1]);
    }
  };

  const handleNextStation = () => {
    if (currentIndex < stations.length - 1) {
      handlePlay(stations[currentIndex + 1]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-6 p-8 rounded-xl bg-card/50 backdrop-blur-lg shadow-xl border border-border/50"
        >
          <Radio className="w-12 h-12 text-primary animate-pulse" />
          <div className="space-y-2 text-center">
            <h2 className="text-xl font-semibold">Loading Your Stations</h2>
            <p className="text-sm text-muted-foreground">
              Preparing your personalized radio experience...
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <motion.div 
                className="flex items-center gap-3"
                whileHover={{ scale: 1.02 }}
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  <Radio className="w-6 h-6 text-primary" />
                </div>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                  Yo Radio
                </h1>
              </motion.div>
              <div className="flex items-center gap-4">
                <SettingsDialog />
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full"
                >
                  {stations.length} stations available
                </motion.p>
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-[1fr,auto]">
              <SearchBar
                value={filters.search}
                onChange={(search) => setFilters({ ...filters, search })}
              />
              <FilterBar
                filters={filters}
                onFilterChange={(newFilters) =>
                  setFilters({ ...filters, ...newFilters })
                }
                provinces={provinces}
              />
            </div>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <FavoritesList
            stations={stations}
            currentStation={currentStation}
            isPlaying={isPlaying}
            onPlay={handlePlay}
            onPause={pause}
            allStations={allStations} // Pass allStations here
          />

          <StationGrid
            stations={stations}
            favoriteStations={getFavoriteStations(allStations)} // Use allStations here
            currentStation={currentStation}
            isPlaying={isPlaying}
            onPlay={handlePlay}
            onPause={pause}
            hasMore={hasMore}
            onLoadMore={loadMore}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
          />
        </motion.div>
      </main>

      <FloatingPlayer
        currentStation={currentStation}
        isPlaying={isPlaying}
        volume={volume}
        onVolumeChange={adjustVolume}
        onTogglePlay={togglePlay}
        onPreviousStation={currentIndex > 0 ? handlePreviousStation : undefined}
        onNextStation={
          currentIndex < stations.length - 1 ? handleNextStation : undefined
        }
      />
    </div>
  );
}

export default App;