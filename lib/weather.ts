const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export function getWeatherUrl(
  lat: number,
  lon: number,
  unit: "metric" | "imperial",
) {
  const temperature_unit = unit === "metric" ? "celsius" : "fahrenheit";
  const windspeed_unit = unit === "metric" ? "kmh" : "mph";

  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation",
    hourly: "temperature_2m",
    daily: "temperature_2m_max,temperature_2m_min",
    forecast_days: "7",
    temperature_unit,
    windspeed_unit,
  });

  return `${BASE_URL}?${params}`;
}
