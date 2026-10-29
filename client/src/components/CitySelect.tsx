import { useId } from "react";
import type { City } from "../types/city";

interface CitySelectProps {
  cities: City[];
  cityId: number | null;
  onCityChange: (cityId: number) => void;
  isPending: boolean;
  error: string | null;
}

export function CitySelect({
  cities,
  cityId,
  onCityChange,
  isPending,
  error,
}: CitySelectProps) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id} className="sr-only">
        Város
      </label>
      <select
        id={id}
        value={cityId ?? ""}
        onChange={(event) => onCityChange(Number(event.target.value))}
        disabled={cities.length === 0}
        aria-describedby={error ? `${id}-error` : undefined}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
      >
        {cities.length === 0 ? (
          <option value="">
            {isPending
              ? "Városok betöltése…"
              : error
                ? "Betöltési hiba"
                : "Nincs elérhető város"}
          </option>
        ) : (
          cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))
        )}
      </select>
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 text-sm font-normal text-red-700"
        >
          {error}
        </p>
      )}
    </div>
  );
}
