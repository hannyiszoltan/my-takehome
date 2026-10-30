interface Statistics {
  median: number | null;
  modes: number[];
}

export function calculateStatistics(
  values: readonly (number | null)[],
): Statistics {
  const sorted = values
    .filter(
      (value): value is number => value !== null && Number.isFinite(value),
    )
    .sort((a, b) => a - b);

  if (sorted.length === 0) {
    return { median: null, modes: [] };
  }

  const middle = Math.floor(sorted.length / 2);
  const median =
    sorted.length % 2 === 0
      ? (sorted[middle - 1] + sorted[middle]) / 2
      : sorted[middle];

  const frequencies = new Map<number, number>();
  let highestFrequency = 0;

  for (const value of sorted) {
    const frequency = (frequencies.get(value) ?? 0) + 1;
    frequencies.set(value, frequency);
    highestFrequency = Math.max(highestFrequency, frequency);
  }

  // Ha nincs ismétlődő érték akkor azt úgy vesszük hogy nincs módusza.
  const modes =
    highestFrequency > 1
      ? [...frequencies.entries()]
          .filter(([, frequency]) => frequency === highestFrequency)
          .map(([value]) => value)
      : [];

  return { median, modes };
}
