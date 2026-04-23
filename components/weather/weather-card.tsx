"use client";
import { useGeolocation } from "@/hooks/useGeoLocation";
import { useWeather } from "@/hooks/useWeather";
import { Metric } from "./home";

const WeatherCard = ({ metric }: { metric: Metric }) => {
  const { coords, loading } = useGeolocation();

  const { weather } = useWeather(metric, coords?.latitude, coords?.longitude);
  console.log(weather, loading);
  return <div>WeatherCard</div>;
};

export default WeatherCard;
