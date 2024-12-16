import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import type { RadioStation } from '@/types/radio';

interface PlayerProps {
  currentStation: RadioStation | null;
  isPlaying: boolean;
  volume: number;
  onVolumeChange: (value: number) => void;
  onTogglePlay: () => void;
}

export function Player({
  currentStation,
  isPlaying,
  volume,
  onVolumeChange,
  onTogglePlay,
}: PlayerProps) {
  if (!currentStation) return null;

  return (
    <Card className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex-1">
          <h3 className="font-semibold">{currentStation.name}</h3>
          <p className="text-sm text-muted-foreground">
            {currentStation.frequency ? `${currentStation.frequency} MHz` : 'Online'}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 w-32">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onVolumeChange(volume === 0 ? 0.5 : 0)}
            >
              {volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Slider
              value={[volume]}
              max={1}
              step={0.01}
              onValueChange={(value) => onVolumeChange(value[0])}
              className="w-24"
            />
          </div>
          
          <Button
            variant="default"
            size="icon"
            className="h-10 w-10 rounded-full"
            onClick={onTogglePlay}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}