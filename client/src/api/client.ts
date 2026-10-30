const baseUrl = import.meta.env.VITE_API_URL;

export async function getJson<T>(
  path: string,
  signal: AbortSignal,
  errorMessage: string,
): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, { signal });

  if (!response.ok) {
    throw new Error(`${errorMessage} (${response.status}).`);
  }

  return response.json();
}
