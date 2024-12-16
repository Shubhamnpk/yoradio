import { Radio } from 'lucide-react';
import type { RadioStation } from '@/types/radio';
import { formatFrequency } from '@/lib/utils';

interface StationInfoProps {
  station: RadioStation;
}

export function StationInfo({ station }: StationInfoProps) {
  return (
    <div className="flex-1">
      <h3 className="text-lg font-semibold">{station.name}</h3>
      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
        <Radio className="w-4 h-4" />
        {station.frequency ? formatFrequency(station.frequency) : 'Online Only'}
      </div>
      <p className="text-sm text-muted-foreground mt-1">{station.address}</p>
    </div>
  );
}