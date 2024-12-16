import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { RadioStation } from '@/types/radio';
import { motion } from 'framer-motion';

interface FavoriteButtonProps {
  station: RadioStation;
  isFavorite: boolean;
  onToggle: () => void;
  className?: string;
}

export function FavoriteButton({
  station,
  isFavorite,
  onToggle,
  className
}: FavoriteButtonProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
    >
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          'h-8 w-8 transition-all duration-200',
          isFavorite && 'text-yellow-500',
          className
        )}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Star
          className={cn(
            'h-5 w-5',
            isFavorite && 'fill-current'
          )}
        />
      </Button>
    </motion.div>
  );
}