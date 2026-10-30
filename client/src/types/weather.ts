interface DateRange {
  from: string;
  to: string;
}

export type WeatherMode = "city" | "region";

export type WeatherFilters = DateRange &
  ({ mode: "city"; cityId: number } | { mode: "region"; region: string });

export interface WeatherRow {
  date: number;
  minTemp: number | null;
  maxTemp: number | null;
  avgTemp: number | null;
  precipitation: number | null;
}

interface WeatherData extends DateRange {
  temperatures: WeatherRow[];
}

export type WeatherResponse = WeatherData &
  ({ cityId: number } | { region: string });
