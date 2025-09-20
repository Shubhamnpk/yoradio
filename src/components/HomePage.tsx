import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { useStations } from '@/hooks/useStations';
import { useFavorites } from '@/hooks/useFavorites';
import { useRecentlyPlayedStore } from '@/store/recently-played';
import { useSourceSettings } from '@/hooks/useSourceSettings';
import { StationGrid } from '@/components/StationGrid';
import { SearchBar } from '@/components/SearchBar';
import { FilterBar } from '@/components/FilterBar';
import { FloatingPlayer } from '@/components/FloatingPlayer';
import { FavoritesList } from '@/components/favorites/preview/FavoritesList';
import { OnboardingModal } from '@/components/OnboardingModal';
import { Radio, Settings, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import type { RadioStation } from '@/types/radio';

export function HomePage() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [username, setUsername] = useState<string>('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showFavoritesRow, setShowFavoritesRow] = useState(true);

  const {
    stations,
    allStations,
    loading,
    loadingMore,
    filters,
    setFilters,
    provinces,
    countries,
    hasMore,
    loadMore,
  } = useStations(refreshTrigger);

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

  const { getRecentlyPlayed } = useRecentlyPlayedStore();

  const { enabledSources } = useSourceSettings();

  const favoriteStations = getFavoriteStations(allStations);
  const recentlyPlayedStations = getRecentlyPlayed();

  useEffect(() => {
    const onboardingCompleted = localStorage.getItem('onboardingCompleted');
    if (!onboardingCompleted) {
      setShowOnboarding(true);
    }

    // Load username
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
    }

    // Set initial country filter from saved preference
    const preferredCountry = localStorage.getItem('preferredCountry');
    if (preferredCountry && !filters.country) {
      setFilters({ ...filters, country: preferredCountry });
    }
  }, []);

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

  if (loading && stations.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-6 p-8 rounded-xl bg-card/50 backdrop-blur-lg shadow-xl border border-border/50"
        >
          <div className="flex items-center gap-2">
            <Radio className="w-12 h-12 text-primary animate-pulse" />
            <div className="flex gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-primary rounded-full"
                  animate={{
                    height: [8, 24, 8],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
          </div>
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
                <div className="flex flex-col">
                  <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                    Yo Radio
                  </h1>
                  {username && (
                    <p className="text-sm text-muted-foreground">
                      Welcome back, {username}!
                    </p>
                  )}
                </div>
              </motion.div>
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full hover:bg-primary/10"
                  onClick={() => setShowFavoritesRow(!showFavoritesRow)}
                >
                  {showFavoritesRow ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  <span className="sr-only">{showFavoritesRow ? 'Hide favorites' : 'Show favorites'}</span>
                </Button>
                <Link to="/settings">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full hover:bg-primary/10"
                  >
                    <Settings className="h-5 w-5" />
                    <span className="sr-only">Settings</span>
                  </Button>
                </Link>
              </div>
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
          {/* Search and Filter Section */}
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
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
                countries={countries}
                enabledSources={enabledSources}
              />
            </div>
          </div>

          {showFavoritesRow && (favoriteStations.length > 0 || recentlyPlayedStations.length > 0) && (
            <FavoritesList
              stations={stations}
              currentStation={currentStation}
              isPlaying={isPlaying}
              onPlay={handlePlay}
              onPause={pause}
              allStations={allStations} // Pass allStations here
            />
          )}

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
            loading={loading}
            loadingMore={loadingMore}
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
        stations={stations}
        onStationSelect={handlePlay}
        isOnline={true}
      />

      <OnboardingModal
        open={showOnboarding}
        onOpenChange={(open) => {
          setShowOnboarding(open);
          if (!open) {
            // Onboarding completed, trigger refresh
            setRefreshTrigger(prev => prev + 1);
          }
        }}
      />
    </div>
  );
}