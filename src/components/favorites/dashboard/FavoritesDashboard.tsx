import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Radio } from 'lucide-react';
import { FavoritesTabs } from './FavoritesTabs';
import type { RadioStation } from '@/types/radio';

interface FavoritesDashboardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stations: RadioStation[];
  currentStation: RadioStation | null;
  isPlaying: boolean;
  onPlay: (station: RadioStation) => void;
  onPause: () => void;
}

export function FavoritesDashboard(props: FavoritesDashboardProps) {
  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent className="max-w-5xl h-[85vh] p-0 gap-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <div className="p-2 rounded-lg bg-primary/10">
              <Radio className="h-6 w-6 text-primary" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Favorites Dashboard
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-hidden">
          <FavoritesTabs {...props} />
        </div>
      </DialogContent>
    </Dialog>
  );
}