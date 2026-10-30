import type { WeatherFilters } from "../types/weather";

export function areWeatherFiltersEqual(
  previous: WeatherFilters | undefined,
  next: WeatherFilters,
): boolean {
  if (!previous || previous.from !== next.from || previous.to !== next.to) {
    return false;
  }

  if (previous.mode === "city" && next.mode === "city") {
    return previous.cityId === next.cityId;
  }

  return (
    previous.mode === "region" &&
    next.mode === "region" &&
    previous.region === next.region
  );
}
