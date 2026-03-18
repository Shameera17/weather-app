import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check } from "lucide-react";
import { Button } from "../ui/button";
import Typography from "../ui/typography";
import { Metric } from "./home";

export interface MetricSelectionProps {
  setUnit: (unit: Metric) => void;
  unit: Metric;
}

type UnitOption = {
  label: string;
  value: string;
};

const TEMPERATURE_OPTIONS: UnitOption[] = [
  { label: "Celsius (°C)", value: "c" },
  { label: "Fahrenheit (°F)", value: "f" },
];

const WIND_SPEED_OPTIONS: UnitOption[] = [
  { label: "Km/h", value: "km/h" },
  { label: "mph", value: "mph" },
];

const PRECIPITATION_OPTIONS: UnitOption[] = [
  { label: "Millimeters (mm)", value: "mm" },
  { label: "Inches (in)", value: "in" },
];

export const MetricSelection = ({ setUnit, unit }: MetricSelectionProps) => {
  const updateUnit = (updates: Partial<Metric>) => {
    setUnit({ ...unit, ...updates });
  };

  const toggleSystemType = () => {
    if (unit.type === "metric") {
      setUnit({
        ...unit,
        type: "imperial",
        windSpeedUnit: "mph",
        precipitationUnit: "in",
        temperatureUnit: "f",
      });
    } else {
      setUnit({
        ...unit,
        type: "metric",
        windSpeedUnit: "km/h",
        precipitationUnit: "mm",
        temperatureUnit: "c",
      });
    }
  };

  const renderMenuItem = (
    option: UnitOption,
    currentValue: string,
    onSelect: (value: string) => void,
  ) => (
    <DropdownMenuItem
      key={option.value}
      className="flex justify-between"
      onClick={() => onSelect(option.value)}
    >
      <Typography variant="textPreset7">{option.label}</Typography>
      {currentValue === option.value && <Check className="size-4" />}
    </DropdownMenuItem>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem className="mb-1" onClick={toggleSystemType}>
            <Typography variant="textPreset7">
              {unit.type === "metric"
                ? "Switch to Imperial"
                : "Switch to Metric"}
            </Typography>
          </DropdownMenuItem>

          <DropdownMenuLabel>
            <Typography variant="textPreset8">Temperature</Typography>
          </DropdownMenuLabel>
          {TEMPERATURE_OPTIONS.map((option) =>
            renderMenuItem(option, unit.temperatureUnit, (value) =>
              updateUnit({ temperatureUnit: value as "c" | "f" }),
            ),
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <Typography variant="textPreset8">Wind Speed</Typography>
          </DropdownMenuLabel>
          {WIND_SPEED_OPTIONS.map((option) =>
            renderMenuItem(option, unit.windSpeedUnit, (value) =>
              updateUnit({ windSpeedUnit: value as "km/h" | "mph" }),
            ),
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <Typography variant="textPreset8">Precipitation</Typography>
          </DropdownMenuLabel>
          {PRECIPITATION_OPTIONS.map((option) =>
            renderMenuItem(option, unit.precipitationUnit, (value) =>
              updateUnit({ precipitationUnit: value as "mm" | "in" }),
            ),
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
