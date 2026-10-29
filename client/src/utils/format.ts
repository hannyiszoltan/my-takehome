const numberFormat = new Intl.NumberFormat("hu-HU", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export function formatMeasurement(value: number | null, unit: string): string {
  return value === null ? "—" : `${numberFormat.format(value)} ${unit}`;
}

export function formatDate(value: number): string {
  const date = String(value);
  return `${date.slice(0, 4)}.${date.slice(4, 6)}.${date.slice(6, 8)}.`;
}
