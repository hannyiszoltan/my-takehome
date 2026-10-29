import { useQuery } from "@tanstack/react-query";
import { getCities } from "../api/cityApi";

export function useCities() {
  return useQuery({
    queryKey: ["cities"],
    queryFn: ({ signal }) => getCities(signal),
    staleTime: 5 * 60 * 1000,
  });
}
