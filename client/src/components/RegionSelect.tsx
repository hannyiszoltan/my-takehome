import { useId } from "react";
import type { Region } from "../types/region";

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
    <div>
      <label htmlFor={id} className="sr-only">
        Régió
      </label>
      <select
        id={id}
        value={region ?? ""}
        onChange={(event) => onRegionChange(event.target.value)}
        disabled={regions.length === 0}
        aria-describedby={error ? `${id}-error` : undefined}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
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
