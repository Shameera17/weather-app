import { cn } from "@/lib/utils";
import * as React from "react";
import { Button } from "./button";
import { SearchInput } from "./search-input";

export interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  buttonText?: string;
  className?: string;
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  (
    { placeholder = "Search...", onSearch, buttonText = "Search", className },
    ref,
  ) => {
    const [searchValue, setSearchValue] = React.useState("");

    const handleSearch = () => {
      if (onSearch) {
        onSearch(searchValue);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    };

    return (
      <div
        className={cn("flex items-center gap-200 max-w-160 mx-auto", className)}
      >
        <SearchInput
          ref={ref}
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
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
