import { images, weatherIcons } from "@/lib/assets";
import { DailyWeather } from "@/types/weather";
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
}
const Today = (props: TodayProps) => {
  const forecastDays = props.daily
    ? props.daily.time.map((date, index) => {
        const dateObj = new Date(date);
        const dayName = dateObj.toLocaleDateString("en-US", {
          weekday: "short",
        });
        return {
          day: dayName,
          icon: weatherIcons.sunny,
          highTemp: `${props.daily!.temperature_2m_max[index]}°`,
          lowTemp: `${props.daily!.temperature_2m_min[index]}°`,
        };
      })
    : [];

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
          <Icon
            src={weatherIcons.sunny}
            size={120}
            className="w-[80px] h-[80px] md:w-30 md:h-30"
          />
          <Typography variant="textPreset1">{props.temperature}</Typography>
        </span>
      </div>
      {/* summary */}
      <div className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide">
        <SummaryCard label="Feels Like" value={props.feelsLike} />
        <SummaryCard label="Humidity" value={props.humidity} />
        <SummaryCard label="Wind Speed" value={props.windSpeed} />
        <SummaryCard label="Precipitation" value={props.precipitation} />
      </div>
      {/* forecast */}
      <Forecast days={forecastDays} />
    </div>
  );
};

export default Today;
