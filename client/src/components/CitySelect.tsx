import { useId } from "react";
import type { City } from "../types/city";
import { FieldError } from "./FieldError";

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
    <div className="min-w-0">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium leading-5 text-slate-700"
      >
        Város
      </label>
      <select
        id={id}
        value={cityId ?? ""}
        onChange={(event) => onCityChange(Number(event.target.value))}
        disabled={cities.length === 0}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 py-2 font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 aria-invalid:border-red-400 aria-invalid:focus:ring-red-500"
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
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}
