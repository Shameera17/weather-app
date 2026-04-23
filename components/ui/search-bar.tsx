import { useLocation } from "@/hooks/useLocation";
import { cn } from "@/lib/utils";
import { LocationResult } from "@/types/weather";
import * as React from "react";
import { Button } from "./button";
import { SearchInput } from "./search-input";

export interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  onSelectLocation?: (location: LocationResult) => void;
  buttonText?: string;
  className?: string;
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      placeholder = "Search...",
      onSearch,
      onSelectLocation,
      buttonText = "Search",
      className,
    },
    ref,
  ) => {
    const [searchValue, setSearchValue] = React.useState("");
    const [debouncedValue, setDebouncedValue] = React.useState("");
    const [isOpen, setIsOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const { locations, isLoading } = useLocation(debouncedValue);

    // Debounce search input
    React.useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedValue(searchValue);
        if (searchValue.trim()) {
          setIsOpen(true);
        } else {
          setIsOpen(false);
        }
      }, 300);

      return () => clearTimeout(timer);
    }, [searchValue]);

    // Close dropdown when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const handleSearch = () => {
      if (onSearch) {
        onSearch(searchValue);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearch();
        setIsOpen(false);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleSelectLocation = (location: LocationResult) => {
      setSearchValue(
        `${location.name}${location.admin1 ? `, ${location.admin1}` : ""}${location.country ? `, ${location.country}` : ""}`,
      );
      setIsOpen(false);
      if (onSelectLocation) {
        onSelectLocation(location);
      }
    };

    const formatLocationDisplay = (location: LocationResult) => {
      const parts = [location.name];
      if (location.admin1) parts.push(location.admin1);
      if (location.country) parts.push(location.country);
      return parts.join(", ");
    };

    return (
      <div
        className={cn("flex items-center gap-200 max-w-160 mx-auto", className)}
      >
        <div ref={containerRef} className="relative flex-1">
          <SearchInput
            ref={ref}
            placeholder={placeholder}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (searchValue.trim() && locations.length > 0) {
                setIsOpen(true);
              }
            }}
          />
          {isOpen && locations.length > 0 && (
            <div
              className={cn(
                "absolute top-full left-0 right-0 mt-100 z-50",
                "bg-neutral-800 border border-neutral-600 rounded-8 p-100",
                "[box-shadow:var(--shadow-200)]",
                "max-h-80 overflow-y-auto",
              )}
            >
              {isLoading ? (
                <div className="px-150 py-125 text-neutral-300 text-md-medium">
                  Loading...
                </div>
              ) : (
                locations.map((location) => (
                  <button
                    key={location.id}
                    type="button"
                    onClick={() => handleSelectLocation(location)}
                    className={cn(
                      "w-full text-left flex items-center gap-125",
                      "bg-transparent text-neutral-0 text-md-medium",
                      "rounded-8 px-150 py-125",
                      "outline-none transition-colors",
                      "hover:bg-neutral-700 hover:text-neutral-0",
                      "focus:bg-neutral-700 focus:text-neutral-0",
                      "cursor-pointer",
                    )}
                  >
                    <span>{formatLocationDisplay(location)}</span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>
        <Button
          variant="search"
          size="search"
          onClick={handleSearch}
          type="button"
        >
          {buttonText}
        </Button>
      </div>
    );
  },
);
SearchBar.displayName = "SearchBar";

export { SearchBar };
