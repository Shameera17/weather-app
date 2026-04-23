// Base paths
const ICONS_PATH = "/icons";
const IMAGES_PATH = "/images";

// Weather Icons
export const weatherIcons = {
  sunny: `${ICONS_PATH}/icon-sunny.webp`,
  partlyCloudy: `${ICONS_PATH}/icon-partly-cloudy.webp`,
  overcast: `${ICONS_PATH}/icon-overcast.webp`,
  rain: `${ICONS_PATH}/icon-rain.webp`,
  drizzle: `${ICONS_PATH}/icon-drizzle.webp`,
  snow: `${ICONS_PATH}/icon-snow.webp`,
  storm: `${ICONS_PATH}/icon-storm.webp`,
  fog: `${ICONS_PATH}/icon-fog.webp`,
} as const;

// UI Icons
export const icons = {
  search: `${ICONS_PATH}/icon-search.svg`,
  dropdown: `${ICONS_PATH}/icon-dropdown.svg`,
  checkmark: `${ICONS_PATH}/icon-checkmark.svg`,
  error: `${ICONS_PATH}/icon-error.svg`,
  loading: `${ICONS_PATH}/icon-loading.svg`,
  retry: `${ICONS_PATH}/icon-retry.svg`,
  units: `${ICONS_PATH}/icon-units.svg`,
} as const;

// Images
export const images = {
  logo: `${IMAGES_PATH}/logo.svg`,
  favicon: `${IMAGES_PATH}/favicon-32x32.png`,
  bgTodayLarge: `${IMAGES_PATH}/bg-today-large.svg`,
  bgTodaySmall: `${IMAGES_PATH}/bg-today-small.svg`,
} as const;

// Root public assets
export const publicAssets = {
  file: "/file.svg",
  globe: "/globe.svg",
  next: "/next.svg",
  vercel: "/vercel.svg",
  window: "/window.svg",
} as const;

// Helper function to get weather icon by condition
export const getWeatherIcon = (condition: string): string => {
  const conditionMap: Record<string, string> = {
    sunny: weatherIcons.sunny,
    clear: weatherIcons.sunny,
    "partly cloudy": weatherIcons.partlyCloudy,
    cloudy: weatherIcons.overcast,
    overcast: weatherIcons.overcast,
    rain: weatherIcons.rain,
    drizzle: weatherIcons.drizzle,
    snow: weatherIcons.snow,
    storm: weatherIcons.storm,
    thunderstorm: weatherIcons.storm,
    fog: weatherIcons.fog,
    mist: weatherIcons.fog,
  };

  return conditionMap[condition.toLowerCase()] || weatherIcons.partlyCloudy;
};

// Map WMO Weather codes to icons
// Based on: https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM
export const getWeatherIconFromCode = (code: number): string => {
  // Clear sky
  if (code === 0) return weatherIcons.sunny;

  // Mainly clear, partly cloudy, and overcast
  if (code === 1) return weatherIcons.sunny;
  if (code === 2) return weatherIcons.partlyCloudy;
  if (code === 3) return weatherIcons.overcast;

  // Fog
  if (code === 45 || code === 48) return weatherIcons.fog;

  // Drizzle: Light, moderate, and dense intensity
  if (code === 51 || code === 53 || code === 55) return weatherIcons.drizzle;

  // Freezing Drizzle: Light and dense intensity
  if (code === 56 || code === 57) return weatherIcons.drizzle;

  // Rain: Slight, moderate and heavy intensity
  if (code === 61 || code === 63 || code === 65) return weatherIcons.rain;

  // Freezing Rain: Light and heavy intensity
  if (code === 66 || code === 67) return weatherIcons.rain;

  // Snow fall: Slight, moderate, and heavy intensity
  if (code === 71 || code === 73 || code === 75) return weatherIcons.snow;

  // Snow grains
  if (code === 77) return weatherIcons.snow;

  // Rain showers: Slight, moderate, and violent
  if (code === 80 || code === 81 || code === 82) return weatherIcons.rain;

  // Snow showers slight and heavy
  if (code === 85 || code === 86) return weatherIcons.snow;

  // Thunderstorm: Slight or moderate, with slight hail, with heavy hail
  if (code === 95 || code === 96 || code === 99) return weatherIcons.storm;

  // Default fallback
  return weatherIcons.partlyCloudy;
};
