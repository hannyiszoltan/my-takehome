import type { UnitSystem } from "../types/units";
import { convertPrecipitation, convertTemperature } from "./units";

const numberFormat = new Intl.NumberFormat("hu-HU", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const inchFormat = new Intl.NumberFormat("hu-HU", {
  minimumFractionDigits: 3,
  maximumFractionDigits: 3,
});

function formatMeasurement(
  value: number | null,
  unit: string,
  formatter = numberFormat,
): string {
  return value === null ? "—" : `${formatter.format(value)} ${unit}`;
}

export function formatTemperature(
  value: number | null,
  unitSystem: UnitSystem,
): string {
  return formatMeasurement(
    convertTemperature(value, unitSystem),
    unitSystem === "imperial" ? "°F" : "°C",
  );
}

export function formatPrecipitation(
  value: number | null,
  unitSystem: UnitSystem,
): string {
  return formatMeasurement(
    convertPrecipitation(value, unitSystem),
    unitSystem === "imperial" ? "in" : "mm",
    unitSystem === "imperial" ? inchFormat : numberFormat,
  );
}

export function formatDate(value: number): string {
  const date = String(value);
  return `${date.slice(0, 4)}.${date.slice(4, 6)}.${date.slice(6, 8)}.`;
}
