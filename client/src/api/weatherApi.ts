import type { WeatherFilters, WeatherResponse } from "../types/weather";
import { getJson } from "./client";

export function getCityWeather(
  filters: WeatherFilters,
  signal: AbortSignal,
): Promise<WeatherResponse> {
  const params = new URLSearchParams({
    city_id: String(filters.cityId),
    from: filters.from,
    to: filters.to,
  });

  return getJson<WeatherResponse>(
    `/temperatures?${params}`,
    signal,
    "Az időjárási adatok betöltése sikertelen",
  );
}
