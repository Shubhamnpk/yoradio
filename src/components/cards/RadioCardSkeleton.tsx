import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

export function RadioCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-hover"
    >
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-3 md:p-4">
          <div className="flex items-center gap-2 md:gap-4">
            <Skeleton className="w-12 h-12 md:w-16 md:h-16 rounded-lg shrink-0" />
            <div className="flex-1 min-w-0 space-y-2">
              <Skeleton className="h-4 md:h-5 w-3/4" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-3 w-1/2" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-10 w-10 md:h-12 md:w-12 rounded-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}