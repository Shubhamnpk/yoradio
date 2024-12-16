import { RadioStation } from '@/types/radio';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Radio, Pause, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RadioCardProps {
  station: RadioStation;
  isPlaying: boolean;
  isCurrentStation: boolean;
  onPlay: (station: RadioStation) => void;
  onPause: () => void;
}

export function RadioCard({
  station,
  isPlaying,
  isCurrentStation,
  onPlay,
  onPause,
}: RadioCardProps) {
  const handleClick = () => {
    if (isCurrentStation && isPlaying) {
      onPause();
    } else {
      onPlay(station);
    }
  };

  return (
    <Card className={cn(
      'transition-all duration-300 hover:shadow-lg',
      isCurrentStation && 'ring-2 ring-primary'
    )}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{station.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <Radio className="w-4 h-4" />
              {station.frequency ? `${station.frequency} MHz` : 'Online Only'}
            </div>
            <p className="text-sm text-muted-foreground mt-1">{station.address}</p>
          </div>
          <Button
            variant={isCurrentStation ? "default" : "secondary"}
            size="icon"
            className="h-12 w-12 rounded-full"
            onClick={handleClick}
          >
            {isCurrentStation && isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Volume2 className="h-6 w-6" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}