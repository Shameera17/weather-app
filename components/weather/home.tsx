"use client";
import { useGeolocation } from "@/hooks/useGeoLocation";
import { useReverseGeocode } from "@/hooks/useReverseGeocode";
import { useWeather } from "@/hooks/useWeather";
import { images } from "@/lib/assets";
import { useState } from "react";
import Icon from "../ui/icon";
import { SearchBar } from "../ui/search-bar";
import Typography from "../ui/typography";
import HourlyForecast from "./hourly-forecast";
import { MetricSelection } from "./metric-selection";
import Today from "./today";
export interface Metric {
  type: "metric" | "imperial"; // 'metric' for Celsius, 'imperial' for Fahrenheit
  windSpeedUnit: "km/h" | "mph"; // 'km/h' for kilometers per hour, 'mph' for miles per hour
  precipitationUnit: "mm" | "in"; // 'mm' for millimeters, 'in' for inches
  temperatureUnit: "c" | "f"; // 'c' for Celsius, 'f' for Fahrenheit
}
export const HomePage = () => {
  const { coords, loading, error } = useGeolocation();
  const [unit, setUnit] = useState<Metric>({
    type: "metric",
    windSpeedUnit: "km/h",
    precipitationUnit: "mm",
    temperatureUnit: "c",
  });
  const { weather, isLoading, isError } = useWeather(
    unit,
    coords?.latitude,
    coords?.longitude,
  );
  const { fullLocation, isLoading: isLoadingLocation } = useReverseGeocode(
    coords?.latitude,
    coords?.longitude,
  );

  // Get current date formatted
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (loading || isLoading || isLoadingLocation) {
    return <div>Loading...</div>;
  }
  if (error || isError) {
    return <div>Error: {error || "Failed to fetch weather data"}</div>;
  }
  return (
    <div className="flex flex-col gap-8">
      {/* Section 1 : navigation */}
      <section>
        <nav className="flex justify-between w-full">
          <Icon src={images.logo} size={{ width: 180, height: 40 }} />
          <MetricSelection setUnit={setUnit} unit={unit} />
        </nav>
      </section>
      {/* Section 2 : Hero */}
      <section>
        <Typography variant="textPreset2" className="text-center mx-auto">
          How’s the sky looking today?
        </Typography>
      </section>
      {/* Section 3 : Search */}
      <section>
        <SearchBar />
      </section>
      {/* Section 4 : Weather Cards */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,384px)] gap-6">
          {/* First Column */}
          <div>
            <Today
              temperature={`${weather?.current?.temperature_2m}°` || "0"}
              feelsLike={
                `${weather?.current?.apparent_temperature}${weather?.current_units?.apparent_temperature}` ||
                "0"
              }
              humidity={
                `${weather?.current?.relative_humidity_2m}${weather?.current_units?.relative_humidity_2m}` ||
                "0"
              }
              windSpeed={
                `${weather?.current?.wind_speed_10m}${weather?.current_units?.wind_speed_10m}` ||
                "0"
              }
              precipitation={
                `${weather?.current?.precipitation}${weather?.current_units?.precipitation}` ||
                "0"
              }
              city={fullLocation || "Unknown Location"}
              date={currentDate}
              daily={weather?.daily}
            />
          </div>
          {/* Second Column */}
          <div>
            <HourlyForecast hourly={weather?.hourly} />
          </div>
        </div>
      </section>
    </div>
  );
};
