import { useMemo } from "react";
import type { UnitSystem } from "../types/units";
import type { WeatherRow } from "../types/weather";
import { formatPrecipitation, formatTemperature } from "../utils/format";
import { calculateStatistics } from "../utils/statistics";

interface WeatherTableFooterProps {
  rows: WeatherRow[];
  unitSystem: UnitSystem;
}

const columns = [
  { key: "minTemp", format: formatTemperature },
  { key: "maxTemp", format: formatTemperature },
  { key: "avgTemp", format: formatTemperature },
  { key: "precipitation", format: formatPrecipitation },
] as const;

export function WeatherTableFooter({
  rows,
  unitSystem,
}: WeatherTableFooterProps) {
  const statistics = useMemo(
    () =>
      columns.map((column) => ({
        ...column,
        ...calculateStatistics(rows.map((row) => row[column.key])),
      })),
    [rows],
  );

  return (
    <tfoot className="border-t-2 border-slate-200 bg-slate-50 text-slate-900">
      <tr>
        <th scope="row" className="px-5 py-3 font-semibold">
          Medián
        </th>
        {statistics.map(({ key, median, format }) => (
          <td
            key={key}
            className="whitespace-nowrap px-5 py-3 text-right tabular-nums"
          >
            {format(median, unitSystem)}
          </td>
        ))}
      </tr>
      <tr className="border-t border-slate-200">
        <th scope="row" className="px-5 py-3 align-top font-semibold">
          Módusz
        </th>
        {statistics.map(({ key, median, modes, format }) => (
          <td key={key} className="px-5 py-3 text-right align-top tabular-nums">
            {median === null ? (
              "—"
            ) : modes.length === 0 ? (
              <span title="Nincs ismétlődő érték.">Nincs</span>
            ) : (
              modes.map((value, index) => (
                <span key={value} className="inline-block whitespace-nowrap">
                  {format(value, unitSystem)}
                  {index < modes.length - 1 ? ";\u00a0" : ""}
                </span>
              ))
            )}
          </td>
        ))}
      </tr>
    </tfoot>
  );
}
