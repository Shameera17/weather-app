import { getWeatherIconFromCode, images, weatherIcons } from "@/lib/assets";
import { DailyWeather } from "@/types/weather";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Icon from "../ui/icon";
import Typography from "../ui/typography";
import Forecast from "./forecast";
import SummaryCard from "./summary-card";

interface TodayProps {
  temperature: string;
  feelsLike: string;
  humidity: string;
  windSpeed: string;
  precipitation: string;
  city: string;
  date: string;
  daily: DailyWeather | undefined;
  currentWeatherCode?: number;
}
const Today = (props: TodayProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const forecastDays = props.daily
    ? props.daily.time.map((date, index) => {
        const dateObj = new Date(date);
        const dayName = dateObj.toLocaleDateString("en-US", {
          weekday: "short",
        });
        const weatherCode = props.daily!.weather_code[index];
        return {
          day: dayName,
          icon: getWeatherIconFromCode(weatherCode),
          highTemp: `${props.daily!.temperature_2m_max[index]}°`,
          lowTemp: `${props.daily!.temperature_2m_min[index]}°`,
        };
      })
    : [];

  const currentWeatherIcon = props.currentWeatherCode
    ? getWeatherIconFromCode(props.currentWeatherCode)
    : weatherIcons.sunny;

  return (
    <div className="w-full ">
      {/* hero */}
      <div
        className="mb-8 w-full rounded-20 flex flex-col md:flex-row items-center justify-between py-10 px-6 md:px-8 md:py-20 overflow-visible"
        style={{
          background: `url(${images.bgTodayLarge}) no-repeat center center / cover`,
        }}
      >
        <span className="flex flex-col items-center md:items-start gap-3">
          {" "}
          <Typography variant="textPreset4">{props.city}</Typography>
          <Typography variant="textPreset6">{props.date}</Typography>
        </span>
        <span className="flex items-center justify-center  overflow-visible pr-4">
          {props.temperature && (
            <Icon
              src={currentWeatherIcon}
              size={120}
              className="w-[80px] h-[80px] md:w-30 md:h-30"
            />
          )}
          <Typography variant="textPreset1">{props.temperature}</Typography>
        </span>
      </div>
      {/* summary */}
      <div className="relative">
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-neutral-700 hover:bg-neutral-600 rounded-full p-2 shadow-lg transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-neutral-0" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-neutral-700 hover:bg-neutral-600 rounded-full p-2 shadow-lg transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-neutral-0" />
          </button>
        )}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide"
        >
          <SummaryCard label="Feels Like" value={props.feelsLike} />
          <SummaryCard label="Humidity" value={props.humidity} />
          <SummaryCard label="Wind Speed" value={props.windSpeed} />
          <SummaryCard label="Precipitation" value={props.precipitation} />
        </div>
      </div>
      {/* forecast */}
      <Forecast days={forecastDays} />
    </div>
  );
};

export default Today;
