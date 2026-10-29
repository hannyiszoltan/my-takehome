import { skipToken, useQuery } from "@tanstack/react-query";
import { getCityWeather } from "../api/weatherApi";
import type { WeatherFilters } from "../types/weather";

export function useWeather(filters: WeatherFilters | null) {
  return useQuery({
    queryKey: ["temperatures", "city", filters],
    queryFn: filters
      ? ({ signal }) => getCityWeather(filters, signal)
      : skipToken,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,
  });
}
