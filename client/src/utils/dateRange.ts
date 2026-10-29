function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || value < "0001-01-01") {
    return false;
  }

  const date = new Date(`${value}T00:00:00Z`);
  return (
    !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
  );
}

export function getDateRangeError(from: string, to: string): string | null {
  if (!from || !to) {
    return "A kezdő és a végdátum megadása kötelező.";
  }

  if (!isValidDate(from) || !isValidDate(to)) {
    return "Érvénytelen dátum.";
  }

  if (from > to) {
    return "A kezdő dátum nem lehet későbbi a végdátumnál.";
  }

  return null;
}
