import type { WeatherFilters, WeatherResponse } from "../types/weather";
import { getJson } from "./client";

export function getWeather(
  filters: WeatherFilters,
  signal: AbortSignal,
): Promise<WeatherResponse> {
  const params = new URLSearchParams({
    from: filters.from,
    to: filters.to,
  });

  const path = filters.mode === "city" ? "/weather" : "/weather/region";
  if (filters.mode === "city") {
    params.set("city_id", String(filters.cityId));
  } else {
    params.set("region", filters.region);
  }

  return getJson<WeatherResponse>(
    `${path}?${params}`,
    signal,
    "Az időjárási adatok betöltése sikertelen",
  );
}
