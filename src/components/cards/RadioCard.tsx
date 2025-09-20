import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Radio, Volume2, Pause, Signal, Music2 } from 'lucide-react';
import { FavoriteButton } from '@/components/favorites/FavoriteButton';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { RadioStation } from '@/types/radio';

interface RadioCardProps {
  station: RadioStation;
  isPlaying: boolean;
  isCurrentStation: boolean;
  onPlay: (station: RadioStation) => void;
  onPause: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export function RadioCard({
  station,
  isPlaying,
  isCurrentStation,
  onPlay,
  onPause,
  isFavorite,
  onToggleFavorite,
}: RadioCardProps) {
  const handleClick = () => {
    if (isCurrentStation && isPlaying) {
      onPause();
    } else {
      onPlay(station);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      <Card className={cn(
        'transition-all duration-300',
        'bg-card/50 backdrop-blur-sm border-border/50',
        isCurrentStation && 'ring-2 ring-primary shadow-lg',
        'hover:shadow-xl hover:bg-card/80'
      )}>
        <CardContent className="p-3 md:p-4">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative shrink-0">
              {station.favicon ? (
                <img
                  src={station.favicon}
                  alt={station.name}
                  className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover bg-muted"
                  onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/64x64/374151/FFFFFF/svg?text=FM';
                  }}
                />
              ) : (
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Radio className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
              )}
              {isCurrentStation && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary flex items-center justify-center"
                >
                  <Signal className="w-2 h-2 md:w-3 md:h-3 text-primary-foreground" />
                </motion.div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-base md:text-lg font-semibold truncate">{station.name}</h3>
              <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mt-1">
                {station.frequency ? (
                  <>
                    <Radio className="w-3 h-3 md:w-4 md:h-4" />
                    {station.frequency} MHz
                  </>
                ) : (
                  <>
                    <Music2 className="w-3 h-3 md:w-4 md:h-4" />
                    Online
                  </>
                )}
                {station.bitrate && (
                  <span className="text-xs px-1 py-0.5 md:px-2 rounded-full bg-muted">
                    {station.bitrate} kbps
                  </span>
                )}
              </div>
              <p className="text-xs md:text-sm text-muted-foreground mt-1 truncate">
                {station.state || station.country || station.address}
              </p>
            </div>

            <div className="flex flex-col items-center gap-2">
              {onToggleFavorite && (
                <FavoriteButton
                  station={station}
                  isFavorite={isFavorite || false}
                  onToggle={onToggleFavorite}
                />
              )}
              <Button
                variant={isCurrentStation ? "default" : "secondary"}
                size="icon"
                className={cn(
                  "h-10 w-10 md:h-12 md:w-12 rounded-full transition-all duration-300",
                  isCurrentStation && "bg-primary hover:bg-primary/90"
                )}
                onClick={handleClick}
              >
                {isCurrentStation && isPlaying ? (
                  <Pause className="h-5 w-5 md:h-6 md:w-6" />
                ) : (
                  <Volume2 className="h-5 w-5 md:h-6 md:w-6" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}