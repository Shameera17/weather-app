"use client";

import { Metric } from "@/components/weather/home";
import { fetcher } from "@/lib/fetcher";
import { getWeatherUrl } from "@/lib/weather";
import { WeatherResponse } from "@/types/weather";
import useSWR from "swr";

export function useWeather(
  unit: Metric,
  lat?: number,
  lon?: number,
  // unit: "metric" | "imperial" = "metric",
) {
  const key = lat && lon ? getWeatherUrl(lat, lon, unit) : null;

  const { data, error, isLoading } = useSWR<WeatherResponse>(key, fetcher);

  return {
    weather: data,
    isLoading,
    isError: error,
  };
}
