import { Button } from '@/components/ui/button';
import { Radio } from 'lucide-react';

interface PreviewHeaderProps {
  stationCount: number;
  onViewDashboard: () => void;
}

export function PreviewHeader({ stationCount, onViewDashboard }: PreviewHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold">Favorite Stations</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {stationCount} station{stationCount !== 1 ? 's' : ''} in your collection
        </p>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={onViewDashboard}
      >
        View Dashboard
        <Radio className="h-4 w-4" />
      </Button>
    </div>
  );
}