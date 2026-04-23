import { fetcher } from "@/lib/fetcher";
import { LocationResponse } from "@/types/weather";
import useSWR from "swr";

export function useLocation(query: string, count: number = 10) {
  const url = query
    ? `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=${count}`
    : null;

  const { data, isLoading, error } = useSWR<LocationResponse>(url, fetcher);

  return {
    locations: data?.results || [],
    isLoading,
    error,
  };
}
