import type { WeatherRow } from "../types/weather";
import type { UnitSystem } from "../types/units";
import {
  formatDate,
  formatPrecipitation,
  formatTemperature,
} from "../utils/format";
import { WeatherTableFooter } from "./WeatherTableFooter";

interface WeatherTableProps {
  rows: WeatherRow[];
  isPending: boolean;
  error: string | null;
  caption: string;
  unitSystem: UnitSystem;
}

export function WeatherTable({
  rows,
  isPending,
  error,
  caption,
  unitSystem,
}: WeatherTableProps) {
  return (
    <div className="overflow-x-auto rounded-b-xl">
      <table className="w-full border-collapse text-left text-sm">
        <caption className="px-5 py-3 text-left font-medium text-slate-700">
          {caption}
        </caption>
        <thead className="border-y border-slate-200 bg-slate-50 text-slate-600">
          <tr>
            <th scope="col" className="whitespace-nowrap px-5 py-3">
              Dátum
            </th>
            <th scope="col" className="px-5 py-3 text-right">
              Minimum
            </th>
            <th scope="col" className="px-5 py-3 text-right">
              Maximum
            </th>
            <th scope="col" className="px-5 py-3 text-right">
              Átlag
            </th>
            <th scope="col" className="px-5 py-3 text-right">
              Csapadék
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-800">
          {isPending ? (
            <tr>
              <td colSpan={5} className="px-5 py-8 text-center" role="status">
                Adatok betöltése…
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td
                colSpan={5}
                className="px-5 py-8 text-center text-red-700"
                role="alert"
              >
                {error}
              </td>
            </tr>
          ) : rows.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-5 py-8 text-center">
                A megadott időszakra nincs adat.
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.date} className="hover:bg-slate-50">
                <th
                  scope="row"
                  className="whitespace-nowrap px-5 py-3 font-medium"
                >
                  {formatDate(row.date)}
                </th>
                <td className="whitespace-nowrap px-5 py-3 text-right tabular-nums">
                  {formatTemperature(row.minTemp, unitSystem)}
                </td>
                <td className="whitespace-nowrap px-5 py-3 text-right tabular-nums">
                  {formatTemperature(row.maxTemp, unitSystem)}
                </td>
                <td className="whitespace-nowrap px-5 py-3 text-right tabular-nums">
                  {formatTemperature(row.avgTemp, unitSystem)}
                </td>
                <td className="whitespace-nowrap px-5 py-3 text-right tabular-nums">
                  {formatPrecipitation(row.precipitation, unitSystem)}
                </td>
              </tr>
            ))
          )}
        </tbody>
        {!isPending && !error && rows.length > 0 && (
          <WeatherTableFooter rows={rows} unitSystem={unitSystem} />
        )}
      </table>
    </div>
  );
}
