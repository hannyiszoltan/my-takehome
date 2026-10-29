export interface WeatherFilters {
  cityId: number;
  from: string;
  to: string;
}

export interface WeatherRow {
  date: number;
  minTemp: number | null;
  maxTemp: number | null;
  avgTemp: number | null;
  precipitation: number | null;
}

export interface WeatherResponse extends WeatherFilters {
  temperatures: WeatherRow[];
}
