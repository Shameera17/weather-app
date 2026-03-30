import { images, weatherIcons } from "@/lib/assets";
import Icon from "../ui/icon";
import Typography from "../ui/typography";

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
    <div className="w-full">
      {/* hero */}
      <div
        className="w-full rounded-20 flex items-center justify-between"
        style={{
          background: `url(${images.bgTodayLarge})`,
        }}
      >
        <span className="flex flex-col">
          {" "}
          <Typography variant="textPreset4">{props.city}</Typography>
          <Typography variant="textPreset6">{props.date}</Typography>
        </span>
        <span className="flex items-center gap-4">
          <Icon src={weatherIcons.sunny} size={120} />
          <Typography variant="textPreset1">{props.temperature}</Typography>
        </span>
      </div>
      {/* summary */}
      <div></div>
    </div>
  );
};

export default Today;
