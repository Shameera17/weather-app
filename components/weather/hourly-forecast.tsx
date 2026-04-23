"use client";
import { getWeatherIconFromCode } from "@/lib/assets";
import { HourlyWeather } from "@/types/weather";
import { useState } from "react";
import Icon from "../ui/icon";
import Typography from "../ui/typography";

interface HourlyForecastProps {
  hourly: HourlyWeather | undefined;
}

const HourlyForecast = ({ hourly }: HourlyForecastProps) => {
  const [selectedDay, setSelectedDay] = useState<string>("");

  if (!hourly || !hourly.time || hourly.time.length === 0) {
    return null;
  }

  // Group hourly data by day
  const groupedByDay = hourly.time.reduce(
    (acc, time, index) => {
      const date = new Date(time);
      const dayKey = date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      });
      if (!acc[dayKey]) {
        acc[dayKey] = [];
      }
      acc[dayKey].push({
        time,
        temperature: hourly.temperature_2m[index],
        weatherCode: hourly.weather_code[index],
        hour: date.toLocaleTimeString("en-US", {
          hour: "numeric",
          hour12: true,
        }),
      });
      return acc;
    },
    {} as Record<
      string,
      Array<{
        time: string;
        temperature: number;
        weatherCode: number;
        hour: string;
      }>
    >,
  );

  const days = Object.keys(groupedByDay);
  const currentSelectedDay = selectedDay || days[0];
  const hourlyData = groupedByDay[currentSelectedDay] || [];

  return (
    <div className="w-full h-full bg-neutral-800 border-neutral-600 border rounded-20 p-6 flex flex-col ">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Typography variant="textPreset5">Hourly forecast</Typography>
        <select
          value={currentSelectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          className="bg-neutral-700 border-neutral-600 border rounded-12 px-5 py-2 text-neutral-0 text-body cursor-pointer focus:outline-none focus:ring-2 focus:ring-neutral-500"
        >
          {days.map((day) => (
            <option key={day} value={day}>
              {day.split(",")[0]}
            </option>
          ))}
        </select>
      </div>

      {/* Hourly Cards */}
      <div className="flex flex-col gap-4 overflow-y-auto flex-1 pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-neutral-400">
        {hourlyData.map((item, index) => (
          <div
            key={index}
            className="bg-neutral-700 border-neutral-600 border rounded-12 px-5 py-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <Icon
                src={getWeatherIconFromCode(item.weatherCode)}
                size={40}
                className="w-10 h-10"
              />
              <Typography variant="textPreset5">{item.hour}</Typography>
            </div>
            <Typography variant="textPreset7">{item.temperature}°</Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
