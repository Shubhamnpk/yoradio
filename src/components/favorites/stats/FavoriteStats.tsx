import { Clock, Star, PlayCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { FavoriteStation } from '@/lib/favorites';
import { motion } from 'framer-motion';

interface FavoriteStatsProps {
  station: FavoriteStation;
}

export function FavoriteStats({ station }: FavoriteStatsProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground bg-muted/30 p-2 rounded-md"
    >
      <div className="flex items-center gap-1">
        <Star className="w-4 h-4" />
        <span>Added {formatDistanceToNow(new Date(station.addedAt))} ago</span>
      </div>
      {station.lastPlayedAt && (
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>Last played {formatDistanceToNow(new Date(station.lastPlayedAt))} ago</span>
        </div>
      )}
      <div className="flex items-center gap-1">
        <PlayCircle className="w-4 h-4" />
        <span>Played {station.playCount} times</span>
      </div>
    </motion.div>
  );
}