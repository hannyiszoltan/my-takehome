import { useQuery } from "@tanstack/react-query";
import { getRegions } from "../api/regionApi";

export function useRegions() {
  return useQuery({
    queryKey: ["regions"],
    queryFn: ({ signal }) => getRegions(signal),
    staleTime: 5 * 60 * 1000,
  });
}
