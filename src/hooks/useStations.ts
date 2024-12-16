import { useState, useEffect, useMemo } from 'react';
import type { RadioStation, FilterState } from '@/types/radio';
import { radioService } from '@/lib/api/radio-service';
import { useSourceSettings } from '@/hooks/useSourceSettings';

const STATIONS_PER_PAGE = 12;

export function useStations() {
  const [allStations, setAllStations] = useState<RadioStation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(STATIONS_PER_PAGE);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    province: null,
    sortBy: 'name',
  });

  const { enabledSources } = useSourceSettings();

  // Fetch stations when enabled sources change
  useEffect(() => {
    const fetchStations = async () => {
      try {
        setLoading(true);
        const stations = await radioService.fetchAllStations();
        setAllStations(stations);
        setError(null);
      } catch (err) {
        console.error('Error fetching radio stations:', err);
        setError('Failed to load radio stations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, [enabledSources]);

  // Filter and sort stations
  const filteredStations = useMemo(() => {
    return allStations
      .filter((station) => {
        const matchesSearch = !filters.search || 
          station.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          station.tags?.some(tag => 
            tag.toLowerCase().includes(filters.search.toLowerCase())
          ) ||
          station.state?.toLowerCase().includes(filters.search.toLowerCase()) ||
          station.country?.toLowerCase().includes(filters.search.toLowerCase());

        const matchesProvince = !filters.province || station.province === filters.province;
        return matchesSearch && matchesProvince;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'frequency':
            return ((a.frequency || 0) - (b.frequency || 0));
          case 'votes':
            return ((b.votes || 0) - (a.votes || 0));
          case 'bitrate':
            return ((b.bitrate || 0) - (a.bitrate || 0));
          default:
            return 0;
        }
      });
  }, [allStations, filters]);

  // Get visible stations based on pagination
  const visibleStations = useMemo(() => {
    return filteredStations.slice(0, visibleCount);
  }, [filteredStations, visibleCount]);

  // Get unique provinces for filtering
  const provinces = useMemo(() => {
    const uniqueProvinces = new Set(
      allStations
        .map((station) => station.province)
        .filter((province): province is number => province != null)
    );
    return Array.from(uniqueProvinces).sort((a, b) => a - b);
  }, [allStations]);

  // Check if there are more stations to load
  const hasMore = visibleStations.length < filteredStations.length;

  // Load more stations
  const loadMore = () => {
    setVisibleCount((prev) => prev + STATIONS_PER_PAGE);
  };

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(STATIONS_PER_PAGE);
  }, [filters]);

  return {
    stations: visibleStations,
    allStations,
    loading,
    error,
    filters,
    setFilters,
    provinces,
    hasMore,
    loadMore,
  };
}