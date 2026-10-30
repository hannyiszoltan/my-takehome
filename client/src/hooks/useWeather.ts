import { skipToken, useQuery } from "@tanstack/react-query";
import { getWeather } from "../api/weatherApi";
import type { WeatherFilters } from "../types/weather";

export function useWeather(filters: WeatherFilters | null) {
  return useQuery({
    queryKey: ["temperatures", filters],
    queryFn: filters ? ({ signal }) => getWeather(filters, signal) : skipToken,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,
  });
}
