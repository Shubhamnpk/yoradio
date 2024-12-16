import { Button } from '@/components/ui/button';
import { Volume2, Pause } from 'lucide-react';

interface PlayButtonProps {
  isPlaying: boolean;
  onClick: () => void;
  isCurrentStation: boolean;
}

export function PlayButton({ isPlaying, onClick, isCurrentStation }: PlayButtonProps) {
  return (
    <Button
      variant={isCurrentStation ? "default" : "secondary"}
      size="icon"
      className="h-12 w-12 rounded-full transition-all duration-300 hover:scale-105"
      onClick={onClick}
    >
      {isCurrentStation && isPlaying ? (
        <Pause className="h-6 w-6" />
      ) : (
        <Volume2 className="h-6 w-6" />
      )}
    </Button>
  );
}