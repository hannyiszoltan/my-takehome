import { useId } from "react";
import type { Region } from "../types/region";
import { FieldError } from "./FieldError";

interface RegionSelectProps {
  regions: Region[];
  region: string | null;
  onRegionChange: (region: string) => void;
  isPending: boolean;
  error: string | null;
}

export function RegionSelect({
  regions,
  region,
  onRegionChange,
  isPending,
  error,
}: RegionSelectProps) {
  const id = useId();

  return (
    <div className="min-w-0">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium leading-5 text-slate-700"
      >
        Régió
      </label>
      <select
        id={id}
        value={region ?? ""}
        onChange={(event) => onRegionChange(event.target.value)}
        disabled={regions.length === 0}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 py-2 font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 aria-invalid:border-red-400 aria-invalid:focus:ring-red-500"
      >
        {regions.length === 0 ? (
          <option value="">
            {isPending
              ? "Régiók betöltése…"
              : error
                ? "Betöltési hiba"
                : "Nincs elérhető régió"}
          </option>
        ) : (
          regions.map(({ region }) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))
        )}
      </select>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}
