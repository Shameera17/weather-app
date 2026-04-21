"use client";

import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

interface ReverseGeocodeResponse {
  address: {
    city?: string;
    town?: string;
    village?: string;
    municipality?: string;
    country?: string;
    country_code?: string;
  };
  display_name: string;
}

export function useReverseGeocode(lat?: number, lon?: number) {
  const url =
    lat && lon
      ? `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
      : null;

  const { data, error, isLoading } = useSWR<ReverseGeocodeResponse>(
    url,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const getCityName = () => {
    if (!data?.address) return null;
    const { city, town, village, municipality } = data.address;
    return city || town || village || municipality || null;
  };

  const getFullLocation = () => {
    if (!data?.address) return null;
    const cityName = getCityName();
    const country = data.address.country;
    return cityName && country ? `${cityName}, ${country}` : null;
  };

  return {
    city: getCityName(),
    country: data?.address?.country,
    fullLocation: getFullLocation(),
    isLoading,
    error,
  };
}
