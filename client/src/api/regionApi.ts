import type { Region } from "../types/region";
import { getJson } from "./client";

export function getRegions(signal: AbortSignal): Promise<Region[]> {
  return getJson<Region[]>("/regions", signal, "A régiók betöltése sikertelen");
}
