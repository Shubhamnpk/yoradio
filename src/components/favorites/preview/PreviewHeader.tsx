import { Button } from '@/components/ui/button';
import { Radio, Clock, Heart } from 'lucide-react';
import { useState } from 'react';

interface PreviewHeaderProps {
  stationCount: number;
  onViewDashboard: () => void;
  onViewChange?: (view: 'favorites' | 'recent') => void;
  currentView?: 'favorites' | 'recent';
  hasFavorites?: boolean;
  hasRecentlyPlayed?: boolean;
}

export function PreviewHeader({
  stationCount,
  onViewDashboard,
  onViewChange,
  currentView: externalView,
  hasFavorites = true,
  hasRecentlyPlayed = false
}: PreviewHeaderProps) {
  const [internalView, setInternalView] = useState<'favorites' | 'recent'>('favorites');
  const currentView = externalView ?? internalView;

  const handleViewChange = (view: 'favorites' | 'recent') => {
    if (view === 'recent' && hasRecentlyPlayed) {
      setInternalView(view);
      onViewChange?.(view);
    } else if (view === 'favorites' && hasFavorites) {
      setInternalView(view);
      onViewChange?.(view);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            {currentView === 'favorites' ? 'Favorite Stations' : 'Recently Played'}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {stationCount} station{stationCount !== 1 ? 's' : ''} in your collection
          </p>
        </div>
        {hasFavorites && (
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={onViewDashboard}
          >
            View Dashboard
            <Radio className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Toggle between Favorites and Recent Play */}
      <div className="flex items-center gap-2 p-1 bg-muted/50 rounded-lg w-fit">
        <Button
          variant={currentView === 'recent' ? 'default' : 'ghost'}
          size="sm"
          className="gap-2 h-8"
          onClick={() => handleViewChange('recent')}
        >
          <Clock className="h-4 w-4" />
          Recent Play
        </Button>
        {hasFavorites && (
          <Button
            variant={currentView === 'favorites' ? 'default' : 'ghost'}
            size="sm"
            className="gap-2 h-8"
            onClick={() => handleViewChange('favorites')}
          >
            <Heart className="h-4 w-4" />
            Favorites
          </Button>
        )}
      </div>
    </div>
  );
}