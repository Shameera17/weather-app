import { images, weatherIcons } from "@/lib/assets";
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
}
const Today = (props: TodayProps) => {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <SummaryCard label="Feels Like" value={props.feelsLike} />
        <SummaryCard label="Humidity" value={props.humidity} />
        <SummaryCard label="Wind Speed" value={props.windSpeed} />
        <SummaryCard label="Precipitation" value={props.precipitation} />
      </div>
      {/* forecast */}
      <Forecast
        days={[
          {
            day: "Tue",
            icon: weatherIcons.sunny,
            highTemp: "20°",
            lowTemp: "14°",
          },
          {
            day: "Wed",
            icon: weatherIcons.sunny,
            highTemp: "21°",
            lowTemp: "15°",
          },
          {
            day: "Thu",
            icon: weatherIcons.sunny,
            highTemp: "24°",
            lowTemp: "14°",
          },
          {
            day: "Fri",
            icon: weatherIcons.sunny,
            highTemp: "25°",
            lowTemp: "13°",
          },
          {
            day: "Sat",
            icon: weatherIcons.sunny,
            highTemp: "21°",
            lowTemp: "15°",
          },
          {
            day: "Sun",
            icon: weatherIcons.sunny,
            highTemp: "25°",
            lowTemp: "16°",
          },
          {
            day: "Mon",
            icon: weatherIcons.sunny,
            highTemp: "24°",
            lowTemp: "15°",
          },
        ]}
      />
    </div>
  );
};

export default Today;
