import type { UnitSystem } from "../types/units";

export function convertTemperature(
  celsius: number | null,
  unitSystem: UnitSystem,
): number | null {
  if (celsius === null) {
    return null;
  }

  return unitSystem === "imperial" ? (celsius * 9) / 5 + 32 : celsius;
}

export function convertPrecipitation(
  millimeters: number | null,
  unitSystem: UnitSystem,
): number | null {
  if (millimeters === null) {
    return null;
  }

  return unitSystem === "imperial" ? millimeters / 25.4 : millimeters;
}
