"use client";
import { useGeolocation } from "@/hooks/useGeoLocation";
import { useWeather } from "@/hooks/useWeather";
import { images } from "@/lib/assets";
import { useState } from "react";
import Icon from "../ui/icon";
import Typography from "../ui/typography";
import { MetricSelection } from "./metric-selection";
export interface Metric {
  type: "metric" | "imperial"; // 'metric' for Celsius, 'imperial' for Fahrenheit
  windSpeedUnit: "km/h" | "mph"; // 'km/h' for kilometers per hour, 'mph' for miles per hour
  precipitationUnit: "mm" | "in"; // 'mm' for millimeters, 'in' for inches
}
export const HomePage = () => {
  const { coords, loading, error } = useGeolocation();
  const [unit, setUnit] = useState<Metric>({
    type: "metric",
    windSpeedUnit: "km/h",
    precipitationUnit: "mm",
  });
  const { weather, isLoading, isError } = useWeather(
    coords?.latitude,
    coords?.longitude,
    unit.type,
  );

  if (loading || isLoading) {
    return <div>Loading...</div>;
  }
  if (error || isError) {
    return <div>Error: {error || "Failed to fetch weather data"}</div>;
  }
  return (
    <>
      {/* Section 1 : navigation */}
      <section>
        <Icon src={images.logo} size={{ width: 180, height: 40 }} />
        <MetricSelection setUnit={setUnit} unit={unit} />
      </section>
      {/* Section 2 : Hero */}
      <section>
        <Typography variant="textPreset2" className="text-center mx-auto">
          How’s the sky looking today?
        </Typography>
      </section>
      {/* Section 3 : Search */}
      {/* Section 4 : Weather Cards */}
      {/* Section 4.1 : Left */}
      {/* Section 4.2 : Right */}
    </>
  );
};
