import { Metric } from "@/components/weather/home";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export function getWeatherUrl(lat: number, lon: number, unit: Metric) {
  const temperature_unit =
    unit.temperatureUnit === "c" ? "celsius" : "fahrenheit";
  const windspeed_unit = unit.windSpeedUnit === "km/h" ? "kmh" : "mph";
  const precipitation_unit = unit.precipitationUnit === "mm" ? "mm" : "inch";
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m,weather_code",
    hourly: "temperature_2m,weather_code",
    daily: "temperature_2m_max,temperature_2m_min,weather_code",
    forecast_days: "7",
    temperature_unit,
    windspeed_unit,
    precipitation_unit,
  });

  return `${BASE_URL}?${params}`;
}
