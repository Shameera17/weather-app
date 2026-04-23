"use client";
import { useGeolocation } from "@/hooks/useGeoLocation";
import { useReverseGeocode } from "@/hooks/useReverseGeocode";
import { useWeather } from "@/hooks/useWeather";
import { images } from "@/lib/assets";
import { LocationResult } from "@/types/weather";
import { useEffect, useRef, useState } from "react";
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
  const { coords, loading, error, requestLocation } = useGeolocation();
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
    name: string;
  } | null>(null);
  const [unit, setUnit] = useState<Metric>({
    type: "metric",
    windSpeedUnit: "km/h",
    precipitationUnit: "mm",
    temperatureUnit: "c",
  });
  const [secondColumnHeight, setSecondColumnHeight] = useState<number | null>(
    null,
  );
  const firstColumnRef = useRef<HTMLDivElement>(null);

  // Use selected location or geolocation (no default)
  const latitude = selectedLocation?.latitude ?? coords?.latitude;
  const longitude = selectedLocation?.longitude ?? coords?.longitude;

  const { weather, isLoading, isError } = useWeather(unit, latitude, longitude);
  const { fullLocation, isLoading: isLoadingLocation } = useReverseGeocode(
    latitude,
    longitude,
  );

  // Measure first column height
  useEffect(() => {
    const updateHeight = () => {
      if (firstColumnRef.current) {
        setSecondColumnHeight(firstColumnRef.current.offsetHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [weather, isLoading]);

  // Get current date formatted
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleLocationSelect = (location: LocationResult) => {
    setSelectedLocation({
      latitude: location.latitude,
      longitude: location.longitude,
      name: `${location.name}${location.admin1 ? `, ${location.admin1}` : ""}${location.country ? `, ${location.country}` : ""}`,
    });
  };

  // Show loading only when we're actually loading weather data with coordinates
  if ((latitude && longitude && isLoading) || isLoadingLocation) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: Failed to fetch weather data</div>;
  }
  return (
    <div className="flex flex-col gap-8 mx-auto">
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
        <SearchBar onSelectLocation={handleLocationSelect} />
      </section>
      {/* Section 4 : Weather Cards */}
      <section>
        <div
          className={`grid grid-cols-1 ${!weather?.current ? "grid-cols-1" : "lg:grid-cols-[minmax(0,1fr)_minmax(0,384px)]"}  gap-6`}
        >
          {/* First Column */}
          <div
            ref={firstColumnRef}
            style={{
              height: "min-content",
            }}
          >
            <Today
              temperature={
                weather?.current?.temperature_2m
                  ? `${weather.current.temperature_2m}°`
                  : ""
              }
              feelsLike={
                weather?.current?.apparent_temperature
                  ? `${weather.current.apparent_temperature}${weather.current_units?.apparent_temperature}`
                  : "--"
              }
              humidity={
                weather?.current?.relative_humidity_2m
                  ? `${weather.current.relative_humidity_2m}${weather.current_units?.relative_humidity_2m}`
                  : "--"
              }
              windSpeed={
                weather?.current?.wind_speed_10m
                  ? `${weather.current.wind_speed_10m}${weather.current_units?.wind_speed_10m}`
                  : "--"
              }
              precipitation={
                weather?.current?.precipitation
                  ? `${weather.current.precipitation}${weather.current_units?.precipitation}`
                  : "--"
              }
              city={fullLocation || "Awaiting location..."}
              date={currentDate}
              daily={weather?.daily}
              currentWeatherCode={weather?.current?.weather_code}
            />
          </div>
          {/* Second Column */}
          <div
            className="overflow-y-auto scrollbar-hide"
            style={{
              height: secondColumnHeight
                ? `${secondColumnHeight}px`
                : undefined,
            }}
          >
            <HourlyForecast hourly={weather?.hourly} />
          </div>
        </div>
      </section>
    </div>
  );
};
