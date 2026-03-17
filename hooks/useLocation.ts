import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export function useLocation(query: string) {
  const url = query
    ? `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=1`
    : null;

  const { data, isLoading } = useSWR(url, fetcher);

  return {
    location: data?.results?.[0],
    isLoading,
  };
}
