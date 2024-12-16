import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface FavoritesSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function FavoritesSearch({ value, onChange }: FavoritesSearchProps) {
  return (
    <motion.div 
      className="relative mb-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search favorites..."
        className="pl-10 bg-card/50 backdrop-blur-sm border-border/50"
      />
    </motion.div>
  );
}