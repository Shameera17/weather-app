import { weatherIcons } from "@/lib/assets";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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

  return (
    <div className="w-full mt-12">
      {days.length > 0 && (
        <Typography variant="textPreset5">Daily forecast</Typography>
      )}
      {/* Mobile: Grid 1-3 cols, Tablet: Grid 3 cols, Desktop: Horizontal scroll or all 7 */}
      <div className="relative mt-5">
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-neutral-700 hover:bg-neutral-600 rounded-full p-2 shadow-lg transition-colors lg:block hidden xl:hidden"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-neutral-0" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-neutral-700 hover:bg-neutral-600 rounded-full p-2 shadow-lg transition-colors lg:block hidden xl:hidden"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-neutral-0" />
          </button>
        )}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:overflow-x-auto xl:grid xl:grid-cols-7 gap-4 md:gap-6 scrollbar-hide"
        >
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
    </div>
  );
};

export default Forecast;
