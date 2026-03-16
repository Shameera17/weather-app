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
