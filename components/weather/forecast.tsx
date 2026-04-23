import { weatherIcons } from "@/lib/assets";
import Icon from "../ui/icon";
import Typography from "../ui/typography";

interface ForecastDay {
  day: string;
  icon: string;
  highTemp: string;
  lowTemp: string;
}

interface ForecastProps {
  days: ForecastDay[];
}

const Forecast = ({ days }: ForecastProps) => {
  return (
    <div className="w-full mt-12">
      <Typography variant="textPreset5">Daily forecast</Typography>
      {/* Mobile: Grid 1-3 cols, Tablet: Grid 3 cols, Desktop: Horizontal scroll or all 7 */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:overflow-x-auto xl:grid xl:grid-cols-7 gap-4 md:gap-6 scrollbar-hide">
        {days.map((day, index) => (
          <div
            key={index}
            className="bg-neutral-800 border-neutral-600 border rounded-20 p-2.5 flex flex-col items-center justify-between gap-6  lg:min-w-40 lg:shrink-0 xl:min-w-0"
          >
            <Typography variant="textPreset6" className="text-center">
              {day.day}
            </Typography>
            <Icon
              src={day.icon || weatherIcons.sunny}
              size={80}
              className="w-20 h-20"
            />
            <div className="flex gap-4 items-center justify-center">
              <Typography variant="textPreset7">{day.highTemp}</Typography>
              <Typography variant="textPreset7" className="opacity-60">
                {day.lowTemp}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
