"use client";
import { useGeolocation } from "@/hooks/useGeoLocation";
import { useWeather } from "@/hooks/useWeather";

const WeatherCard = () => {
  const { coords, loading } = useGeolocation();

  const { weather } = useWeather(coords?.latitude, coords?.longitude, "metric");
  console.log(weather, loading);
  return <div>WeatherCard</div>;
};

export default WeatherCard;
