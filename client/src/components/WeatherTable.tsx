import { useState } from "react";
import type { WeatherRow } from "../types/weather";
import type { UnitSystem } from "../types/units";
import {
  formatDate,
  formatPrecipitation,
  formatTemperature,
} from "../utils/format";
import { WeatherTableFooter } from "./WeatherTableFooter";

const PAGE_SIZE = 25;

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
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const visibleRows = rows.slice(startIndex, startIndex + PAGE_SIZE);
  const hasResults = !isPending && !error && rows.length > 0;
  const pageButtonClassName =
    "rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div className="rounded-b-xl">
      <div className="overflow-x-auto">
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
              visibleRows.map((row) => (
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
          {hasResults && (
            <WeatherTableFooter rows={rows} unitSystem={unitSystem} />
          )}
        </table>
      </div>
      {hasResults && (
        <nav
          aria-label="Táblázat lapozása"
          className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-5 py-4"
        >
          <p className="text-sm text-slate-600" role="status">
            {startIndex + 1}–{startIndex + visibleRows.length} / {rows.length}{" "}
            sor
            {" · "}
            {currentPage} / {pageCount} oldal
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setPage(currentPage - 1)}
              className={pageButtonClassName}
            >
              Előző
            </button>
            <button
              type="button"
              disabled={currentPage === pageCount}
              onClick={() => setPage(currentPage + 1)}
              className={pageButtonClassName}
            >
              Következő
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}
