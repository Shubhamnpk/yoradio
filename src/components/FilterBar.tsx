import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { FilterState, SortOption } from '@/types/radio';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  provinces: number[];
}

export function FilterBar({ filters, onFilterChange, provinces }: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Select
        value={filters.province?.toString() || 'all'}
        onValueChange={(value) =>
          onFilterChange({ province: value === 'all' ? null : Number(value) })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select province" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Provinces</SelectItem>
          {provinces.map((province) => (
            <SelectItem key={province} value={province.toString()}>
              Province {province}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.sortBy}
        onValueChange={(value) => onFilterChange({ sortBy: value as SortOption })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="frequency">Frequency</SelectItem>
          <SelectItem value="province">Province</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}