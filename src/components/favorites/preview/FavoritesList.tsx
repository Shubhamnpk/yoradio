import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioCard } from '@/components/cards/RadioCard';
import { FavoriteStats } from '../stats/FavoriteStats';
import { FavoritesDashboard } from '../dashboard/FavoritesDashboard';
import { EmptyState } from './EmptyState';
import { PreviewHeader } from './PreviewHeader';
import type { RadioStation } from '@/types/radio';
import { useFavorites } from '@/hooks/useFavorites';
import { useRecentlyPlayedStore } from '@/store/recently-played';
import { useState, useRef, useEffect } from 'react';

interface FavoritesListProps {
  stations: RadioStation[];
  currentStation: RadioStation | null;
  isPlaying: boolean;
  onPlay: (station: RadioStation) => void;
  onPause: () => void;
  allStations: RadioStation[]; // Add this prop
}

export function FavoritesList({
  currentStation,
  isPlaying,
  onPlay,
  onPause,
  allStations, // Use this instead of the filtered stations
}: FavoritesListProps) {
  const { getFavoriteDetails, getFavoriteStations, isFavorite, toggleFavorite } = useFavorites();
  const { getRecentlyPlayed } = useRecentlyPlayedStore();
  const [showDashboard, setShowDashboard] = useState(false);
  const [currentView, setCurrentView] = useState<'favorites' | 'recent'>('favorites');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const favoriteStations = getFavoriteStations(allStations);
  const recentlyPlayedStations = getRecentlyPlayed();

  // If no favorites but there are recently played stations, switch to recent view
  const hasFavorites = favoriteStations.length > 0;
  const hasRecentlyPlayed = recentlyPlayedStations.length > 0;

  // Auto-switch to recent view if no favorites but has recently played
  const effectiveView = currentView === 'favorites' && !hasFavorites && hasRecentlyPlayed ? 'recent' : currentView;

  const displayStations = effectiveView === 'favorites' ? favoriteStations : recentlyPlayedStations;
  const previewStations = displayStations.slice(0, 10); // Show more for scrolling

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check if content is scrollable
  useEffect(() => {
    const checkScrollable = () => {
      if (scrollRef.current) {
        const { scrollWidth, clientWidth } = scrollRef.current;
        setIsScrollable(scrollWidth > clientWidth);
      }
    };

    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, [previewStations, isMobile]);

  const handleScroll = () => {
    if (scrollRef.current) {
      setScrollPosition(scrollRef.current.scrollLeft);
    }
  };

  // Calculate cards per page based on screen width
  const getCardsPerPage = () => {
    if (!scrollRef.current) return 4;
    const containerWidth = scrollRef.current.clientWidth;
    const cardWidth = 256 + 16; // 256px card + 16px gap
    return Math.max(1, Math.floor(containerWidth / cardWidth));
  };

  // Calculate dots based on cards per page
  const getNumberOfDots = () => {
    const cardsPerPage = getCardsPerPage();
    return Math.ceil(previewStations.length / cardsPerPage);
  };

  const getCurrentDot = () => {
    if (!scrollRef.current) return 0;
    const cardsPerPage = getCardsPerPage();
    const cardWidth = 256 + 16; // 256px card + 16px gap
    const pageWidth = cardsPerPage * cardWidth;
    return Math.round(scrollPosition / pageWidth);
  };

  // Only show empty state if both favorites and recently played are empty
  if (!hasFavorites && !hasRecentlyPlayed) {
    return <EmptyState />;
  }

  return (
    <div className="mb-8 space-y-6">
      <PreviewHeader
        stationCount={displayStations.length}
        onViewDashboard={() => setShowDashboard(true)}
        onViewChange={(view) => {
          // Allow switching to recent even if no favorites
          if (view === 'recent' && hasRecentlyPlayed) {
            setCurrentView(view);
          } else if (view === 'favorites' && hasFavorites) {
            setCurrentView(view);
          }
        }}
        currentView={effectiveView}
        hasFavorites={hasFavorites}
        hasRecentlyPlayed={hasRecentlyPlayed}
      />

      {isMobile || previewStations.length > 3 ? (
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto pb-4 scroll-snap-x-mandatory w-full hide-scrollbar"
          style={{
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE/Edge
          }}
        >
          <AnimatePresence mode="popLayout">
            {previewStations.map((station) => {
              const details = getFavoriteDetails(station.id);

              return (
                <motion.div
                  key={station.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  layout
                  className="flex-shrink-0 w-64 scroll-snap-align-start"
                >
                  <div className="space-y-2">
                    <RadioCard
                      station={station}
                      isPlaying={isPlaying}
                      isCurrentStation={currentStation?.id === station.id}
                      onPlay={onPlay}
                      onPause={onPause}
                      isFavorite={isFavorite(station)}
                      onToggleFavorite={() => toggleFavorite(station)}
                    />
                    {details && <FavoriteStats station={details} />}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {previewStations.map((station) => {
              const details = getFavoriteDetails(station.id);

              return (
                <motion.div
                  key={station.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  layout
                >
                  <div className="space-y-2">
                    <RadioCard
                      station={station}
                      isPlaying={isPlaying}
                      isCurrentStation={currentStation?.id === station.id}
                      onPlay={onPlay}
                      onPause={onPause}
                      isFavorite={isFavorite(station)}
                      onToggleFavorite={() => toggleFavorite(station)}
                    />
                    {details && <FavoriteStats station={details} />}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {isScrollable && (
        <div className="flex items-center justify-center gap-4 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (scrollRef.current) {
                const currentDot = getCurrentDot();
                const prevDot = Math.max(0, currentDot - 1);
                const cardsPerPage = getCardsPerPage();
                const cardWidth = 256 + 16;
                const pageWidth = cardsPerPage * cardWidth;
                scrollRef.current.scrollTo({
                  left: prevDot * pageWidth,
                  behavior: 'smooth',
                });
              }
            }}
            disabled={getCurrentDot() === 0}
          >
            ‹ Previous
          </Button>

          <div className="flex gap-2">
            {Array.from({ length: getNumberOfDots() }, (_, i) => (
              <button
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === getCurrentDot() ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
                onClick={() => {
                  if (scrollRef.current) {
                    const cardsPerPage = getCardsPerPage();
                    const cardWidth = 256 + 16;
                    const pageWidth = cardsPerPage * cardWidth;
                    scrollRef.current.scrollTo({
                      left: i * pageWidth,
                      behavior: 'smooth',
                    });
                  }
                }}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (scrollRef.current) {
                const currentDot = getCurrentDot();
                const nextDot = Math.min(getNumberOfDots() - 1, currentDot + 1);
                const cardsPerPage = getCardsPerPage();
                const cardWidth = 256 + 16;
                const pageWidth = cardsPerPage * cardWidth;
                scrollRef.current.scrollTo({
                  left: nextDot * pageWidth,
                  behavior: 'smooth',
                });
              }
            }}
            disabled={getCurrentDot() === getNumberOfDots() - 1}
          >
            Next ›
          </Button>
        </div>
      )}

      {displayStations.length > 10 && (currentView === 'favorites' || !hasFavorites) && (
        <div className="text-center">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => setShowDashboard(true)}
          >
            View All {displayStations.length} {effectiveView === 'favorites' ? 'Favorites' : 'Recent Plays'}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {hasFavorites && (
        <FavoritesDashboard
          {...{ currentStation, isPlaying, onPlay, onPause }}
          stations={allStations} // Pass allStations here
          open={showDashboard}
          onOpenChange={setShowDashboard}
        />
      )}
    </div>
  );
}