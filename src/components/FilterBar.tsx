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
  countries: string[];
  enabledSources: string[];
}

export function FilterBar({ filters, onFilterChange, provinces, countries, enabledSources }: FilterBarProps) {
  const isDefaultSourceEnabled = enabledSources.includes('default');
  const isRadioBrowserEnabled = enabledSources.includes('radio-browser');
  const isOnlyDefaultSource = isDefaultSourceEnabled && !isRadioBrowserEnabled;

  // Get available sort options based on enabled sources
  const getSortOptions = () => {
    const options = [];

    // Always show name
    options.push({ value: 'name', label: 'Name' });

    // Show frequency if default source is enabled
    if (isDefaultSourceEnabled) {
      options.push({ value: 'frequency', label: 'Frequency' });
    }

    // Show province if default source is disabled (as requested)
    if (!isDefaultSourceEnabled) {
      options.push({ value: 'province', label: 'Province' });
    }

    // Show additional options for radio browser
    if (isRadioBrowserEnabled) {
      options.push({ value: 'votes', label: 'Votes' });
      options.push({ value: 'bitrate', label: 'Bitrate' });
    }

    return options;
  };

  const sortOptions = getSortOptions();

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Only show country filter when radio browser is enabled or when multiple sources are enabled */}
      {isRadioBrowserEnabled && (
        <Select
          value={filters.country || 'all'}
          onValueChange={(value) =>
            onFilterChange({ country: value === 'all' ? null : value })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            {countries.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* Show Nepal as fixed country when only default source is enabled */}
      {isOnlyDefaultSource && (
        <div className="flex items-center px-3 py-2 bg-muted/50 rounded-md border w-[180px]">
          <span className="text-sm font-medium">Country: Nepal</span>
        </div>
      )}

      {/* Show province filter when:
          1. Default source is NOT enabled (for radio browser), OR
          2. Default source is enabled AND country is Nepal (for standard source) */}
      {provinces.length > 0 && (
        (!isDefaultSourceEnabled || (isDefaultSourceEnabled && filters.country === 'Nepal')) && (
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
        )
      )}

      <Select
        value={filters.sortBy}
        onValueChange={(value) => onFilterChange({ sortBy: value as SortOption })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}