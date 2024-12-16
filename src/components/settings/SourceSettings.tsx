import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioTower, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { radioSources } from '@/config/sources';
import { useSourceSettings } from '@/hooks/useSourceSettings';
import { motion } from 'framer-motion';

export function SourceSettings() {
  const { enabledSources, toggleSource } = useSourceSettings();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <RadioTower className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">Radio Sources</h2>
      </div>

      <div className="space-y-4">
        {radioSources.map((source, index) => (
          <motion.div
            key={source.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Label htmlFor={source.id} className="font-medium">
                  {source.name}
                </Label>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <button type="button" className="cursor-help">
                      <Info className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="top" 
                    className="max-w-xs bg-popover/95 backdrop-blur-sm"
                  >
                    <p className="text-sm">{source.description}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <p className="text-sm text-muted-foreground">
                {source.description}
              </p>
            </div>
            <Switch
              id={source.id}
              checked={enabledSources.includes(source.id)}
              onCheckedChange={() => toggleSource(source.id)}
              className="data-[state=checked]:bg-primary"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}