import type { City } from "../types/city";
import { getJson } from "./client";

export function getCities(signal: AbortSignal): Promise<City[]> {
  return getJson<City[]>("/cities", signal, "A városok betöltése sikertelen");
}
